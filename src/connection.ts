import { InstanceStatus } from '@companion-module/base'

import Websocket from 'ws'

import { Amaran } from './amaran'
import { AmaranInstance } from './index'
import { feedbackId, variableId } from './enums'
import { DeviceType, PresetsType, QuickshotType, SceneType } from './amaran-types'

let ws: Websocket | null = null

let reconnectionTimeout: NodeJS.Timeout | null = null
let reconnectInterval: number
let shouldReconnect = false
let clientId: string

export function connect(self: AmaranInstance, amaran: Amaran): void {
	clientId = `companion-${self.id}`
	reconnectInterval = self.config.reconnectInterval * 1000
	shouldReconnect = self.config.reconnect

	const host: string = self.config.host
	const port: string = self.config.port

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

	ws = new Websocket(`ws://${host}:${port}/ws`, {
		headers: {
			'Client-ID': clientId,
		},
	})

	ws.onopen = (): void => {
		clearTimeout(reconnectionTimeout as NodeJS.Timeout)
		self.updateStatus(InstanceStatus.Ok, 'Connected to amaran Desktop')
		self.log('info', 'Connected to amaran Desktop')

		socketSendJson('get_quickshot_list')
		socketSendJson('get_device_list')
		socketSendJson('get_preset_list')
		socketSendJson('get_scene_list')
		// socketSendJson('get_system_effect_list', '00000000-0000-0000-0000-000000000000')

		self.setVariableValues({ [variableId.Connected]: true })
		self.checkFeedbacks(feedbackId.Connected)
	}

	ws.onclose = (event) => {
		self.log('info', `Connection closed with code ${event.code}`)
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
		self.log('warn', `WebSocket error: ${event.message}`)
		self.updateStatus(InstanceStatus.ConnectionFailure, `WebSocket error: ${event.message}`)
	}

	const updateQuickshotList = (quickshots: QuickshotType[]): void => {
		amaran.state.quickshots = quickshots

		self.updateActions()
		self.updatePresets()
		self.log('info', `Quickshot list updated with ${JSON.stringify(quickshots)}`)
	}

	const updateDeviceList = (devices: DeviceType[]): void => {
		amaran.state.devices = devices

		self.updateActions()
		self.updatePresets()
		self.log('info', `Device list updated with ${JSON.stringify(devices)}`)
	}

	const updatePresetList = (presets: PresetsType): void => {
		amaran.state.presets = presets

		self.updateActions()
		self.updatePresets()
		self.log('info', `Preset list updated with ${JSON.stringify(presets)}`)
	}

	const updateSceneList = (scenes: SceneType[]): void => {
		amaran.state.scenes = scenes

		self.updateActions()
		self.updatePresets()
		self.log('info', `Scene list updated with ${JSON.stringify(scenes)}`)
	}

	// NOT PROPERLY IMPLEMENTED YET ON AMARAN SIDE
	// const updateSystemEffectsList = (systemEffects: any): void => {
	// 	amaran.state.systemEffects = systemEffects
	//
	// 	self.updateActions()
	// 	self.log('info', `System Effects list updated with ${JSON.stringify(systemEffects)}`)
	// }

	ws.onmessage = (event: any): void => {
		self.log('debug', `Received amaran message: ${event.data}`)

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
				case 'get_scene_list': {
					updateSceneList(data.data)
					break
				}
				// NOT PROPERLY IMPLEMENTED YET ON AMARAN SIDE
				// case 'get_system_effect_list': {
				// 	updateSystemEffectsList(data.data)
				// 	break
				// }
				default: {
					break
				}
			}
		} catch (e) {
			// self.log('warn', `Error parsing message: ${e}`)
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

export function socketSendJson(type: string, node_id?: string | null, args: object = {}): void {
	if (ws && ws.readyState === ws.OPEN) {
		ws.send(
			JSON.stringify({
				version: 0,
				client_id: clientId,
				type: type,
				...(node_id && { node_id }),
				...(args && { args }),
			})
		)
	}
}
