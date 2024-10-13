import { useFormContext } from "react-hook-form"
import { IFormInput } from "../interface"

const fogLevels = [
  'Level 1 of 5: Slight fog or Mist.',
  'Level 2 of 5: Slight fog.',
  'Level 3 of 5: Moderate fog.',
  'Level 4 of 5: Moderate fog.',
  'Level 5 of 5: Thick fog',
]
const fogLevelDescriptions = [
  ' On land, object appear hazy or blurry. Road and rail traffic is unhindered. On sea, horizon cannot be seen. Lights and landmarks can be seen at working distances.',
  ' On land, railroad traffic takes additional caution. On sea, Lights on passing vessel are generally not distinct at distances under 1 mile. Fog signal are sounded.',
  ' On land, rail and road traffic is obstructed. On sea, Lights on passing vessels are generally not distinct at distances under 1 mile. Fog signals are sounded. On river, navigation is unhindered but extre caution is required.',
  ' On land, rail and road traffic impeded. On sea, lights on ships and other vessels cannot be seen at distances of 4 miles or less. On river, navigation is suspended.',
  ' On land, all traffic is impeded and totally disorganized. On sea, lights on ships and other vessels cannot be seen at distances of 4 miles or less. On river, navigation is suspended',
]


export function FogLevel() {
  const form = useFormContext<IFormInput>()
  const fogLevelIdx = form.watch('fogLevel')

  return (
    <>
      <label>Fog Level</label>
      <select {...form.register('fogLevel', {
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
