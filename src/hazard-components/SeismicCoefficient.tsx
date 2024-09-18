import { UseFormReturn } from "react-hook-form"
import { IFormInput } from "../interface"

const coefficients = [
  '2',
  '3',
  '4',
  '5 weak',
  '5 strong',
  '6 weak',
  '6 strong',
  '7'
]

export function SeismicCoefficient({ form }: { form: UseFormReturn<IFormInput> }) {
  return (
    <>
      <label>Seismic Coefficient</label>
      <select {...form.register('seismicCoefficient', {
        valueAsNumber: true
      })}>
        { coefficients.map((coefficient, i) => (
          <option key={i} value={i}>
            {coefficient}
          </option>
        )) }
      </select>
      <span className="text-xs col-span-2">Reference: This scale is used in Japan to provide information about shaking level.</span>
    </>
  )
}
