import {
	CompanionActionEvent,
	CompanionActionDefinitions,
	CompanionOptionValues,
	DropdownChoice,
} from '@companion-module/base'
//
import { Amaran } from './amaran'
import { ActionId, ActionCommand } from './enums'
import { Device, Scene, SystemEffectType } from './amaran-types'

import { intToRgbWithIntensity } from './utilities'

import { socketSendJson } from './connection'

const getDeviceChoices = (devices: Device[]) => {
	// device names are sorted alphabetically
	return devices
		.sort((a: Device, b: Device) => a.name.localeCompare(b.name))
		.map(({ node_id, name }: Device): DropdownChoice => {
			return { id: node_id, label: name }
		})
}

const getSceneChoices = (scenes: Scene[]) => {
	// device names are sorted alphabetically
	return scenes
		.sort((a, b) => a.name.localeCompare(b.name))
		.map(({ name, groups }: Scene): DropdownChoice => {
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
			name: 'Change Intensity',
			description: 'Change the intensity of a device or scene between 0 and 100%.',
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
			name: 'Change CCT',
			description: 'Changes the CCT value of a device or scene. Value must be between 2000 and 10000 Kelvin.',
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
				const intensity = action.options.useIntensity ? (action.options.intensity as number) * 10 : null

				socketSendJson(
					ActionCommand.CCT,
					action.options.type === 'device' ? (action.options.device as string) : (action.options.scene as string),
					{ cct: action.options.cct, ...(intensity && { intensity }) }
				)
			},
		},
		// Color action
		[ActionId.RGB]: {
			name: 'Change RGB',
			description: 'Changes the color of a device or scene.',
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
				const color = action.options.color as number
				const intensity = action.options.useIntensity ? (action.options.intensity as number) * 10 : null
				const { r, g, b } = action.options.color ? intToRgbWithIntensity(color, intensity) : { r: 255, g: 255, b: 255 }

				socketSendJson(
					ActionCommand.RGB,
					action.options.type === 'device' ? (action.options.device as string) : (action.options.scene as string),
					{ r, g, b }
				)
			},
		},
		// System Effect action
		// Color action
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
				const systemEffect = action.options.systemEffect as string
				const intensity = action.options.useIntensity ? (action.options.intensity as number) * 10 : null

				socketSendJson(
					ActionCommand.SystemEffect,
					action.options.type === 'device' ? (action.options.device as string) : (action.options.scene as string),
					{ effect_type: systemEffect, ...(intensity && { intensity }) }
				)
			},
		},
	}
}
