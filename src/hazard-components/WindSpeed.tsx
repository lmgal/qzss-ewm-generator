import { useFormContext } from "react-hook-form"
import { IFormInput } from "../interface"

const windSpeeds = [
  'Beaufort 0',
  'Beaufort 1',
  'Beaufort 2',
  'Beaufort 3',
  'Beaufort 4',
  'Beaufort 5',
  'Beaufort 6',
  'Beaufort 7',
  'Beaufort 8',
  'Beaufort 9',
  'Beaufort 10',
  'Beaufort 11',
  'Beaufort 12',
]

const windSpeedDescriptions = [
  '0.0 km/h < v < 1.0 km/h - Calm',
  '1.0 km/h < v < 5.0 km/h - Light Air',
  '6.0 km/h < v < 11.0 km/h - Light Breeze',
  '12.0 km/h < v < 19.0 km/h - Gentle Breeze',
  '20.0 km/h < v < 30.0 km/h - Moderate Breeze',
  '31.0 km/h < v < 39.0 km/h - Fresh Breeze',
  '40.0 km/h < v < 50.0 km/h - Strong Breeze',
  '51.0 km/h < v < 61.0 km/h - Near Gale',
  '62.0 km/h < v < 74.0 km/h - Gale',
  '75.0 km/h < v < 88.0 km/h - Strong Gale',
  '89.0 km/h < v < 102.0 km/h - Storm',
  '103.0 km/h < v < 117.0 km/h - Violent Storm',
  'v > 118.0 km/h - Hurricane',

]

export function WindSpeed() {
  const form = useFormContext<IFormInput>()
  const windSpeedIdx = form.watch('windSpeed')

  return (
    <>
      <label className="col-span-2 md:col-span-1">Wind Speed</label>
      <select className="col-span-2 md:col-span-1" {...form.register('windSpeed', {
        valueAsNumber: true
      })}>
        { windSpeeds.map((windSpeed, i) => (
          <option key={i} value={i}>
            {windSpeed}
          </option>
        )) }
      </select>
      <span className="text-xs col-span-2 font-semibold">{windSpeedDescriptions[windSpeedIdx]}</span>
      <span className="text-xs col-span-2">Reference: Beaufort Wind Scale. Developed in 1805 by Sir Francis Beaufort, U.K. Royal Navy.
https://www.spc.noaa.gov/faq/tornado/beaufort.html</span>
    </>
  )
}
