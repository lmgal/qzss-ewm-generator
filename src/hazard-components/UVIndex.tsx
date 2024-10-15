import { useFormContext } from "react-hook-form"
import { IFormInput } from "../interface"

const indices = [
  '0 - 2 Low',
  '3/11 Moderate',
  '4/11 Moderate',
  '5/11 High',
  '6/11 High',
  '7/11 High',
  '8/11 Very high',
  '9/11 Very high',
  '10/11 Extreme',
  '11/11 Extreme'
]

export function UVIndex() {
  const form = useFormContext<IFormInput>()

  return (
    <>
      <label className="col-span-2 md:col-span-1">UV Index</label>
      <select className="col-span-2 md:col-span-1" {...form.register('uvIndex', {
        valueAsNumber: true
      })}>
        { indices.map((index, i) => (
          <option key={i} value={i}>
            {index}
          </option>
        )) }
      </select>
      <span className="text-xs col-span-2">The UV Index is a scale, ranging from 0 (low) to 11+ (extreme), that indicates the intensity of solar UV radiation reaching Earth's surface on a given day. A UV Alert is issued only when the UV Index forecast is at least 6 and also is statistically higher than normal </span>
      <span className="text-xs col-span-2">REFERENCE - UV Index scale by United States Environmental Protection Agency https://www.epa.gov/sunsafety/uv-index-scale-0</span>
    </>
  )
}
