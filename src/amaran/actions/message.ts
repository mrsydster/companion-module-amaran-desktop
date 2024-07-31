// import { CompanionActionDefinition, CompanionActionEvent } from '@companion-module/base'
// import { socketSendJson } from '../connection'
// import { ActionId } from '../../enums'
// import { ActionCommand } from './commands'
// import { Amaran } from '../amaran'
// import { MessageState } from '../amaran-types'
//
// export function createMessageActions(amaran: Amaran): { [id: string]: CompanionActionDefinition } {
// 	function messageVisibility(action: CompanionActionEvent): void {
// 		const destination = action.options.destination as keyof MessageState
// 		const visible = action.options.value === 2 ? !amaran.state.message[destination].visible : action.options.value
// 		socketSendJson('message', { [destination]: { visible } })
// 	}
//
// 	function timerBlackout(action: CompanionActionEvent): void {
// 		const blackout = action.options.value === 2 ? !amaran.state.message.timer.blackout : action.options.value
// 		socketSendJson(ActionCommand.Message, { timer: { blackout } })
// 	}
//
// 	function timerBlink(action: CompanionActionEvent): void {
// 		const blink = action.options.value === 2 ? !amaran.state.message.timer.blink : action.options.value
// 		socketSendJson(ActionCommand.Message, { timer: { blink } })
// 	}
//
// 	return {}
// }
