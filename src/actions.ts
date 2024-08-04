import {
	CompanionActionEvent,
	CompanionActionDefinitions,
	CompanionOptionValues,
	DropdownChoice,
} from '@companion-module/base'
//
import { Amaran } from './amaran'
import { ActionId, ActionCommand } from './enums'
import { DeviceType, SceneType, SystemEffectType } from './amaran-types'

import { intToRgbWithIntensity } from './utilities'

import { socketSendJson } from './connection'

const getDeviceChoices = (devices: DeviceType[]) => {
	// device names are sorted alphabetically
	return devices
		.sort((a: DeviceType, b: DeviceType) => a.name.localeCompare(b.name))
		.map(({ node_id, name }: DeviceType): DropdownChoice => {
			return { id: node_id, label: name }
		})
}

const getSceneChoices = (scenes: SceneType[]) => {
	// device names are sorted alphabetically
	return scenes
		.sort((a: SceneType, b: SceneType) => a.name.localeCompare(b.name))
		.map(({ name, groups }: SceneType): DropdownChoice => {
			return { id: groups[0].node_id, label: name }
		})
}

const getSystemEffectChoices = (systemEffects: SystemEffectType[]) => {
	return systemEffects.map(({ effect, name }): DropdownChoice => {
		return { id: effect, label: name }
	})
}

/**
 * Returns all implemented actions.
 * @param amaran reference to the amaran version
 * @constructor
 * @returns CompanionActions
 */
export function actions(amaran: Amaran): CompanionActionDefinitions {
	return {
		[ActionId.Power]: {
			name: 'Toggle On/Off',
			description: 'Toggle the power state of a device or scene.',
			options: [
				// Scene or Device
				{
					type: 'dropdown',
					choices: [
						{ id: 'device', label: 'Device' },
						{ id: 'scene', label: 'Scene' },
					],
					default: 'device',
					id: 'type',
					label: 'Type',
				},
				// What scene if type is scene
				{
					type: 'dropdown',
					choices: getSceneChoices(amaran.state.scenes),
					default: 0,
					id: 'scene',
					label: 'Scene',
					isVisible: (options: CompanionOptionValues): boolean => options.type === 'scene',
				},
				// What device if type is device
				{
					type: 'dropdown',
					choices: getDeviceChoices(amaran.state.devices),
					default: '00000000-0000-0000-0000-000000000000',
					id: 'device',
					label: 'Device',
					isVisible: (options: CompanionOptionValues): boolean => options.type === 'device',
				},
			],
			callback: (action: CompanionActionEvent): void => {
				socketSendJson(
					ActionCommand.Power,
					action.options.type === 'device' ? (action.options.device as string) : (action.options.scene as string)
				)
			},
		},
		[ActionId.Intensity]: {
			name: 'Set Intensity',
			description: 'Set the intensity of a device or scene between 0 and 100%.',
			options: [
				// Scene or Device
				{
					type: 'dropdown',
					choices: [
						{ id: 'device', label: 'Device' },
						{ id: 'scene', label: 'Scene' },
					],
					default: 'device',
					id: 'type',
					label: 'Type',
				},
				// What scene if type is scene
				{
					type: 'dropdown',
					choices: getSceneChoices(amaran.state.scenes),
					default: '',
					id: 'scene',
					label: 'Scene',
					isVisible: (options: CompanionOptionValues): boolean => options.type === 'scene',
				},
				// What device if type is device
				{
					type: 'dropdown',
					choices: getDeviceChoices(amaran.state.devices),
					default: '00000000-0000-0000-0000-000000000000',
					id: 'device',
					label: 'Device',
					isVisible: (options: CompanionOptionValues): boolean => options.type === 'device',
				},
				// Intensity Slider
				{
					type: 'number',
					label: 'Intensity (0-100%)',
					id: 'intensity',
					min: 0,
					max: 100,
					default: 50,
					required: true,
				},
			],
			callback: (action: CompanionActionEvent): void => {
				socketSendJson(
					ActionCommand.Intensity,
					action.options.type === 'device' ? (action.options.device as string) : (action.options.scene as string),
					{ intensity: (action.options.intensity as number) * 10 }
				)
			},
		},
		[ActionId.CCT]: {
			name: 'Set CCT',
			description: 'Set the CCT value of a device or scene. Value must be between 2000 and 10000 Kelvin.',
			options: [
				// Scene or Device
				{
					type: 'dropdown',
					choices: [
						{ id: 'device', label: 'Device' },
						{ id: 'scene', label: 'Scene' },
					],
					default: 'device',
					id: 'type',
					label: 'Type',
				},
				// What scene if type is scene
				{
					type: 'dropdown',
					choices: getSceneChoices(amaran.state.scenes),
					default: '',
					id: 'scene',
					label: 'Scene',
					isVisible: (options: CompanionOptionValues): boolean => options.type === 'scene',
				},
				// What device if type is device
				{
					type: 'dropdown',
					choices: getDeviceChoices(amaran.state.devices),
					default: '00000000-0000-0000-0000-000000000000',
					id: 'device',
					label: 'Device',
					isVisible: (options: CompanionOptionValues): boolean => options.type === 'device',
				},
				// 	CCT Slider
				{
					type: 'number',
					label: 'Kelvin',
					id: 'cct',
					min: 2000,
					max: 10000,
					default: 5600,
					required: true,
				},
				// Intensity checkbox
				{
					type: 'checkbox',
					label: 'Use Intensity',
					id: 'useIntensity',
					default: false,
				},
				// Intensity Slider
				{
					type: 'number',
					label: 'Intensity (0-100%)',
					id: 'intensity',
					min: 0,
					max: 100,
					default: 50,
					isVisible: (options: CompanionOptionValues): boolean => options.useIntensity === true,
				},
			],
			callback: (action: CompanionActionEvent): void => {
				const intensity: number | null = action.options.useIntensity ? (action.options.intensity as number) * 10 : null

				socketSendJson(
					ActionCommand.CCT,
					action.options.type === 'device' ? (action.options.device as string) : (action.options.scene as string),
					{ cct: action.options.cct, ...(intensity && { intensity }) }
				)
			},
		},
		// Color action
		[ActionId.RGB]: {
			name: 'Set RGB',
			description: 'Set the color of a device or scene.',
			options: [
				// Scene or Device
				{
					type: 'dropdown',
					choices: [
						{ id: 'device', label: 'Device' },
						{ id: 'scene', label: 'Scene' },
					],
					default: 'device',
					id: 'type',
					label: 'Type',
				},
				// What scene if type is scene
				{
					type: 'dropdown',
					choices: getSceneChoices(amaran.state.scenes),
					default: '',
					id: 'scene',
					label: 'Scene',
					isVisible: (options: CompanionOptionValues): boolean => options.type === 'scene',
				},
				// What device if type is device
				{
					type: 'dropdown',
					choices: getDeviceChoices(amaran.state.devices),
					default: '00000000-0000-0000-0000-000000000000',
					id: 'device',
					label: 'Device',
					isVisible: (options: CompanionOptionValues): boolean => options.type === 'device',
				},
				// color
				{
					type: 'colorpicker',
					label: 'Color',
					id: 'color',
					default: '16776960',
					returnType: 'number',
				},
				// Intensity checkbox
				{
					type: 'checkbox',
					label: 'Use Intensity',
					id: 'useIntensity',
					default: false,
				},
				// Intensity Slider
				{
					type: 'number',
					label: 'Intensity (0-100%)',
					id: 'intensity',
					min: 0,
					max: 100,
					default: 50,
					isVisible: (options: CompanionOptionValues): boolean => options.useIntensity === true,
				},
			],
			callback: (action: CompanionActionEvent): void => {
				const color: number = action.options.color as number
				const intensity: number | null = action.options.useIntensity ? (action.options.intensity as number) * 10 : null
				const { r, g, b } = action.options.color ? intToRgbWithIntensity(color, intensity) : { r: 255, g: 255, b: 255 }

				socketSendJson(
					ActionCommand.RGB,
					action.options.type === 'device' ? (action.options.device as string) : (action.options.scene as string),
					{ r, g, b }
				)
			},
		},
		[ActionId.HSI]: {
			name: 'Set HSI',
			description: 'Set the color of a device or scene.',
			options: [
				// Scene or Device
				{
					type: 'dropdown',
					choices: [
						{ id: 'device', label: 'Device' },
						{ id: 'scene', label: 'Scene' },
					],
					default: 'device',
					id: 'type',
					label: 'Type',
				},
				// What scene if type is scene
				{
					type: 'dropdown',
					choices: getSceneChoices(amaran.state.scenes),
					default: '',
					id: 'scene',
					label: 'Scene',
					isVisible: (options: CompanionOptionValues): boolean => options.type === 'scene',
				},
				// What device if type is device
				{
					type: 'dropdown',
					choices: getDeviceChoices(amaran.state.devices),
					default: '00000000-0000-0000-0000-000000000000',
					id: 'device',
					label: 'Device',
					isVisible: (options: CompanionOptionValues): boolean => options.type === 'device',
				},
				// Hue
				{
					type: 'number',
					label: 'Hue (0-360)',
					id: 'hue',
					min: 0,
					max: 360,
					default: 0,
					required: true,
				},
				// Saturation
				{
					type: 'number',
					label: 'Saturation (0-100)',
					id: 'saturation',
					min: 0,
					max: 100,
					default: 100,
					required: true,
				},
				// Intensity Slider
				{
					type: 'number',
					label: 'Intensity (0-100%)',
					id: 'intensity',
					min: 0,
					max: 100,
					default: 50,
				},
			],
			callback: (action: CompanionActionEvent): void => {
				socketSendJson(
					ActionCommand.HSI,
					action.options.type === 'device' ? (action.options.device as string) : (action.options.scene as string),
					{
						hue: action.options.hue,
						sat: action.options.saturation,
						intensity: (action.options.intensity as number) * 10,
					}
				)
			},
		},
		// System Effect action
		[ActionId.SystemEffect]: {
			name: 'Set System Effect',
			description: 'Set a System Effect to a device or scene.',
			options: [
				// Scene or Device
				{
					type: 'dropdown',
					choices: [
						{ id: 'device', label: 'Device' },
						{ id: 'scene', label: 'Scene' },
					],
					default: 'device',
					id: 'type',
					label: 'Type',
				},
				// What scene if type is scene
				{
					type: 'dropdown',
					choices: getSceneChoices(amaran.state.scenes),
					default: '',
					id: 'scene',
					label: 'Scene',
					isVisible: (options: CompanionOptionValues): boolean => options.type === 'scene',
				},
				// What device if type is device
				{
					type: 'dropdown',
					choices: getDeviceChoices(amaran.state.devices),
					default: '00000000-0000-0000-0000-000000000000',
					id: 'device',
					label: 'Device',
					isVisible: (options: CompanionOptionValues): boolean => options.type === 'device',
				},
				// System effect
				{
					type: 'dropdown',
					choices: getSystemEffectChoices(amaran.state.systemEffects),
					default: 'fire',
					id: 'systemEffect',
					label: 'System Effect',
				},
				// Intensity checkbox
				{
					type: 'checkbox',
					label: 'Use Intensity',
					id: 'useIntensity',
					default: false,
				},
				// Intensity Slider
				{
					type: 'number',
					label: 'Intensity (0-100%)',
					id: 'intensity',
					min: 0,
					max: 100,
					default: 50,
					isVisible: (options: CompanionOptionValues): boolean => options.useIntensity === true,
				},
			],
			callback: (action: CompanionActionEvent): void => {
				const systemEffect: string = action.options.systemEffect as string
				const intensity: number | null = action.options.useIntensity ? (action.options.intensity as number) * 10 : null

				socketSendJson(
					ActionCommand.SystemEffect,
					action.options.type === 'device' ? (action.options.device as string) : (action.options.scene as string),
					{ effect_type: systemEffect, ...(intensity && { intensity }) }
				)
			},
		},
	}
}
