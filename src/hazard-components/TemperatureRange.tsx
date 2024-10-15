import { useFormContext } from "react-hook-form"
import { IFormInput } from "../interface"

const temperatures = [
  '< T < -30',
  '-30 < T < -25',
  '-25 < T < -20',
  '-20 < T < -15',
  '-15 < T < -10',
  '-10 < T < -5',
  '-5 < T < 0',
  '0 < T < 5',
  '5 < T < 10',
  '10 < T < 15',
  '15 < T < 20',
  '20 < T < 25',
  '25 < T < 30',
  '30 < T < 35',
  '35 < T < 45',
  'T > 45'
]

export function TemperatureRange() {
  const form = useFormContext<IFormInput>()
  
  return (
    <>
      <label className="col-span-2 md:col-span-1">Temperature Range</label>
      <select className="col-span-2 md:col-span-1" {...form.register('temperatureRange', {
        valueAsNumber: true
      })}>
        {temperatures.map((temperature, i) => (
          <option key={i} value={i}>
            {temperature}
          </option>
        ))}
      </select>
    </>
  )
}
