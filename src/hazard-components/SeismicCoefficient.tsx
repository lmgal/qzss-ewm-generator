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
    <select {...form.register('seismicCoefficient', {
      valueAsNumber: true
    })}>
      <option key={-1} value={-1} selected disabled>Select Seismic Coefficient</option>
      { coefficients.map((coefficient, i) => (
        <option key={i} value={i}>
          {coefficient}
        </option>
      )) }
    </select>
  )
}
