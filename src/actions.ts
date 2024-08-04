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

import { socketSendJson } from './connection'
import { intToRgbWithIntensity, transformGMValue } from './utilities'

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
			return { id: groups[0]?.node_id, label: name }
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
		// Power action
		[ActionId.Power]: {
			name: 'Toggle On/Off',
			description: 'Toggle the power state of a device or scene.',
			options: [
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
				{
					type: 'dropdown',
					choices: getSceneChoices(amaran.state.scenes),
					default: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
					id: 'scene',
					label: 'Scene',
					isVisible: (options: CompanionOptionValues): boolean => options.type === 'scene',
				},
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
		// Intensity action
		[ActionId.Intensity]: {
			name: 'Set Intensity',
			description: 'Set the intensity of a device or scene between 0 and 100%.',
			options: [
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
				{
					type: 'dropdown',
					choices: getSceneChoices(amaran.state.scenes),
					default: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
					id: 'scene',
					label: 'Scene',
					isVisible: (options: CompanionOptionValues): boolean => options.type === 'scene',
				},
				{
					type: 'dropdown',
					choices: getDeviceChoices(amaran.state.devices),
					default: '00000000-0000-0000-0000-000000000000',
					id: 'device',
					label: 'Device',
					isVisible: (options: CompanionOptionValues): boolean => options.type === 'device',
				},
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
		// CCT action
		[ActionId.CCT]: {
			name: 'Set CCT',
			description: 'Set the CCT value of a device or scene. Value must be between 2000 and 10000 Kelvin.',
			options: [
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
				{
					type: 'dropdown',
					choices: getSceneChoices(amaran.state.scenes),
					default: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
					id: 'scene',
					label: 'Scene',
					isVisible: (options: CompanionOptionValues): boolean => options.type === 'scene',
				},
				{
					type: 'dropdown',
					choices: getDeviceChoices(amaran.state.devices),
					default: '00000000-0000-0000-0000-000000000000',
					id: 'device',
					label: 'Device',
					isVisible: (options: CompanionOptionValues): boolean => options.type === 'device',
				},
				{
					type: 'number',
					label: 'Kelvin',
					id: 'cct',
					min: 2000,
					max: 10000,
					default: 5600,
				},
				// Not used yet
				{
					type: 'number',
					label: 'G/M (-1 Full Green, 0 No Green/Magenta, 1 Full Magenta)',
					id: 'gm',
					min: -1,
					max: 1,
					default: 0,
					step: 0.1,
				},
				{
					type: 'checkbox',
					label: 'Use Intensity',
					id: 'useIntensity',
					default: false,
				},
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
					{
						cct: action.options.cct,
						gm: transformGMValue(action.options.gm as number),
						...(intensity && { intensity }),
					}
				)
			},
		},
		// Color action
		[ActionId.RGB]: {
			name: 'Set RGB',
			description: 'Set the color of a device or scene.',
			options: [
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
				{
					type: 'dropdown',
					choices: getSceneChoices(amaran.state.scenes),
					default: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
					id: 'scene',
					label: 'Scene',
					isVisible: (options: CompanionOptionValues): boolean => options.type === 'scene',
				},
				{
					type: 'dropdown',
					choices: getDeviceChoices(amaran.state.devices),
					default: '00000000-0000-0000-0000-000000000000',
					id: 'device',
					label: 'Device',
					isVisible: (options: CompanionOptionValues): boolean => options.type === 'device',
				},
				{
					type: 'colorpicker',
					label: 'Color',
					id: 'color',
					default: '16776960',
					returnType: 'number',
				},
				{
					type: 'checkbox',
					label: 'Use Intensity',
					id: 'useIntensity',
					default: false,
				},
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
		// HSI action
		[ActionId.HSI]: {
			name: 'Set HSI',
			description: 'Set the color of a device or scene.',
			options: [
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
				{
					type: 'dropdown',
					choices: getSceneChoices(amaran.state.scenes),
					default: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
					id: 'scene',
					label: 'Scene',
					isVisible: (options: CompanionOptionValues): boolean => options.type === 'scene',
				},
				{
					type: 'dropdown',
					choices: getDeviceChoices(amaran.state.devices),
					default: '00000000-0000-0000-0000-000000000000',
					id: 'device',
					label: 'Device',
					isVisible: (options: CompanionOptionValues): boolean => options.type === 'device',
				},
				{
					type: 'number',
					label: 'Hue (0-360)',
					id: 'hue',
					min: 0,
					max: 360,
					default: 0,
					required: true,
				},
				{
					type: 'number',
					label: 'Saturation (0-100)',
					id: 'saturation',
					min: 0,
					max: 100,
					default: 100,
					required: true,
				},
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
				{
					type: 'dropdown',
					choices: getSceneChoices(amaran.state.scenes),
					default: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
					id: 'scene',
					label: 'Scene',
					isVisible: (options: CompanionOptionValues): boolean => options.type === 'scene',
				},
				{
					type: 'dropdown',
					choices: getDeviceChoices(amaran.state.devices),
					default: '00000000-0000-0000-0000-000000000000',
					id: 'device',
					label: 'Device',
					isVisible: (options: CompanionOptionValues): boolean => options.type === 'device',
				},
				{
					type: 'dropdown',
					choices: getSystemEffectChoices(amaran.state.systemEffects),
					default: 'fire',
					id: 'systemEffect',
					label: 'System Effect',
				},
				{
					type: 'checkbox',
					label: 'Use Intensity',
					id: 'useIntensity',
					default: false,
				},
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
		// Preset action [NOTE THIS IS NOT IMPLEMENTED CORRECTLY ON AMARAN SIDE]
		[ActionId.Preset]: {
			name: 'Recall Preset',
			description: 'Recall a Preset (CCT, Color or Effect).',
			options: [
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
				{
					type: 'dropdown',
					choices: getSceneChoices(amaran.state.scenes),
					default: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
					id: 'scene',
					label: 'Scene',
					isVisible: (options: CompanionOptionValues): boolean => options.type === 'scene',
				},
				{
					type: 'dropdown',
					choices: getDeviceChoices(amaran.state.devices),
					default: '00000000-0000-0000-0000-000000000000',
					id: 'device',
					label: 'Device',
					isVisible: (options: CompanionOptionValues): boolean => options.type === 'device',
				},
				{
					type: 'dropdown',
					choices: [
						{ id: 'cct', label: 'CCT' },
						{ id: 'color', label: 'Color' },
						{ id: 'effect', label: 'Effect' },
					],
					default: 'cct',
					id: 'preset_type',
					label: 'Preset Type',
				},
				{
					type: 'dropdown',
					choices: [...amaran.state.presets.cct.map(({ id, name }) => ({ id, label: name }))],
					default: amaran.state.presets.cct[0]?.id || 'NO PRESETS FOUND',
					id: 'preset_cct',
					label: 'Preset',
					isVisible: (options: CompanionOptionValues): boolean => options.preset_type === 'cct',
				},
				{
					type: 'dropdown',
					choices: [...amaran.state.presets.color.map(({ id, name }) => ({ id, label: name }))],
					default: amaran.state.presets.color[0]?.id || 'NO PRESETS FOUND',
					id: 'preset_color',
					label: 'Preset',
					isVisible: (options: CompanionOptionValues): boolean => options.preset_type === 'color',
				},
				{
					type: 'dropdown',
					choices: [...amaran.state.presets.effect.map(({ id, name }) => ({ id, label: name }))],
					default: amaran.state.presets.effect[0]?.id || 'NO PRESETS FOUND',
					id: 'preset_effect',
					label: 'Preset',
					isVisible: (options: CompanionOptionValues): boolean => options.preset_type === 'effect',
				},
			],
			callback: (action: CompanionActionEvent): void => {
				const presetType: string = action.options.preset_type as string
				const presetId: string = action.options[`preset_${presetType}`] as string

				socketSendJson(
					ActionCommand.Preset,
					action.options.type === 'device' ? (action.options.device as string) : (action.options.scene as string),
					{ preset_id: presetId }
				)
			},
		},
		// Quickshot action
		[ActionId.Quickshot]: {
			name: 'Recall Shortcut',
			description: 'Recall a Shortcut.',
			options: [
				{
					type: 'dropdown',
					choices: [...amaran.state.quickshots.map(({ id, name }) => ({ id, label: name }))],
					default: amaran.state.quickshots[0]?.id || 'NO QUICKSHOTS FOUND',
					id: 'quickshot',
					label: 'Shortcut',
				},
			],
			callback: (action: CompanionActionEvent): void => {
				const quickshotId: string = action.options.quickshot as string

				socketSendJson(ActionCommand.Quickshot, null, { quickshot_id: quickshotId })
			},
		},
	}
}
