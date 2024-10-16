import { useFormContext } from "react-hook-form"
import { IFormInput } from "../interface"
import { radii, lengthFactors } from "../constants"

export function CenterToEpicenter() {  
  const form = useFormContext<IFormInput>()

  const [
    azimuthIdx,
    lengthIdx,
    semiMajorAxisIdx,
    semiMajorAxisX,
  ] = form.watch([
    'azimuthFromCenterToEpicenterIdx',
    'lengthBetweenCenterAndEpicenterIdx',
    'semiMajorAxisIdx',
    'semiMajorAxisX',
  ])

  const azimuth = azimuthIdx * 22.5
  const finalSemiMajorAxis = semiMajorAxisIdx === 0 ? 
          radii[0] - semiMajorAxisX * radii[0] :
          radii[semiMajorAxisIdx] - semiMajorAxisX * 
          (radii[semiMajorAxisIdx] - radii[semiMajorAxisIdx - 1])
  const length = lengthFactors[lengthIdx] * finalSemiMajorAxis
  
  return (
    <div className="grid gap-1 col-span-2">
        <label className="col-span-2 md:col-span-1">Azimuth from Center of Main Ellipse to Epicenter: { azimuth }</label>
        <input className="col-span-2 md:col-span-1" type="range"
            {...form.register('azimuthFromCenterToEpicenterIdx', {
                valueAsNumber: true
            })}
            min={0}
            max={2**4 - 1}
        />
        <label className="col-span-2 md:col-span-1">Vector Length from Center of Main Ellipse to Epicenter: { length } ({ lengthFactors[lengthIdx] })</label>
        <input className="col-span-2 md:col-span-1" type="range"
            {...form.register('lengthBetweenCenterAndEpicenterIdx', {
                valueAsNumber: true
            })}
            min={0}
            max={2**4 - 1}
        />
    </div>
  )
}
