import {
	runEntrypoint,
	InstanceBase,
	InstanceStatus,
	SomeCompanionConfigField,
	CompanionActionDefinitions,
	CompanionPresetDefinitions,
	CompanionVariableDefinition,
	CompanionFeedbackDefinitions,
} from '@companion-module/base'

import { AmaranConfig, GetConfigFields } from './config'
import { Amaran } from './amaran/amaran'
import { UpgradeScripts } from './upgrades'

export interface AmaranClient {
	instance: AmaranInstance

	connect(): void
	disconnectSocket(): void

	getVariables(): CompanionVariableDefinition[]
	getActions(): CompanionActionDefinitions
	getFeedbacks(self: AmaranInstance): CompanionFeedbackDefinitions
	getPresets(): CompanionPresetDefinitions
}

export class AmaranInstance extends InstanceBase<AmaranConfig> {
	public config!: AmaranConfig
	private amaran!: AmaranClient

	/**
	 * Main initialization function called once the module
	 * is OK to start doing things.
	 */
	async init(config: AmaranConfig): Promise<void> {
		this.config = config

		this.log('debug', 'Initializing module')
		this.updateStatus(InstanceStatus.Disconnected)

		this.amaran = new Amaran(this)
		this.updateStatus(InstanceStatus.Connecting, 'starting V3')

		this.initConnection()
		this.init_variables()
		this.init_actions()
		this.init_feedbacks()
		this.init_presets()
		this.checkFeedbacks()
	}

	async destroy(): Promise<void> {
		this.amaran.disconnectSocket()
		this.updateStatus(InstanceStatus.Disconnected)
		this.log('debug', 'destroy ' + this.id)
	}

	getConfigFields(): SomeCompanionConfigField[] {
		return GetConfigFields()
	}

	async configUpdated(config: AmaranConfig): Promise<void> {
		this.config = config
		this.amaran.disconnectSocket()
		this.updateStatus(InstanceStatus.Disconnected)

		this.initConnection()
		this.init_variables()
		this.init_actions()
		this.init_feedbacks()
		this.init_presets()
		this.checkFeedbacks()
	}

	initConnection(): void {
		this.log('debug', 'Initializing connection')
		this.amaran.connect()
	}

	init_variables(): void {
		this.log('debug', 'Initializing variables')
		this.setVariableDefinitions(this.amaran.getVariables())
	}

	init_actions(): void {
		this.log('debug', 'Initializing actions')
		this.setActionDefinitions(this.amaran.getActions())
	}

	init_feedbacks(): void {
		this.log('debug', 'Initializing feedbacks')
		this.setFeedbackDefinitions(this.amaran.getFeedbacks(this))
	}

	init_presets(): void {
		this.log('debug', 'Initializing presets')
		this.setPresetDefinitions(this.amaran.getPresets())
	}
}

runEntrypoint(AmaranInstance, UpgradeScripts)
