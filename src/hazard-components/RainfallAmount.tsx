import { UseFormReturn } from "react-hook-form"
import { IFormInput } from "../interface"


const rainfalls = [
  'p < 2.5',
  '2.5 < p < 7.5',
  '7.5 < p < 10',
  '10 < p < 20',
  '20 < p < 30',
  '30 < p < 50',
  '50 < p < 80',
  '80 < p'
]

export function RainfallAmount({ form }: { form: UseFormReturn<IFormInput> }) {
  return (
    <>
      <label>Rainfall Amount (mm/hour)</label>
      <select {...form.register('rainfallAmount', {
        valueAsNumber: true
      })}>
        { rainfalls.map((rainfall, i) => (
          <option key={i} value={i}>
            {rainfall}
          </option>
        )) }
      </select>
      <span className="text-xs col-span-2">Reference: https://www.jma.go.jp/jma/kishou/know/yougo_hp/amehyo.html</span>
    </>
  )
}
