import { SomeCompanionConfigField, Regex, CompanionOptionValues } from '@companion-module/base'

export interface AmaranConfig {
	host: string
	port: string
	reconnect: boolean
	reconnectInterval: number
}

export function GetConfigFields(): SomeCompanionConfigField[] {
	return [
		{
			label: 'Information',
			id: 'info',
			type: 'static-text',
			value: 'This module will establish a connection to the amaran Dekstop application.',
			width: 12,
		},
		{
			label: 'amaran Desktop address',
			id: 'host',
			type: 'textinput',
			default: '127.0.0.1',
			width: 6,
			required: true,
			tooltip: 'amaran Desktop address. Valid are IP or URL',
		},
		{
			label: 'amaran Desktop port ',
			id: 'port',
			type: 'textinput',
			default: '33782',
			required: true,
			width: 6,
			regex: Regex.PORT,
			tooltip: 'amaran Desktop port. Default is 33782',
		},
		{
			label: 'Reconnect',
			id: 'reconnect',
			type: 'checkbox',
			default: true,
			width: 6,
			tooltip: 'Chose if you want Companion to try to reconnect to amaran Desktop when the connection is lost.',
		},
		{
			label: 'Reconnect interval (seconds)',
			id: 'reconnectInterval',
			type: 'number',
			min: 1,
			max: 60,
			default: 5,
			width: 6,
			isVisible: (config: CompanionOptionValues): boolean => config.reconnect === true,
			tooltip: 'The interval in seconds between each reconnect attempt.',
		},
	]
}
