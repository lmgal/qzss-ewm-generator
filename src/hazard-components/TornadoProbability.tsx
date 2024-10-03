import { useFormContext } from "react-hook-form"
import { IFormInput } from "../interface"

const probabilities = [
  'Non-Threatening',
  'Very Low',
  'low',
  'Moderate',
  'High',
  'Extreme',
]

export function TornadoProbability() {
  const form = useFormContext<IFormInput>()

  return (
    <>
      <label>Tornado Probability</label>
      <select {...form.register('tornadoProbability', {
        valueAsNumber: true
      })}>
        { probabilities.map((probability, i) => (
          <option key={i} value={i}>
            {probability}
          </option>
        )) }
      </select>
    </>
  )
}
