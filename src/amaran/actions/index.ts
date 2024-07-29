import { CompanionActionDefinition, CompanionActionDefinitions } from '@companion-module/base'

import { createMessageActions } from './message'

import { Amaran } from '../amaran'

/**
 * Returns all implemented actions.
 * @param amaran reference to the amaran versiond
 * @constructor
 * @returns CompanionActions
 */
export function actions(amaran: Amaran): CompanionActionDefinitions {
	const actions: { [id: string]: CompanionActionDefinition } = {
		...createMessageActions(amaran),
	}
	return actions
}
