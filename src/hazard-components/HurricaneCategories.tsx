import { UseFormReturn } from "react-hook-form"
import { IFormInput } from "../interface"

const categories = [
    'Category 1/5 Hurricane',
    'Category 2/5 Hurricane',
    'Category 3/5 Hurricane',
    'Category 4/5 Hurricane',
    'Category 5/5 Hurricane',
]

export function HurricaneCategory({ form }: { form: UseFormReturn<IFormInput> }) {
  return (
    <>
      <label>Hurricane Category</label>
      <select {...form.register('hurricaneCategory', {
        valueAsNumber: true
      })}>
        { categories.map((category, i) => (
          <option key={i} value={i}>
            {category}
          </option>
        )) }
      </select>
      <span className="text-xs col-span-2">Reference: The Saffir-Simpson Hurricane Wind Scale</span>
    </>
  )
}
