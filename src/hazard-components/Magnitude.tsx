import { UseFormReturn } from "react-hook-form"
import { IFormInput } from "../interface"

const magnitudes = [
  { magnitude: '1.0-1.9', description: 'Micro' },
  { magnitude: '2.0-2.9', description: 'Minor' },
  { magnitude: '3.0-3.9', description: 'Minor' },
  { magnitude: '4.0-4.9', description: 'Light' },
  { magnitude: '5.0-5.9', description: 'Moderate' },
  { magnitude: '6.0-6.9', description: 'Strong' },
  { magnitude: '7.0-7.9', description: 'Major' },
  { magnitude: '8.0-8.9', description: 'Great' },
  { magnitude: '9.0 and greater', description: 'Great' },
]

export function Magnitude({ form }: { form: UseFormReturn<IFormInput> }) {
  return (
    <select {...form.register('magnitude', {
      valueAsNumber: true
    })}>
      <option key={-1} value={-1} selected disabled>Select Magnitude</option>
      { magnitudes.map((magnitude, i) => (
        <option key={i} value={i}>
          {magnitude.magnitude} {magnitude.description}
        </option>
      )
      )}
    </select>
  )
}
