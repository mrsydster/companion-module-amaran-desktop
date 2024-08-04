import { CompanionButtonStyleProps, CompanionPresetDefinitions, combineRgb } from '@companion-module/base'

import * as icons from './assets/icons'

import { Amaran } from './amaran'
import { ActionId, ActionCommand, CctId } from './enums'

const White = combineRgb(255, 255, 255)
const Black = combineRgb(0, 0, 0)
const DarkGray = combineRgb(70, 70, 70)

// CCT Colors
const HighPressureWhite = combineRgb(254, 205, 85)
const WarmWhite = combineRgb(254, 211, 104)
const TungstenWhite = combineRgb(254, 216, 123)
const StudioLightsWhite = combineRgb(254, 216, 123)
const StudioCPLightsWhite = combineRgb(254, 218, 129)
const NaturalWhite = combineRgb(254, 229, 166)
const HorizonWhite = combineRgb(254, 237, 193)
const HMI5600White = combineRgb(255, 255, 254)
const DayWhite = combineRgb(255, 255, 254)
const HMI6000White = combineRgb(243, 252, 254)
const XenonWhite = combineRgb(237, 251, 254)
const DaylightWhite = combineRgb(228, 249, 254)
const OvercastWhite = combineRgb(214, 246, 254)
const MoonlightWhite = combineRgb(185, 240, 254)
const BlueSkyWhite = combineRgb(127, 228, 254)
const CctTextColor = combineRgb(39, 39, 39)

const defaultWithIconStyle: CompanionButtonStyleProps = {
	pngalignment: 'center:center',
	size: '18',
	color: White,
	bgcolor: Black,
	text: '',
	alignment: 'center:bottom',
	show_topbar: false,
}

export function presets(amaran: Amaran): CompanionPresetDefinitions {
	return {
		[ActionCommand.Power]: {
			type: 'button',
			category: 'Switch',
			name: 'Toggle On/Off device or scene',
			style: {
				...defaultWithIconStyle,
				png64: icons.Power,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.Power,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[ActionCommand.Intensity]: {
			type: 'button',
			category: 'Intensity',
			name: 'Set the intensity of a device or scene',
			style: {
				...defaultWithIconStyle,
				png64: icons.LightOn,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.Intensity,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[ActionCommand.Intensity + '0%']: {
			type: 'button',
			category: 'Intensity',
			name: 'Set the intensity of a device or scene to 0%',
			style: {
				...defaultWithIconStyle,
				png64: icons.LightOn,
				text: '0%',
				size: 18,
				alignment: 'center:bottom',
				pngalignment: 'center:top',
				bgcolor: DarkGray,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.Intensity,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								intensity: 0,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		// Intensity 10%
		[ActionCommand.Intensity + '10%']: {
			type: 'button',
			category: 'Intensity',
			name: 'Set the intensity of a device or scene to 10%',
			style: {
				...defaultWithIconStyle,
				png64: icons.LightOn,
				text: '10%',
				size: 18,
				alignment: 'center:bottom',
				pngalignment: 'center:top',
				bgcolor: DarkGray,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.Intensity,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								intensity: 10,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		// Intensity 20%
		[ActionCommand.Intensity + '20%']: {
			type: 'button',
			category: 'Intensity',
			name: 'Set the intensity of a device or scene to 20%',
			style: {
				...defaultWithIconStyle,
				png64: icons.LightOn,
				text: '20%',
				size: 18,
				alignment: 'center:bottom',
				pngalignment: 'center:top',
				bgcolor: DarkGray,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.Intensity,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								intensity: 20,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		// Intensity 30%
		[ActionCommand.Intensity + '30%']: {
			type: 'button',
			category: 'Intensity',
			name: 'Set the intensity of a device or scene to 30%',
			style: {
				...defaultWithIconStyle,
				png64: icons.LightOn,
				text: '30%',
				size: 18,
				alignment: 'center:bottom',
				pngalignment: 'center:top',
				bgcolor: DarkGray,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.Intensity,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								intensity: 30,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		// Intensity 40%
		[ActionCommand.Intensity + '40%']: {
			type: 'button',
			category: 'Intensity',
			name: 'Set the intensity of a device or scene to 40%',
			style: {
				...defaultWithIconStyle,
				png64: icons.LightOn,
				text: '40%',
				size: 18,
				alignment: 'center:bottom',
				pngalignment: 'center:top',
				bgcolor: DarkGray,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.Intensity,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								intensity: 40,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		// Intensity 50%
		[ActionCommand.Intensity + '50%']: {
			type: 'button',
			category: 'Intensity',
			name: 'Set the intensity of a device or scene to 50%',
			style: {
				...defaultWithIconStyle,
				png64: icons.LightOn,
				text: '50%',
				size: 18,
				alignment: 'center:bottom',
				pngalignment: 'center:top',
				bgcolor: DarkGray,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.Intensity,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		// Intensity 60%
		[ActionCommand.Intensity + '60%']: {
			type: 'button',
			category: 'Intensity',
			name: 'Set the intensity of a device or scene to 60%',
			style: {
				...defaultWithIconStyle,
				png64: icons.LightOn,
				text: '60%',
				size: 18,
				alignment: 'center:bottom',
				pngalignment: 'center:top',
				bgcolor: DarkGray,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.Intensity,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								intensity: 60,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		// Intensity 70%
		[ActionCommand.Intensity + '70%']: {
			type: 'button',
			category: 'Intensity',
			name: 'Set the intensity of a device or scene to 70%',
			style: {
				...defaultWithIconStyle,
				png64: icons.LightOn,
				text: '70%',
				size: 18,
				alignment: 'center:bottom',
				pngalignment: 'center:top',
				bgcolor: DarkGray,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.Intensity,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								intensity: 70,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		// Intensity 80%
		[ActionCommand.Intensity + '80%']: {
			type: 'button',
			category: 'Intensity',
			name: 'Set the intensity of a device or scene to 80%',
			style: {
				...defaultWithIconStyle,
				png64: icons.LightOn,
				text: '80%',
				size: 18,
				alignment: 'center:bottom',
				pngalignment: 'center:top',
				bgcolor: DarkGray,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.Intensity,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								intensity: 80,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		// Intensity 90%
		[ActionCommand.Intensity + '90%']: {
			type: 'button',
			category: 'Intensity',
			name: 'Set the intensity of a device or scene to 90%',
			style: {
				...defaultWithIconStyle,
				png64: icons.LightOn,
				text: '90%',
				size: 18,
				alignment: 'center:bottom',
				pngalignment: 'center:top',
				bgcolor: DarkGray,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.Intensity,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								intensity: 90,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		// Intensity 100%
		[ActionCommand.Intensity + '100%']: {
			type: 'button',
			category: 'Intensity',
			name: 'Set the intensity of a device or scene to 100%',
			style: {
				...defaultWithIconStyle,
				png64: icons.LightOn,
				text: '100%',
				size: 18,
				alignment: 'center:bottom',
				pngalignment: 'center:top',
				bgcolor: DarkGray,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.Intensity,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								intensity: 100,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		// Set Color
		[ActionCommand.RGB]: {
			type: 'button',
			category: 'Color',
			name: 'Set the color of a device or scene',
			style: {
				...defaultWithIconStyle,
				png64: icons.Paint,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.RGB,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								color: '16776960',
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		// Red: 16720675
		// Orange: 16737792
		// Yellow: 16759552
		// Green: 8650496
		// Cyan: 5373913
		// Blue: 37119
		// Magenta: 6370815
		[ActionCommand.RGB + '_Red']: {
			type: 'button',
			category: 'Color',
			name: 'Red',
			style: {
				...defaultWithIconStyle,
				bgcolor: combineRgb(255, 35, 35),
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.RGB,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								color: '16720675',
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[ActionCommand.RGB + '_Orange']: {
			type: 'button',
			category: 'Color',
			name: 'Orange',
			style: {
				...defaultWithIconStyle,
				bgcolor: combineRgb(255, 102, 0),
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.RGB,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								color: '16737792',
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[ActionCommand.RGB + '_Yellow']: {
			type: 'button',
			category: 'Color',
			name: 'Yellow',
			style: {
				...defaultWithIconStyle,
				bgcolor: combineRgb(255, 187, 0),
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.RGB,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								color: '16759552',
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[ActionCommand.RGB + '_Green']: {
			type: 'button',
			category: 'Color',
			name: 'Green',
			style: {
				...defaultWithIconStyle,
				bgcolor: combineRgb(131, 255, 0),
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.RGB,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								color: '8650496',
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[ActionCommand.RGB + '_Cyan']: {
			type: 'button',
			category: 'Color',
			name: 'Cyan',
			style: {
				...defaultWithIconStyle,
				bgcolor: combineRgb(81, 255, 217),
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.RGB,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								color: '5373913',
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[ActionCommand.RGB + '_Blue']: {
			type: 'button',
			category: 'Color',
			name: 'Blue',
			style: {
				...defaultWithIconStyle,
				bgcolor: combineRgb(0, 144, 255),
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.RGB,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								color: '37119',
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[ActionCommand.RGB + '_Magenta']: {
			type: 'button',
			category: 'Color',
			name: 'Magenta',
			style: {
				...defaultWithIconStyle,
				bgcolor: combineRgb(97, 53, 255),
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.RGB,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								color: '6370815',
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[ActionId.RGB + '_Purple']: {
			type: 'button',
			category: 'Color',
			name: 'Purple',
			style: {
				...defaultWithIconStyle,
				bgcolor: combineRgb(207, 35, 255),
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.RGB,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								color: '13575167',
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		// Color Scenes Presets
		[ActionCommand.RGB + '_Bonfire']: {
			type: 'button',
			category: 'Color',
			name: 'Bonfire',
			style: {
				...defaultWithIconStyle,
				png64: icons.Bonfire,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.RGB,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								color: '16738816',
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[ActionCommand.RGB + '_BlueSky']: {
			type: 'button',
			category: 'Color',
			name: 'Blue Sky',
			style: {
				...defaultWithIconStyle,
				png64: icons.BlueSky,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.RGB,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								color: '3289855',
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[ActionCommand.RGB + '_MoonlightLake']: {
			type: 'button',
			category: 'Color',
			name: 'Moonlight Lake',
			style: {
				...defaultWithIconStyle,
				png64: icons.MoonlightLake,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.RGB,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								color: '3307263',
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[ActionCommand.RGB + '_Desert']: {
			type: 'button',
			category: 'Color',
			name: 'Desert',
			style: {
				...defaultWithIconStyle,
				png64: icons.Desert,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.RGB,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								color: '16749568',
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[ActionCommand.RGB + '_Forest']: {
			type: 'button',
			category: 'Color',
			name: 'Forest',
			style: {
				...defaultWithIconStyle,
				png64: icons.Forest,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.RGB,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								color: '6750168',
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[ActionCommand.RGB + '_Grassland']: {
			type: 'button',
			category: 'Color',
			name: 'Grassland',
			style: {
				...defaultWithIconStyle,
				png64: icons.Grassland,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.RGB,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								color: '9240422',
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[ActionCommand.RGB + '_Ocean']: {
			type: 'button',
			category: 'Color',
			name: 'Ocean',
			style: {
				...defaultWithIconStyle,
				png64: icons.Ocean,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.RGB,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								color: '255',
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[ActionCommand.RGB + '_Sunshine']: {
			type: 'button',
			category: 'Color',
			name: 'Sunshine',
			style: {
				...defaultWithIconStyle,
				png64: icons.Sunshine,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.RGB,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								color: '16737586',
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[ActionCommand.RGB + '_Sakura']: {
			type: 'button',
			category: 'Color',
			name: 'Sakura',
			style: {
				...defaultWithIconStyle,
				png64: icons.Sakura,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.RGB,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								color: '16757426',
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[ActionCommand.RGB + '_Aurora']: {
			type: 'button',
			category: 'Color',
			name: 'Aurora',
			style: {
				...defaultWithIconStyle,
				png64: icons.Aurora,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.RGB,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								color: '6750079',
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[ActionCommand.RGB + '_Lavender']: {
			type: 'button',
			category: 'Color',
			name: 'Lavender',
			style: {
				...defaultWithIconStyle,
				png64: icons.Lavender,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.RGB,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								color: '8323327',
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		// System Effects
		[ActionCommand.SystemEffect]: {
			type: 'button',
			category: 'System Effect',
			name: 'Set a system effect to a device or scene',
			style: {
				...defaultWithIconStyle,
				png64: icons.Wand,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.SystemEffect,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								systemEffect: 'fire',
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[ActionCommand.Quickshot]: {
			type: 'button',
			category: 'Quickshot',
			name: 'Recall a quickshot',
			style: {
				...defaultWithIconStyle,
				png64: icons.Playing,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.Quickshot,
							options: {
								quickshot: amaran.state.quickshots[0]?.id || 'NO QUICKSHOTS FOUND',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[ActionCommand.Preset]: {
			type: 'button',
			category: 'Preset',
			name: 'Recall a preset',
			style: {
				...defaultWithIconStyle,
				png64: icons.Folder,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.Preset,
							options: {
								type: 'cct',
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[ActionCommand.CCT]: {
			type: 'button',
			category: 'CCT',
			name: 'Set the CCT of a device or scene',
			style: {
				...defaultWithIconStyle,
				png64: icons.Light,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.CCT,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								cct: 5600,
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[CctId.HighPressure]: {
			type: 'button',
			category: 'CCT',
			name: '2200K Sodium Lamp',
			style: {
				...defaultWithIconStyle,
				png64: icons.HighPressure,
				bgcolor: HighPressureWhite,
				color: CctTextColor,
				alignment: 'center:bottom',
				pngalignment: 'center:top',
				text: '2200K',
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.CCT,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								cct: 2200,
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[CctId.WarmWhite]: {
			type: 'button',
			category: 'CCT',
			name: '2700K Warm White',
			style: {
				...defaultWithIconStyle,
				png64: icons.WarmWhite,
				bgcolor: WarmWhite,
				color: CctTextColor,
				alignment: 'center:bottom',
				pngalignment: 'center:top',
				text: '2700K',
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.CCT,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								cct: 2700,
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[CctId.Tungsten]: {
			type: 'button',
			category: 'CCT',
			name: '3200K Tungsten',
			style: {
				...defaultWithIconStyle,
				png64: icons.Tungsten,
				bgcolor: TungstenWhite,
				color: CctTextColor,
				alignment: 'center:bottom',
				pngalignment: 'center:top',
				text: '3200K',
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.CCT,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								cct: 3200,
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[CctId.StudioLamps]: {
			type: 'button',
			category: 'CCT',
			name: '3200K Studio Lamps',
			style: {
				...defaultWithIconStyle,
				png64: icons.StudioLamps,
				bgcolor: StudioLightsWhite,
				color: CctTextColor,
				alignment: 'center:bottom',
				pngalignment: 'center:top',
				text: '3200K',
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.CCT,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								cct: 3200,
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[CctId.StudioCPLight]: {
			type: 'button',
			category: 'CCT',
			name: '3350K CP Lights',
			style: {
				...defaultWithIconStyle,
				png64: icons.StudioCPLight,
				bgcolor: StudioCPLightsWhite,
				color: CctTextColor,
				alignment: 'center:bottom',
				pngalignment: 'center:top',
				text: '3350K',
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.CCT,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								cct: 3350,
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[CctId.NaturalWhite]: {
			type: 'button',
			category: 'CCT',
			name: '4300K Natural White',
			style: {
				...defaultWithIconStyle,
				png64: icons.NaturalWhite,
				bgcolor: NaturalWhite,
				color: CctTextColor,
				alignment: 'center:bottom',
				pngalignment: 'center:top',
				text: '4300K',
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.CCT,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								cct: 4300,
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[CctId.Horizon]: {
			type: 'button',
			category: 'CCT',
			name: '5000K Horizon Daylight',
			style: {
				...defaultWithIconStyle,
				png64: icons.Horizon,
				bgcolor: HorizonWhite,
				color: CctTextColor,
				alignment: 'center:bottom',
				pngalignment: 'center:top',
				text: '5000K',
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.CCT,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								cct: 5000,
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[CctId.HMI5600]: {
			type: 'button',
			category: 'CCT',
			name: '5600K HMI 5600',
			style: {
				...defaultWithIconStyle,
				png64: icons.HMI5600,
				bgcolor: HMI5600White,
				color: CctTextColor,
				alignment: 'center:bottom',
				pngalignment: 'center:top',
				text: '5600K',
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.CCT,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								cct: 5600,
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[CctId.DayWhite]: {
			type: 'button',
			category: 'CCT',
			name: '5600K Day White',
			style: {
				...defaultWithIconStyle,
				png64: icons.DayWhite,
				bgcolor: DayWhite,
				color: CctTextColor,
				alignment: 'center:bottom',
				pngalignment: 'center:top',
				text: '5600K',
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.CCT,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								cct: 5600,
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[CctId.HMI6000]: {
			type: 'button',
			category: 'CCT',
			name: '6000K HMI 6000',
			style: {
				...defaultWithIconStyle,
				png64: icons.HMI6000,
				bgcolor: HMI6000White,
				color: CctTextColor,
				alignment: 'center:bottom',
				pngalignment: 'center:top',
				text: '6000K',
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.CCT,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								cct: 6000,
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[CctId.Xenon]: {
			type: 'button',
			category: 'CCT',
			name: '6200K Xenon Short Arc Lamp',
			style: {
				...defaultWithIconStyle,
				png64: icons.Xenon,
				bgcolor: XenonWhite,
				color: CctTextColor,
				alignment: 'center:bottom',
				pngalignment: 'center:top',
				text: '6200K',
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.CCT,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								cct: 6200,
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[CctId.Daylight]: {
			type: 'button',
			category: 'CCT',
			name: '6500K Daylight',
			style: {
				...defaultWithIconStyle,
				png64: icons.Daylight,
				bgcolor: DaylightWhite,
				color: CctTextColor,
				alignment: 'center:bottom',
				pngalignment: 'center:top',
				text: '6500K',
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.CCT,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								cct: 6500,
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[CctId.Overcast]: {
			type: 'button',
			category: 'CCT',
			name: '7000K Overcast Sky',
			style: {
				...defaultWithIconStyle,
				png64: icons.Overcast,
				bgcolor: OvercastWhite,
				color: CctTextColor,
				alignment: 'center:bottom',
				pngalignment: 'center:top',
				text: '7000K',
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.CCT,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								cct: 7000,
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[CctId.Moonlight]: {
			type: 'button',
			category: 'CCT',
			name: '8000K Moonlight',
			style: {
				...defaultWithIconStyle,
				png64: icons.Moonlight,
				bgcolor: MoonlightWhite,
				color: CctTextColor,
				alignment: 'center:bottom',
				pngalignment: 'center:top',
				text: '8000K',
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.CCT,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								cct: 8000,
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		[CctId.BlueSky]: {
			type: 'button',
			category: 'CCT',
			name: '10000K Blue Sky',
			style: {
				...defaultWithIconStyle,
				png64: icons.Bluesky,
				bgcolor: BlueSkyWhite,
				color: CctTextColor,
				alignment: 'center:bottom',
				pngalignment: 'center:top',
				text: '10000K',
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.CCT,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								cct: 10000,
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		// System Effect: Candle
		[ActionCommand.SystemEffect + '_Candle']: {
			type: 'button',
			category: 'System Effect',
			name: 'Candle',
			style: {
				...defaultWithIconStyle,
				png64: icons.Candle,
				bgcolor: DarkGray,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.SystemEffect,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								systemEffect: 'candle',
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		// System Effect: Club Lights
		[ActionCommand.SystemEffect + '_ClubLights']: {
			type: 'button',
			category: 'System Effect',
			name: 'Club Lights',
			style: {
				...defaultWithIconStyle,
				png64: icons.ClubLights,
				bgcolor: DarkGray,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.SystemEffect,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								systemEffect: 'club_lights',
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		// System Effect: Color Chase
		[ActionCommand.SystemEffect + '_ColorChase']: {
			type: 'button',
			category: 'System Effect',
			name: 'Color Chase',
			style: {
				...defaultWithIconStyle,
				png64: icons.ColorChase,
				bgcolor: DarkGray,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.SystemEffect,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								systemEffect: 'color_chase',
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		// System Effect: Cop Car
		[ActionCommand.SystemEffect + '_CopCar']: {
			type: 'button',
			category: 'System Effect',
			name: 'Cop Car',
			style: {
				...defaultWithIconStyle,
				png64: icons.CopCar,
				bgcolor: DarkGray,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.SystemEffect,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								systemEffect: 'cop_car',
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		// System Effect: Explosion
		[ActionCommand.SystemEffect + '_Explosion']: {
			type: 'button',
			category: 'System Effect',
			name: 'Explosion',
			style: {
				...defaultWithIconStyle,
				png64: icons.Explosion,
				bgcolor: DarkGray,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.SystemEffect,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								systemEffect: 'explosion',
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		// System Effect: Fault Bulb
		[ActionCommand.SystemEffect + '_FaultBulb']: {
			type: 'button',
			category: 'System Effect',
			name: 'Fault Bulb',
			style: {
				...defaultWithIconStyle,
				png64: icons.FaultBulb,
				bgcolor: DarkGray,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.SystemEffect,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								systemEffect: 'fault_bulb',
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		// System Effect: Fire
		[ActionCommand.SystemEffect + '_Fire']: {
			type: 'button',
			category: 'System Effect',
			name: 'Fire',
			style: {
				...defaultWithIconStyle,
				png64: icons.Fire,
				bgcolor: DarkGray,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.SystemEffect,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								systemEffect: 'fire',
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		// System Effect: Fireworks
		[ActionCommand.SystemEffect + '_Fireworks']: {
			type: 'button',
			category: 'System Effect',
			name: 'Fireworks',
			style: {
				...defaultWithIconStyle,
				png64: icons.Fireworks,
				bgcolor: DarkGray,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.SystemEffect,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								systemEffect: 'fireworks',
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		// System Effect: Lightning
		[ActionCommand.SystemEffect + '_Lightning']: {
			type: 'button',
			category: 'System Effect',
			name: 'Lightning',
			style: {
				...defaultWithIconStyle,
				png64: icons.Lightning,
				bgcolor: DarkGray,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.SystemEffect,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								systemEffect: 'lightning',
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		// System Effect: Paparazzi
		[ActionCommand.SystemEffect + '_Paparazzi']: {
			type: 'button',
			category: 'System Effect',
			name: 'Paparazzi',
			style: {
				...defaultWithIconStyle,
				png64: icons.Paparazzi,
				bgcolor: DarkGray,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.SystemEffect,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								systemEffect: 'paparazzi',
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		// System Effect: Party Lights
		[ActionCommand.SystemEffect + '_PartyLights']: {
			type: 'button',
			category: 'System Effect',
			name: 'Party Lights',
			style: {
				...defaultWithIconStyle,
				png64: icons.PartyLights,
				bgcolor: DarkGray,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.SystemEffect,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								systemEffect: 'party_lights',
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		// System Effect: Pulsing
		[ActionCommand.SystemEffect + '_Pulsing']: {
			type: 'button',
			category: 'System Effect',
			name: 'Pulsing',
			style: {
				...defaultWithIconStyle,
				png64: icons.Pulsing,
				bgcolor: DarkGray,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.SystemEffect,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								systemEffect: 'pulsing',
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		// System Effect: Strobe
		[ActionCommand.SystemEffect + '_Strobe']: {
			type: 'button',
			category: 'System Effect',
			name: 'Strobe',
			style: {
				...defaultWithIconStyle,
				png64: icons.Strobe,
				bgcolor: DarkGray,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.SystemEffect,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								systemEffect: 'strobe',
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		// System Effect: TV
		[ActionCommand.SystemEffect + '_TV']: {
			type: 'button',
			category: 'System Effect',
			name: 'TV',
			style: {
				...defaultWithIconStyle,
				png64: icons.TV,
				bgcolor: DarkGray,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.SystemEffect,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								systemEffect: 'tv',
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
		// System Effect: Welding
		[ActionCommand.SystemEffect + '_Welding']: {
			type: 'button',
			category: 'System Effect',
			name: 'Welding',
			style: {
				...defaultWithIconStyle,
				png64: icons.Welding,
				bgcolor: DarkGray,
			},
			steps: [
				{
					down: [
						{
							actionId: ActionId.SystemEffect,
							options: {
								type: 'device',
								device: '00000000-0000-0000-0000-000000000000',
								scene: amaran.state.scenes[0]?.groups[0]?.node_id || 'NO SCENES FOUND',
								systemEffect: 'welding',
								useIntensity: false,
								intensity: 50,
							},
						},
					],
					up: [],
				},
			],
			feedbacks: [],
		},
	}
}
