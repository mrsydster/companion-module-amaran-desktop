type QuickshotType = {
	id: string
	name: string
	scene_id: string
}

type DeviceType = {
	id: string
	name: string
	node_id: string
}

type SceneType = {
	id: string
	name: string
	fixtures: DeviceType[]
	groups: DeviceType[]
}

type SystemEffectType = {
	effect: string
	name: string
}

type PresetType = {
	id: string
	category: string
	name: string
}

type PresetsType = {
	cct: PresetType[]
	color: PresetType[]
	effect: PresetType[]
}

type StateType = {
	quickshots: QuickshotType[]
	devices: DeviceType[]
	presets: PresetsType
	scenes: SceneType[]
	systemEffects: SystemEffectType[]
}

export { DeviceType, SceneType, SystemEffectType, StateType, QuickshotType, PresetsType }
