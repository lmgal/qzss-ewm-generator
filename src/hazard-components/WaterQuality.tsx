import { useFormContext } from "react-hook-form"
import { IFormInput } from "../interface"

const qualities = [
  'Excellent water quality',
  'Good water quality',
  'Poor water quality',
  'Very poor water quality',
  'Suitable for drinking purpose',
  'Unsuitable for drinking purpose',
  'not used',
  'not used'
]

export function WaterQuality() {
  const form = useFormContext<IFormInput>()

  return (
    <>
      <label className="col-span-2 md:col-span-1">Water Quality</label>
      <select className="col-span-2 md:col-span-1" {...form.register('waterQuality', {
        valueAsNumber: true
      })}>
        {qualities.map((quality, i) => (
          <option key={i} value={i}>
            {quality}
          </option>
        ))}
      </select>
      <span className="text-xs col-span-2">Levels defined based on Water Quality Index (WQI) - a mix was performed between pollution and drinkable or not to also cover some hazard related to the consumption of tap water</span>
    </>
  )
}
