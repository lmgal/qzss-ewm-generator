import { useFormContext } from "react-hook-form"
import { IFormInput } from "../interface"

const fogLevels = [
  'Unknown',
  'Level 0/7. Deviation.',
  'Level 1/7. Anomaly.',
  'Level 2/7. Incident.',
  'Level 3/7. Serious incident.',
  'Level 4/7. Accident with local consequences.',
  'Level 5/7. Accident with wider consequences.',
  'Level 6/7. Serious accident.',
  'Level 7/7. Major accident.',
]
const fogLevelDescriptions = [
]


export function FogLevel() {
  const form = useFormContext<IFormInput>()
  const fogLevelIdx = form.watch('fogLevel')

  return (
    <>
      <label className="col-span-2 md:col-span-1">Fog Level</label>
      <select className="col-span-2 md:col-span-1" {...form.register('fogLevel', {
        valueAsNumber: true
      })}>
        { fogLevels.map((fogLevel, i) => (
          <option key={i} value={i}>
            {fogLevel}
          </option>
        )) }
      </select>
      <span className="text-xs font-semibold col-span-2">{ fogLevelDescriptions[fogLevelIdx] }</span>
    </>
  )
}
