import { useFormContext } from "react-hook-form"
import { IFormInput } from "../interface"

const ashfallAmounts = [
  'Less than 1 mm ash thickness',
  '1-5 mm ash thickness',
  '5-100 mm ash thickness',
  '100-300 mm ash thickness',
  '> 300 mm ash thickness'
]


export function AshfallAmount() {
  const form = useFormContext<IFormInput>()

  return (
    <>
      <label>Ash Fall Amount</label>
      <select {...form.register('ashFallAmount', {
        valueAsNumber: true
      })}>
        { ashfallAmounts.map((ashfallAmount, i) => (
          <option key={i} value={i}>
            {ashfallAmount}
          </option>
        )) }
      </select>
    </>
  )
}
