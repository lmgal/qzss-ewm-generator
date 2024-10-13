import { useFormContext } from "react-hook-form"
import { IFormInput } from "../interface"

const avalanceWarningLevels = [
    '1 - Low',
    '2 - Moderate',
    '3 - Considerable',
    '4 - High',
    '5 - Very High',
]
const avalanceWarningLevelDescriptions = [
  [
    'Generally stable conditions.',
    'Triggering is generally possible only from high additional loads in isolated areas of very steep, extreme terrain. Only small and medium natural avalanches are possible.'
  ],
  [
    'Heightened avalanche conditions on specific terrain features.',
    'Triggering is possible, primarily from high additional loads, particularly on the indicated steep slopes. Very large natural avalanches are unlikely.'
  ],
  [
    'Dangerous avalanche conditions',
    'Triggering is possible, even from low additional loads, particularly on the indicated steep slopes. In certain situations some large, and in isolated cases very large natural avalanches are possible.'
  ],
  [
    'Very dangerous avalanche conditions.',
    'Triggering is likely, even from low additional loads, on many steep slopes. In some cases, numerous large and often very large natural avalanches can be expected.'
  ],
  [
    'Extraordinary avalanche conditions.',
    'Numerous very large and often extremely large natural avalanches can be expected, even in moderately steep terrain.'
  ]
]


export function AvalanceRiskLevel() {
  const form = useFormContext<IFormInput>()
  const avalanceRiskLevelIdx = form.watch('avalanceWarningLevel')

  return (
    <>
      <label>Avalance Risk Level</label>
      <select {...form.register('avalanceWarningLevel', {
        valueAsNumber: true
      })}>
        { avalanceWarningLevels.map((droughtLevel, i) => (
          <option key={i} value={i}>
            {droughtLevel}
          </option>
        )) }
      </select>
      { avalanceRiskLevelIdx !== undefined && avalanceWarningLevelDescriptions[avalanceRiskLevelIdx].map((description, i) => (
        <span key={i} className="text-xs font-semibold col-span-2">{ description }</span>
      )) } 
      <span className="text-xs col-span-2">REFERENCE - EU Avalanche Danger Scale from EAWS (European Avalanche Warning Service) - https://www.avalanches.org/standards/avalanche-danger-scale/</span>
    </>
  )
}
