import { useFormContext } from "react-hook-form"
import { IFormInput } from "../interface"

const categories = [
  'Category 1 - Very dangerous winds will produce some damage. Scale 1 and Intensity 1',
  'Category 2 - Extremely dangerous winds will cause extensive damage. Scale 1 and Intensity 2',
  'Category 3 - Devastating damage will occur. Scale 1 and Intensity 3',
  'Category 4 - Catastrophic damage will occur. Scale 2 and Intensity 1',
  'Category 5 - Catastrophic damage will occur. Scale 2 and Intensity 2',
  'Category 5 - Catastrophic damage will occur. Scale 3 and Intensity 3',
]

export function DamageCategory() {
  const form = useFormContext<IFormInput>()

  return (
    <>
      <label className="col-span-2 md:col-span-1">Damage Category</label>
      <select className="col-span-2 md:col-span-1" {...form.register('damageCategory', {
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

