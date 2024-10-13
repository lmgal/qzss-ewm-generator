import { useFormContext } from "react-hook-form"
import { IFormInput } from "../interface"

const fireRiskLevels = [
  'Danger level 1/5 (low or none danger)',
  'Danger level 2/5 (moderate danger)',
  'Danger level 3/5 (considerable danger)',
  'Danger level 4/5 (high danger)',
  'Danger level 5/5 (very high danger)'
]


export function FireRiskLevel() {
  const form = useFormContext<IFormInput>()

  return (
    <>
      <label>Fire Risk Level</label>
      <select {...form.register('fireRiskLevel', {
        valueAsNumber: true
      })}>
        { fireRiskLevels.map((fireRiskLevel, i) => (
          <option key={i} value={i}>
            {fireRiskLevel}
          </option>
        )) }
      </select>
      <span className="text-xs col-span-2">REFERENCE - Swiss federal council - https://www.natural-hazards.ch/home/dealing-with-natural-hazards/forest-fire/danger-levels.html</span>
    </>
  )
}
