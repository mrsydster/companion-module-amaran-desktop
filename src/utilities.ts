import { DropdownChoice } from '@companion-module/base'

import { AmaranEvent, RuntimeStore, SimpleTimerState } from './amaran/amaran-types.js'
import { Amaran } from './amaran/amaran.js'

export const joinTime = (...args: string[]) => args.join(':')

function padTo2Digits(number: number) {
	return number.toString().padStart(2, '0')
}

const defaultTimerObject = {
	hours: '--',
	minutes: '--',
	seconds: '--',
	hoursMinutes: '--:--',
	hoursMinutesSeconds: '--:--:--',
	delayString: '0',
	negative: '',
}

type SplitTime = typeof defaultTimerObject

export function msToSplitTime(time: number | null): SplitTime {
	if (time === null) {
		return defaultTimerObject
	}
	let negative = false
	if (time < 0) {
		time = time * -1
		negative = true
	} else {
		negative = false
	}
	const s = Math.floor((time / 1000) % 60)
	const m = Math.floor((time / (1000 * 60)) % 60)
	const h = Math.floor((time / (1000 * 60 * 60)) % 24)

	const seconds = padTo2Digits(s)
	const minutes = padTo2Digits(m)
	const hours = padTo2Digits(h)
	const negativeSign = negative ? '-' : ''

	const hoursMinutes = `${hours}:${minutes}`
	const hoursMinutesSeconds = `${negativeSign}${hoursMinutes}:${seconds}`

	let delayString = '00'

	if (h && !m && !s) {
		delayString = `${negativeSign}${h}h`
	} else if (!h && m && !s) {
		delayString = `${negativeSign}${m}m`
	} else if (!h && !m && s) {
		delayString = `${negativeSign}${s}s`
	}

	return {
		hours,
		minutes,
		seconds,
		hoursMinutes,
		hoursMinutesSeconds,
		delayString,
		negative: negativeSign,
	}
}

export function eventsToChoices(events: AmaranEvent[]): DropdownChoice[] {
	return events.map(({ id, cue, title }) => {
		return { id, label: `${cue} | ${title}` }
	})
}

export function getAuxTimerState(amaran: Amaran, index = 'auxtimer1') {
	return amaran.state[index as keyof RuntimeStore] as unknown as SimpleTimerState
}

export function findPreviousPlayableEvent(amaran: Amaran): AmaranEvent | null {
	if (amaran.state.eventNow === null) {
		return null
	}

	const nowId = amaran.state.eventNow.id
	let now = false

	for (let i = amaran.events.length - 1; i >= 0; i--) {
		if (!now && amaran.events[i].id === nowId) {
			now = true
			continue
		}
		if (now && !amaran.events[i].skip) {
			return amaran.events[i]
		}
	}

	return null
}
