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
   'On land, object appear hazy or blurry. Road and rail traffic is unhindered. On sea, horizon cannot be seen. Lights and landmarks can be seen at working distances.',
  'On land, railroad traffic takes additional caution. On sea, Lights on passing vessel are generally not distinct at distances under 1 mile. Fog signal are sounded.',
  'On land, rail and road traffic is obstructed. On sea, Lights on passing vessels are generally not distinct at distances under 1 mile. Fog signals are sounded. On river, navigation is unhindered but extre caution is required.',
  'On land, rail and road traffic impeded. On sea, lights on ships and other vessels cannot be seen at distances of 4 miles or less. On river, navigation is suspended',
  'On land, all traffic is impeded and totally disorganized. On sea, lights on ships and other vessels cannot be seen at distances of 4 miles or less. On river, navigation is suspended.',
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
