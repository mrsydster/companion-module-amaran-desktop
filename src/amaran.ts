import {
	CompanionActionDefinitions,
	CompanionFeedbackDefinitions,
	CompanionPresetDefinitions,
	CompanionVariableDefinition,
} from '@companion-module/base'

import { AmaranInstance, AmaranClient } from './index'

import { connect, disconnectSocket } from './connection'
import { CustomFields, AmaranEvent } from './amaran-types'

import { stateobj } from './state'

import { actions } from './actions'
import { feedbacks } from './feedbacks'
import { variables } from './variables'
import { presets } from './presets'

export class Amaran implements AmaranClient {
	instance: AmaranInstance

	public events: AmaranEvent[] = []
	public customFields: CustomFields = {}
	public state = stateobj

	constructor(instance: AmaranInstance) {
		this.instance = instance
	}

	connect(): void {
		connect(this.instance, this)
	}

	disconnectSocket(): void {
		disconnectSocket()
	}

	getVariables(): CompanionVariableDefinition[] {
		return variables()
	}

	getActions(): CompanionActionDefinitions {
		return actions(this)
	}

	getFeedbacks(): CompanionFeedbackDefinitions {
		return feedbacks(this)
	}

	getPresets(): CompanionPresetDefinitions {
		return presets()
	}
}
