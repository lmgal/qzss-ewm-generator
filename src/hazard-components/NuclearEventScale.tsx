import { useFormContext } from "react-hook-form"
import { IFormInput } from "../interface"

const scales = [
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

const scaleDescriptions = [
  'Unknown',
  'No safety significance',
  'Overexposure in excess of statutory annual limits. Minor problems with safety components with significant defence-in-depth remaining. Low activity lost or stolen radioactive source, device, or transport package.',
  'Impact on people and environment: Exposure of the public in excess of 10 mSv. Exposure of workers in excess of the statutory annual limits. Impact on radiological barriers and control: Radiation levels in an operating area of more than 50 mSv/h. Significant contamination within the facility into an area not expected by design. Possible cause: Significant failures in safety provisions but with no actual consequences. Found highly radioactive sealed orphan source, device or transport package with safety provisions intact. Inadequate packaging of a highly radioactive sealed source.',
  'Impact on people and environment: Exposure in excess of ten times the statutory annual limit for workers. Non-lethal deterministic health effect (e.g., burns) from radiation. Impact on radiological barriers and control: Exposure rates of more than 1 Sv/h in an operating area. Severe contamination in an area not expected by design, with a low probability of significant public exposure. Possible cause: Near-accident at a nuclear power plant with no safety provisions remaining. Lost or stolen highly radioactive sealed source. Misdelivered highly radioactive sealed source without adequate procedures in place to handle it.',
  'Impact on people and environment: Minor release of radioactive material unlikely to result in implementation of planned countermeasures other than local food controls. Impact on radiological barriers and control: Release of significant quantities of radioactive material within an installation with a high probability of significant public exposure.',
  'Impact on people and environment: Limited release of radioactive material likely to require implementation of some planned countermeasures. Major health impact from radiation is likely. Impact on radiological barriers and control: Severe damage to reactor core. Release of large quantities of radioactive material within an installation with a high probability of significant public exposure. This could arise from a major criticality accident or fire.',
  'Impact on people and environment: Significant release of radioactive material likely to require implementation of planned countermeasures.',
  'Impact on people and environment: Major release of radioactive material with widespread health and environmental effects requiring implementation of planned and extended countermeasures.',
]

export function NuclearEventScale() {
  const form = useFormContext<IFormInput>()
  const nuclearIdx = form.watch('nuclearEventScale')

  return (
    <>
      <label className="col-span-2 md:col-span-1">Nuclear Event Scale</label>
      <select className="col-span-2 md:col-span-1" {...form.register('nuclearEventScale', {
        valueAsNumber: true
      })}>
        { scales.map((scale, i) => (
          <option key={i} value={i}>
            {scale}
          </option>
        )) }
      </select>
      <span className="text-xs col-span-2 font-semibold">{scaleDescriptions[nuclearIdx]}</span>
      <span className="text-xs col-span-2">REFERENCE - International Nuclear and Radiological Event Scale (INES) by IAEA (International Atomic Energy Agency)</span>
    </>
  )
}
