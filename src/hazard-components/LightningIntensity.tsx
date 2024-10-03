import { useFormContext } from "react-hook-form"
import { IFormInput } from "../interface"

const intensities = [
  { level: 'LAL 1', description: 'No thunderstorms' },
  { level: 'LAL 2', description: 'Isolated thunderstorms. Light rain will occasionally reach the ground. Lightning is very infrequent, 1 to 5 cloud to ground strikes in a five minute period.' },
  { level: 'LAL 3', description: 'Widely scattered thunderstorms. Light to moderate rain will reach the ground. Lightning is infrequent, 6 to 10 cloud to ground strikes in a 5 minute period.' },
  { level: 'LAL 4', description: 'Scattered thunderstorms. Moderate rain is commonly produced Lightning is frequent, 11 to 15 cloud to ground strikes in a 5 minute period.' },
  { level: 'LAL 5', description: 'Numerous thunderstorms. Rainfall is moderate to heavy. Lightning is frequent and intense, greater then 15 cloud to ground strikes in a 5 minute period.' },
  { level: 'LAL 6', description: 'Dry lightning (same as LAL 3 but without rain). This type of lightning has the potential for extreme fire activity and is normally highlighted in fire weather forecasts with a Red Flag Warning.' },
]

export function LightningIntensity() {
  const form = useFormContext<IFormInput>()
  const intensityIdx = form.watch('lightningIntensity')

  return (
    <>
      <label>Lightning Intensity</label>
      <select {...form.register('lightningIntensity', {
        valueAsNumber: true
      })}>
        {intensities.map((intensity, i) => (
          <option key={i} value={i}>
            {intensity.level}
          </option>
        ))}
      </select>
      <span className="text-xs font-semibold col-span-2">{ intensities[intensityIdx].description }</span>
      <span className="text-xs col-span-2">Reference: NOAA Lightning Activity Level (LAL) Definition. https://graphical.weather.gov/definitions/defineLAL.html</span>
    </>
  )
}
