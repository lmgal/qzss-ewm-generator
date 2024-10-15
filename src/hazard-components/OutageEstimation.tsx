import { useFormContext } from "react-hook-form"
import { IFormInput } from "../interface"

const durations = [
  '0 < duration < 30 min',
  '30 min <= duration < 45 min',
  '45 min <= duration < 1 h',
  '1 h <= duration < 1h 30min',
  '1h 30min <= duration < 2 h',
  '2 h <= duration < 3 h',
  '3 h <= duration < 4 h',
  '4 h <= duration < 5 h',
  '5 h <= duration < 10 h',
  '10 h <= duration < 24 h',
  '24 h <= duration < 2 days',
  '2 days <= duration < 7 days',
  '7 days <= duration',
  'Unknown',
  'not used',
  'not used',
  'not used',
]

export function OutageEstimatedDuration() {
  const form = useFormContext<IFormInput>()

  return (
    <>
      <label className="col-span-2 md:col-span-1">Outage Estimation Duration</label>
      <select className="col-span-2 md:col-span-1" {...form.register('outageEstimatedDuration', {
        valueAsNumber: true
      })}>
        { durations.map((duration, i) => (
          <option key={i} value={i}>
            {duration}
          </option>
        )) }
      </select>
    </>
  )
}
