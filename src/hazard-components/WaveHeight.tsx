import { UseFormReturn } from "react-hook-form"
import { IFormInput } from "../interface"

const heights = [
  '< 0.5',
  '0.5 < 1.0',
  '1.0 < 1.5',
  '1.5 < 2.0',
  '2.0 < 3.0',
  '3.0 < 5.0',
  '5.0 < 10.0',
  '> 10.0'
]

export function WaveHeight({ form }: { form: UseFormReturn<IFormInput> }) {
  return (
    <>
      <label>Wave Height (m)</label>
      <select {...form.register('waveHeight', {
        valueAsNumber: true
      })}>
        {heights.map((height, i) => (
          <option key={i} value={i}>
            {height}
          </option>
        ))}
      </select>
      <span className="text-xs col-span-2">Reference: NOAA definition. https://www.ndbc.noaa.gov/educate/waves.shtml</span>
    </>
  )
}
