import {
	CompanionButtonPresetDefinition,
	CompanionButtonStyleProps,
	CompanionPresetDefinitions,
	combineRgb,
} from '@companion-module/base'

import * as icons from '../assets/icons'
import { ActionId } from '../enums'

// import { TimerPhase } from './amaran-types'

export function presets(): CompanionPresetDefinitions {
	return { ...playbackPresets }
}

const White = combineRgb(255, 255, 255)
const Black = combineRgb(0, 0, 0)

// const PlaybackGreen = combineRgb(51, 158, 78)
// const PlaybackRed = combineRgb(228, 40, 30)
// const PauseOrange = combineRgb(192, 86, 33)
// const RollBlue = combineRgb(2, 116, 182)

// const NormalGray = combineRgb(211, 211, 211)
// const WarningOrange = combineRgb(255, 171, 51)
// const DangerRed = combineRgb(237, 51, 51)

// const defaultStyle: CompanionButtonStyleProps = {
// 	size: '24',
// 	color: White,
// 	bgcolor: Black,
// 	text: '',
// 	alignment: 'center:center',
// 	// show_topbar: false,
// }

const defaultWithIconStyle: CompanionButtonStyleProps = {
	pngalignment: 'center:top',
	size: '14',
	color: White,
	bgcolor: Black,
	text: '',
	alignment: 'center:bottom',
	// show_topbar: false,
}

// const canPlayFeedback = [
// 	{
// 		feedbackId: feedbackId.ColorPlayback,
// 		options: {
// 			state: 'play',
// 		},
// 		style: {
// 			color: White,
// 			bgcolor: PlaybackGreen,
// 		},
// 	},
// 	{
// 		feedbackId: feedbackId.ColorPlayback,
// 		options: {
// 			state: 'armed',
// 		},
// 		style: {
// 			color: PlaybackGreen,
// 		},
// 	},
// 	{
// 		feedbackId: feedbackId.ColorPlayback,
// 		options: {
// 			state: 'pause',
// 		},
// 		style: {
// 			color: PlaybackGreen,
// 		},
// 	},
// ]



const playbackPresets: { [id: string]: CompanionButtonPresetDefinition } = {
	select_previous_event: {
		type: 'button',
		category: 'Playback',
		name: 'Selects previous event',
		style: {
			...defaultWithIconStyle,
			png64: icons.PlaybackPrevious,
		},
		steps: [
			{
				down: [
					{
						actionId: ActionId.Load,
						options: { method: 'previous' },
					},
				],
				up: [],
			},
		],
		feedbacks: [],
	},
}
