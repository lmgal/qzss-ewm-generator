import { useFormContext } from "react-hook-form"
import { IFormInput } from "../interface"

const numbers = [
  '0 - 10',
  '10 - 20',
  '20 - 50',
  '50 - 70',
  '70 - 100',
  '100- 125',
  '125 - 150',
  '150 - 175',
  '175 - 200',
  '200 - 250',
  '250 - 300',
  '300 - 350',
  '350 - 400',
  '400 - 450',
  '450 - 500',
  '500 - 750',
  '750 - 1000',
  '> 1000',
  '> 2000',
  '> 3000',
  '> 5000'
]

export function NumberOfCases() {
  const form = useFormContext<IFormInput>()

  return (
    <>
      <label className="col-span-2 md:col-span-1">Number of cases per 100 000 inhabitants</label>
      <select className="col-span-2 md:col-span-1" {...form.register('caseNumberPer100000', {
        valueAsNumber: true
      })}>
        {numbers.map((number, i) => (
          <option key={i} value={i}>
            {number}
          </option>
        ))}
      </select>
    </>
  )
}
