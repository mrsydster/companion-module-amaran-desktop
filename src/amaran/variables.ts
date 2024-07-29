import { CompanionVariableDefinition } from '@companion-module/base'

import { variableId } from '../enums'

export function variables(): CompanionVariableDefinition[] {
	const variables: CompanionVariableDefinition[] = [
		//clock
		{
			name: 'Clock (hh:mm:ss)',
			variableId: variableId.Clock,
		},
		//timer.addedTime
		{
			name: 'User added time to current event (hh:mm:ss)',
			variableId: variableId.TimerAdded,
		},
	]

	return variables
}
