import { useFormContext } from "react-hook-form"
import { IFormInput } from "../interface"

const categories = [
  'Scale 1 and Intensity 1',
  'Scale 1 and Intensity 2',
  'Scale 1 and Intensity 3',
  'Scale 2 and Intensity 1',
  'Scale 2 and Intensity 2',
]

export function TyphoonCategory() {
  const form = useFormContext<IFormInput>()
  
  return (
    <>
      <label>Typhoon Category</label>
      <select {...form.register('typhoonCategory', {
        valueAsNumber: true
      })}>
        { categories.map((category, i) => (
          <option key={i} value={i}>
            {category}
          </option>
        )) }
      </select>
    </>
  )
}
