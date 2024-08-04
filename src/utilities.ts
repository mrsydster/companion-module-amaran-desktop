export function intToRgbWithIntensity(intColor: number, intensity: number | null): { r: number; g: number; b: number } {
	// Ensure intensity is within the range 0 to 1000
	intensity = Math.max(0, Math.min(1000, intensity || 500))

	// Calculate the scaling factor based on the intensity
	const scaleFactor = intensity / 1000

	// Extract and scale the RGB components
	const r = Math.round(((intColor >> 16) & 255) * scaleFactor)
	const g = Math.round(((intColor >> 8) & 255) * scaleFactor)
	const b = Math.round((intColor & 255) * scaleFactor)

	return { r, g, b }
}

// Not used yet
export function transformGMValue(x: number): number {
	return 10 * (x + 1)
}
