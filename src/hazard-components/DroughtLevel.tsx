import { useFormContext } from "react-hook-form"
import { IFormInput } from "../interface"

const droughtLevels = [
  'D1 - Moderate Drought - PDSI = -2.0 to -2.9',
  'D2 - Severe Drought - PDSI = -3.0 to -3.9',
  'D3 - Extreme Drought - PDSI = -4.0 to -4.9',
  'D4 - Exceptional Drought - PDSI = -5.0 or less',
]
const droughtLevelDescriptions = [
  [
    'Some damage to crops, pastures',
    'Streams, reservoirs, or wells low, some water shortages developing or imminent',
    'Voluntary water-use restrictions requested'
  ],
  [
    'Crop or pasture losses likely',
    'Water shortages common',
    'Water restrictions imposed'
  ],
  [
    'Major crop/pasture losses',
    'Widespread water shortages or restrictions'
  ],
  [
    'Exceptional and widespread crop/pasture losses',
    'Shortages of water in reservoirs, streams, and wells creating water emergencies'
  ]
]


export function DroughtLevel() {
  const form = useFormContext<IFormInput>()
  const droughtLevelIdx = form.watch('droughtLevel')

  return (
    <>
      <label className="col-span-2 md:col-span-1">Drought Level</label>
      <select className="col-span-2 md:col-span-1" {...form.register('droughtLevel', {
        valueAsNumber: true
      })}>
        { droughtLevels.map((droughtLevel, i) => (
          <option key={i} value={i}>
            {droughtLevel}
          </option>
        )) }
      </select>
      { droughtLevelIdx !== undefined && droughtLevelDescriptions[droughtLevelIdx].map((description, i) => (
        <span key={i} className="text-xs font-semibold col-span-2">{ description }</span>
      )) } 
      <span className="text-xs col-span-2">REFERENCE - Drought Classification - Palmer Drought Severity Index (PDSI) - https://droughtmonitor.unl.edu/About/AbouttheData/DroughtClassification.aspx</span>
    </>
  )
}
