export function intToRgbWithIntensity(intColor: number, intensity: number | null): { r: number; g: number; b: number } {
	// Ensure intensity is within the range 0 to 1000
	intensity = Math.max(0, Math.min(1000, intensity || 500))

	const r = (((intColor >> 16) & 255) * intensity) / 1000
	const g = (((intColor >> 8) & 255) * intensity) / 1000
	const b = ((intColor & 255) * intensity) / 1000

	return { r: Math.round(r), g: Math.round(g), b: Math.round(b) }
}
