import { useFormContext } from "react-hook-form"
import { IFormInput } from "../interface"

const hailScales = [
  'H0 Hard hail',
  'H1 Potentially damaging',
  'H2 Significant',
  'H3 Severe',
  'H4 Severe',
  'H5 Destructive',
  'H6 Destructive',
  'H7 Destructive',
  'H8 Destructive',
  'H9 Super Hailstorms',
  'H10 Super Hailstorms'
]
const hailScaleDescriptions = [
  'Typical hail diameter of 5 mm, No damage',
  'Typical hail diameter of 5-15 mm. Slight general damage to plants, crops',
  'Typical hail diameter of 10-20 mm. Slight general damage to fruit, crops, vegetation',
  'Typical hail diameter of 20-30 mm (size of a walnut). Severe damage to fruit and crops, damage to glass and plastic structures, paint and wood scored',
  'Typical hail diameter of 25-40 mm (size of a squash ball). Widespread glass damage, vehicle bodywork damage',
  'Typical hail diameter of 30-50 mm (size of a golf ball). Wholesale destruction of glass, damage to tiled roofs, significant risk of injuries',
  'Typical hail diameter of 40-60 mm. Bodywork of grounded aircraft dented, brick walls pitted',
  'Typical hail diameter of 50-75 mm (size of a tennis ball). Severe roof damage, risk of serious injuries',
  'Typical hail diameter of 60-90 mm (size of a large orange). Severe damage to aircraft bodywork',
  'Typical hail diameter of 75-100 mm (size of a grapefruit). Extensive structural damage. Risk of severe or even fatal injuries to persons caught in the open',
  'Typical hail diameter > 100 mm (size of a melon). Extensive structural damage. Risk of severe or even fatal injuries to persons caught in the open'
]


export function HailScale() {
  const form = useFormContext<IFormInput>()
  const hailScaleIdx = form.watch('hailScale')

  return (
    <>
      <label>Hail Scale</label>
      <select {...form.register('hailScale', {
        valueAsNumber: true
      })}>
        { hailScales.map((hailScale, i) => (
          <option key={i} value={i}>
            {hailScale}
          </option>
        )) }
      </select>
      <span className="text-xs font-semibold col-span-2">{ hailScaleDescriptions[hailScaleIdx] }</span>
      <span className="text-xs col-span-2">REFERENCE - TORRO Hailstorm Intensity Scale. https://www.torro.org.uk/research/hail/hscale</span>
    </>
  )
}
