import {
	CompanionActionDefinitions,
	CompanionFeedbackDefinitions,
	CompanionPresetDefinitions,
	CompanionVariableDefinition,
} from '@companion-module/base'

import { AmaranInstance, AmaranClient } from './index'

import { connect, disconnectSocket } from './connection'

import { state } from './state'

import { actions } from './actions'
import { feedbacks } from './feedbacks'
import { variables } from './variables'
import { presets } from './presets'

import { StateType } from './amaran-types'

export class Amaran implements AmaranClient {
	instance: AmaranInstance

	public state: StateType = state

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
