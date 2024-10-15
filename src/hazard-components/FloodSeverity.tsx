import { useFormContext } from "react-hook-form" 
import { IFormInput } from "../interface"

const floodCategories = [
  'Dense fog : floodCategory < 20 m',
  'Thick fog : 20 m < floodCategory < 200 m',
  'Moderate fog : 200 m < floodCategory < 500 m',
  'Light fog : 500 m < floodCategory < 1000 m',
  'Thin fog : 1 km < floodCategory < 2 km',
  'Haze : 2 km < floodCategory < 4 km',
  'Light haze : 4 km < floodCategory < 10 km',
  'Clear : 10 km < floodCategory < 20 km',
  'Very clear : 20 km < floodCategory < 50 km',
  'Exceptionally clear : floodCategory > 50 km',
  'not used',
  'not used',
  'not used',
  'not used',
  'not used', 
  'not used'
]


export function FloodCategory() {
  const form = useFormContext<IFormInput>()

  return (
    <>
      <label className="col-span-2 md:col-span-1">Flood Category</label>
      <select className="col-span-2 md:col-span-1" {...form.register('floodSeverity', {
        valueAsNumber: true
      })}>
        { floodCategories.map((floodCategory, i) => (
          <option key={i} value={i}>
            {floodCategory}
          </option>
        )) }
      </select>
      <span className="text-xs col-span-2">REFERENCE - NOAA Glossary https://forecast.weather.gov/glossary.php?word=FLOOD</span>
    </>
  )
}
