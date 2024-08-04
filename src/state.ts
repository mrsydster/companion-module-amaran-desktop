import { StateType } from './amaran-types'

const state: StateType = {
	quickshots: [],
	devices: [],
	presets: {
		cct: [],
		color: [],
		effect: [],
	},
	scenes: [],
	systemEffects: [
		{ effect: 'candle', name: 'Candle Light' },
		{ effect: 'club_lights', name: 'Club Lights' },
		{ effect: 'color_chase', name: 'Color Chase' },
		{ effect: 'cop_car', name: 'Cop Car' },
		{ effect: 'explosion', name: 'Explosion' },
		{ effect: 'fault_bulb', name: 'Faulty Bulb' },
		{ effect: 'fire', name: 'Fire' },
		{ effect: 'fireworks', name: 'Fireworks' },
		{ effect: 'lightning', name: 'Lightning' },
		{ effect: 'paparazzi', name: 'Paparazzi' },
		{ effect: 'party_lights', name: 'Party Lights' },
		{ effect: 'pulsing', name: 'Pulsing' },
		{ effect: 'strobe', name: 'Strobe' },
		{ effect: 'tv', name: 'TV' },
		{ effect: 'welding', name: 'Welding' },
		{ effect: 'cop_car2', name: 'Cop Car 2' },
		{ effect: 'explosion2', name: 'Explosion 2' },
		{ effect: 'fault_bulb2', name: 'Faulty Bulb 2' },
		{ effect: 'fire2', name: 'Fire 2' },
		{ effect: 'fireworks2', name: 'Fireworks 2' },
		{ effect: 'lightning2', name: 'Lightning 2' },
		{ effect: 'paparazzi2', name: 'Paparazzi 2' },
		{ effect: 'partylights2', name: 'Party Lights 2' },
		{ effect: 'pulsing2', name: 'Pulsing 2' },
		{ effect: 'strobe2', name: 'Strobe 2' },
		{ effect: 'tv2', name: 'TV 2' },
		{ effect: 'welding2', name: 'Welding 2' },
	],
}

export { state }
