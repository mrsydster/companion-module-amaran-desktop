import { CompanionFeedbackDefinitions } from '@companion-module/base'

import { Amaran } from './amaran'
// import { Playback } from './amaran-types'
//
// import { feedbackId } from './enums'

export function feedbacks(amaran: Amaran): CompanionFeedbackDefinitions {
	console.log(amaran)
	return {
		// [feedbackId.ColorPlayback]: {
		// 	type: 'boolean',
		// 	name: 'Playback state',
		// 	description: 'Indicator colour for playback state',
		// 	defaultStyle: {
		// 		color: combineRgb(255, 255, 255),
		// 		bgcolor: combineRgb(0, 204, 0),
		// 	},
		// 	options: [
		// 		{
		// 			type: 'dropdown',
		// 			label: 'State',
		// 			id: 'state',
		// 			choices: [
		// 				{ id: Playback.Play, label: 'Play' },
		// 				{ id: Playback.Pause, label: 'Pause' },
		// 				{ id: Playback.Stop, label: 'Stop' },
		// 				{ id: Playback.Armed, label: 'Armed' },
		// 				{ id: Playback.Roll, label: 'Roll' },
		// 			],
		// 			default: Playback.Play,
		// 		},
		// 	],
		// 	callback: (feedback) => amaran.state.timer.playback === feedback.options.state,
		// },
		// [feedbackId.ColorAddRemove]: {
		// 	type: 'boolean',
		// 	name: 'Added/removed time',
		// 	description: 'Indicator colour for whether timer has user added time',
		// 	defaultStyle: {
		// 		color: combineRgb(255, 255, 255),
		// 		bgcolor: combineRgb(254, 124, 19),
		// 	},
		// 	options: [
		// 		{
		// 			type: 'dropdown',
		// 			label: 'Direction',
		// 			id: 'direction',
		// 			choices: [
		// 				{ id: 'add', label: 'Only Added' },
		// 				{ id: 'remove', label: 'Only Removed' },
		// 				{ id: 'none', label: 'No change' },
		// 			],
		// 			default: 'both',
		// 		},
		// 	],
		// 	callback: (): boolean => true,
		// },
	}
}
