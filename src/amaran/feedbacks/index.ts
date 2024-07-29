import { CompanionFeedbackDefinition, CompanionFeedbackDefinitions } from '@companion-module/base'

import { Amaran } from '../amaran'

import { createPlaybackFeedbacks } from './playback'

export function feedbacks(amaran: Amaran): CompanionFeedbackDefinitions {
	const feedbacks: { [id: string]: CompanionFeedbackDefinition | undefined } = {
		...createPlaybackFeedbacks(amaran),
	}

	return feedbacks
}
