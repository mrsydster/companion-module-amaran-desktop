import { CompanionVariableDefinition } from "@companion-module/base";

import { variableId } from './enums';

export function variables(): CompanionVariableDefinition[] {
	return [
		//connection with websocket
		{
			name: 'Connected',
			variableId: variableId.Connected,
		},
	]
}
