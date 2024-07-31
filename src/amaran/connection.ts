import { InstanceStatus } from '@companion-module/base'

import Websocket from 'ws'

import { AmaranInstance } from '../index'
import { feedbackId, variableId } from '../enums'
//
// import { MessageState } from './amaran-types'

import { Amaran } from './amaran'

let ws: Websocket | null = null
let reconnectionTimeout: NodeJS.Timeout | null = null
let reconnectInterval: number
let shouldReconnect = false

export function connect(self: AmaranInstance, amaran: Amaran): void {
	reconnectInterval = self.config.reconnectInterval * 1000
	shouldReconnect = self.config.reconnect

	const host = self.config.host
	const port = self.config.port

	if (!host || !port) {
		self.updateStatus(InstanceStatus.BadConfig, `no host and/or port defined`)
		return
	}

	self.updateStatus(InstanceStatus.Connecting, 'Trying WS connection')

	if (ws) {
		ws.close()
	}

	const pattern = /^((http|https):\/\/)/

	if (pattern.test(host)) {
		host.replace(pattern, '')
	}

	ws = new Websocket(`ws://${host}:${port}/ws`)

	ws.onopen = () => {
		clearTimeout(reconnectionTimeout as NodeJS.Timeout)
		self.updateStatus(InstanceStatus.Ok, 'Connected to amaran Desktop')

		socketSendJson('get_quickshot_list')
		socketSendJson('get_device_list')
		socketSendJson('get_preset_list')

		self.setVariableValues({ [variableId.Connected]: true })
		self.checkFeedbacks(feedbackId.Connected)
	}

	ws.onclose = (event) => {
		self.log('debug', `Connection closed with code ${event.code}`)
		self.updateStatus(InstanceStatus.Disconnected, `Connection closed with code ${event.code}`)

		if (shouldReconnect) {
			reconnectionTimeout = setTimeout(() => {
				if (ws && ws.readyState === Websocket.CLOSED) {
					void connect(self, amaran)
				}
			}, reconnectInterval)
		}

		self.setVariableValues({ [variableId.Connected]: false })
		self.checkFeedbacks(feedbackId.Connected)
	}

	ws.onerror = (event) => {
		self.log('debug', `WebSocket error: ${event.message}`)
		self.updateStatus(InstanceStatus.ConnectionFailure, `WebSocket error: ${event.message}`)
	}

	const updateQuickshotList = (quickshots: any) => {
		amaran.state.quickshots = quickshots
		self.log('info', `Quickshot list updated with ${JSON.stringify(quickshots)}`)
	}

	const updateDeviceList = (devices: any) => {
		amaran.state.devices = devices
		self.log('info', `Device list updated with ${JSON.stringify(devices)}`)
	}

	const updatePresetList = (presets: any) => {
		amaran.state.presets = presets
		self.log('info', `Preset list updated with ${JSON.stringify(presets)}`)
	}

	ws.onmessage = (event: any): void => {
		try {
			const { data } = JSON.parse(event.data)

			if (!data.type) {
				return
			}
			switch (data.type) {
				case 'get_quickshot_list': {
					updateQuickshotList(data.data)
					break
				}
				case 'get_device_list': {
					updateDeviceList(data.data)
					break
				}
				case 'get_preset_list': {
					updatePresetList(data.data)
					break
				}
				default: {
					self.log('warn', `Unknown message type: ${data.type}`)
					break
				}
			}
		} catch (e) {
			self.log('error', 'failed to parse message')
		}
	}
}

export function disconnectSocket(): void {
	shouldReconnect = false
	if (reconnectionTimeout) {
		clearTimeout(reconnectionTimeout)
	}
	ws?.close()
}

export function socketSendJson(type: string, node_id?: string, args: object = {}): void {
	if (ws && ws.readyState === ws.OPEN) {
		ws.send(
			JSON.stringify({
				version: 0,
				type: type,
				...(node_id && { node_id }),
				...(args && { args }),
			})
		)
	}
}
