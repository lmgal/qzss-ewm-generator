import { useFormContext } from "react-hook-form"
import { IFormInput } from "../interface"

const windSpeeds = [
  'Beaufort 0. 0 km/h < v < 1 km/h - Calm',
  'Beaufort 1. 1 km/h < v < 5 km/h - Light Air',
  'Beaufort 2. 6 km/h < v < 11 km/h - Light Breeze',
  'Beaufort 3. 12 km/h < v < 19 km/h -  Gentle Breeze',
  'Beaufort 4. 20km/h < v < 30 km/h - Moderate Breeze',
  'Beaufort 5. 31 km/h < v < 39 km/h - Fresh Breeze',
  'Beaufort 6. 40 km/h < v < 50 km/h - Strong Breeze',
  'Beaufort 7. 51 km/h < v < 61 km/h - Near Gale',
  'Beaufort 8. 62 km/h < v < 74 km/h -  Gale',
  'Beaufort 9. 75 km/h < v < 88 km/h - Strong Gale',
  'Beaufort 10. 89 km/h < v < 102 km/h - Storm',
  'Beaufort 11. 103 km/h < v < 117 km/h - Violent Storm',
  'Beaufort 12. v > 118 km/h - Hurricane',
]

export function WindSpeed() {
  const form = useFormContext<IFormInput>()

  return (
    <>
      <label>Wind Speed</label>
      <select {...form.register('windSpeed', {
        valueAsNumber: true
      })}>
        { windSpeeds.map((windSpeed, i) => (
          <option key={i} value={i}>
            {windSpeed}
          </option>
        )) }
      </select>
      <span className="text-xs col-span-2">Reference: Beaufort Wind Scale. Developed in 1805 by Sir Francis Beaufort, U.K. Royal Navy.
https://www.spc.noaa.gov/faq/tornado/beaufort.html</span>
    </>
  )
}
