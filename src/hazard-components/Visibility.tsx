import { useFormContext } from "react-hook-form"
import { IFormInput } from "../interface"

const visibilities = [
  'Dense fog : visibility < 20 m',
  'Thick fog : 20 m < visibility < 200 m',
  'Moderate fog : 200 m < visibility < 500 m',
  'Light fog : 500 m < visibility < 1000 m',
  'Thin fog : 1 km < visibility < 2 km',
  'Haze : 2 km < visibility < 4 km',
  'Light haze : 4 km < visibility < 10 km',
  'Clear : 10 km < visibility < 20 km',
  'Very clear : 20 km < visibility < 50 km',
  'Exceptionally clear : visibility > 50 km',
  'not used',
  'not used',
  'not used',
  'not used',
  'not used', 
  'not used'
]


export function Visibility() {
  const form = useFormContext<IFormInput>()

  return (
    <>
      <label className="col-span-2 md:col-span-1">Visibility</label>
      <select className="col-span-2 md:col-span-1" {...form.register('visibility', {
        valueAsNumber: true
      })}>
        { visibilities.map((visibility, i) => (
          <option key={i} value={i}>
            {visibility}
          </option>
        )) }
      </select>
      <span className="text-xs col-span-2">REFERENCE: International visibility code with meteorological range.</span>
    </>
  )
}
