enum ActionCommand {
	Power = 'toggle_sleep',
	Intensity = 'set_intensity',
	CCT = 'set_cct',
	RGB = 'set_rgb',
	HSI = 'set_hsi',
	SystemEffect = 'set_system_effect',
	Quickshot = 'set_quickshot',
	Preset = 'set_preset',
}

enum ActionId {
	Power = 'power',
	Intensity = 'intensity',
	CCT = 'cct',
	RGB = 'rgb',
	HSI = 'hsi',
	SystemEffect = 'system_effect',
	Quickshot = 'quickshot',
	Preset = 'preset',
}

enum CctId {
	HighPressure = 'highpressure',
	WarmWhite = 'warmwhite',
	Tungsten = 'tungsten',
	StudioLamps = 'studiolamps',
	StudioCPLight = 'studiocplight',
	NaturalWhite = 'naturalwhite',
	Horizon = 'horizon',
	HMI5600 = 'hmi5600',
	DayWhite = 'daywhite',
	HMI6000 = 'hmi6000',
	Xenon = 'xenon',
	Daylight = 'daylight',
	Overcast = 'overcast',
	Moonlight = 'moonlight',
	BlueSky = 'bluesky',
}

enum feedbackId {
	Connected = 'connected',
}

enum variableId {
	Connected = 'connected',
}

export { ActionCommand, ActionId, CctId, feedbackId, variableId }
