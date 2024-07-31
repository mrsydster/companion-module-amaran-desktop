import { CompanionActionEvent, CompanionActionDefinitions } from '@companion-module/base'
//
import { Amaran } from '../amaran'
import { ActionId } from '../../enums'
import { socketSendJson } from '../connection'

import { ActionCommand } from './commands'

/**
 * Returns all implemented actions.
 * @param amaran reference to the amaran versiond
 * @constructor
 * @returns CompanionActions
 */
export function actions(amaran: Amaran): CompanionActionDefinitions {
	console.log(amaran)

	return {
		[ActionId.Toggle]: {
			name: 'Toggle On/Off a device or scene',
			options: [
				{
					type: 'dropdown',
					choices: [{ id: 'timer', label: 'Timer' }],
					default: 'timer',
					id: 'destination',
					label: 'Message Destination',
				},
				{
					type: 'dropdown',
					choices: [
						{ id: 2, label: 'Toggle' },
						{ id: 1, label: 'On' },
						{ id: 0, label: 'Off' },
					],
					default: 2,
					id: 'value',
					label: 'Action',
				},
			],
			callback: (action: CompanionActionEvent): void => {
				// const light = action.options.destination as keyof MessageState
				console.log(action)

				socketSendJson(ActionCommand.Toggle, '00000000-0000-0000-0000-000000000000')

			},
		},
	}
}
