import { useFormContext } from "react-hook-form"
import { IFormInput } from "../interface"

const terrorismThreatLevels = [
  'Very low threat level',
  'Low threat level',
  'Medium threat level',
  'High threat level',
  'Critical threat level'
]

const terrorismThreatDescriptions = [
  'Power systems: Weak power grid fluctuations can occur. Spacecraft operations: Minor impact on satellite operations possible. Other systems: Migratory animals are affected at this and higher levels; aurora is commonly visible at high latitudes.',
  'Power systems: High-latitude power systems may experience voltage alarms, long-duration storms may cause transformer damage. Spacecraft operations: Corrective actions to orientation may be required by ground control; possible changes in drag affect orbit predictions. Other systems: HF radio propagation can fade at higher latitudes, and aurora has been seen as low as 55° geomagnetic lat.',
  'Power systems: Voltage corrections may be required, false alarms triggered on some protection devices. Spacecraft operations: Surface charging may occur on satellite components, drag may increase on low-Earth-orbit satellites, and corrections may be needed for orientation problems. Other systems: Intermittent satellite navigation and low-frequency radio navigation problems may occur, HF radio may be intermittent, and aurora has been seen as low as 50° geomagnetic lat.',
  'Power systems: Possible widespread voltage control problems and some protective systems will mistakenly trip out key assets from the grid. Spacecraft operations: May experience surface charging and tracking problems, corrections may be needed for orientation problems. Other systems: Induced pipeline currents affect preventive measures, HF radio propagation sporadic, satellite navigation degraded for hours, low-frequency radio navigation disrupted, and aurora has been seen as low as 45° geomagnetic lat.',
  'Power systems: Widespread voltage control problems and protective system problems can occur, some grid systems may experience complete collapse or blackouts. Transformers may experience damage. Spacecraft operations: May experience extensive surface charging, problems with orientation, uplink/downlink and tracking satellites. Other systems: Pipeline currents can reach hundreds of amps, HF (high frequency) radio propagation may be impossible in many areas for one to two days, satellite navigation may be degraded for days, low-frequency radio navigation can be out for hours, and aurora has been seen as low 40° geomagnetic lat.'
]


export function TerrorismThreatLevel() {
  const form = useFormContext<IFormInput>()
  const terrorismThreatIdx = form.watch('terrorismThreatLevel')

  return (
    <>
      <label>Terrorism Threat Level</label>
      <select {...form.register('terrorismThreatLevel', {
        valueAsNumber: true
      })}>
        { terrorismThreatLevels.map((terrorismThreatLevel, i) => (
          <option key={i} value={i}>
            {terrorismThreatLevel}
          </option>
        )) }
      </select>
      <span className="text-xs font-semibold col-span-2">{ terrorismThreatDescriptions[terrorismThreatIdx] }</span>
    </>
  )
}
