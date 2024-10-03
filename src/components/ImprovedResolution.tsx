import { useFormContext } from "react-hook-form"
import { IFormInput } from "../interface"
import { useMemo } from "react"
import { radii, centerLatInt, centerLongInt } from "../constants"

const refinedLatInt = centerLatInt / 8
const refinedLongInt = centerLongInt / 8

export function ImprovedResolution() {
    const form = useFormContext<IFormInput>()
    const [
        refinedCenterLatIdx,
        refinedCenterLongIdx,
        semiMajorAxisX,
        semiMinorAxisX,
        centerLat,
        centerLong,
        semiMajorAxisIdx,
        semiMinorAxisIdx,
    ] = form.watch([
        'refinedCenterLatIdx',
        'refinedCenterLongIdx',
        'semiMajorAxisX',
        'semiMinorAxisX',
        'centerLat',
        'centerLong',
        'semiMajorAxisIdx',
        'semiMinorAxisIdx',
    ])

    const finalCenterLat = useMemo(() => 
        centerLat + centerLatInt / 8 * refinedCenterLatIdx
    , [centerLat, refinedCenterLatIdx])

    const finalCenterLong = useMemo(() => 
        centerLong + centerLongInt / 8 * refinedCenterLongIdx
    , [centerLong, refinedCenterLongIdx])

    const finalSemiMajorAxis = useMemo(() => 
        semiMajorAxisIdx === 0 ? 
            radii[0] - semiMajorAxisX * radii[0] :
            radii[semiMajorAxisIdx] - semiMajorAxisX * 
            (radii[semiMajorAxisIdx] - radii[semiMajorAxisIdx - 1])
    , [semiMajorAxisIdx, semiMajorAxisX])

    const finalSemiMinorAxis = useMemo(() => 
        semiMinorAxisIdx === 0 ? 
            radii[0] - semiMinorAxisX * radii[0] :
            radii[semiMinorAxisIdx] - semiMinorAxisX * 
            (radii[semiMinorAxisIdx] - radii[semiMinorAxisIdx - 1])
    , [semiMinorAxisIdx, semiMinorAxisX])

    return (
        <div className="col-span-2 grid grid-cols-1 gap-1">
            <h2 className="text-xl font-bold ">
                Improved Resolution of Main Ellipse
            </h2>
            <h2 className="text-lg">
                Refined Center Latitude: {refinedCenterLatIdx * refinedLatInt}
            </h2>
            <input type="range" 
                {...form.register('refinedCenterLatIdx', {
                    valueAsNumber: true
                })}
                min={0}
                max={7}  
            />
            <h2 className="text-lg">
                Refined Center Longitude: {refinedCenterLongIdx * refinedLongInt}
            </h2>
            <input type="range" 
                {...form.register('refinedCenterLongIdx', {
                    valueAsNumber: true
                })}
                min={0}
                max={7}  
            />
            <h2 className="text-lg">
                Semi-major Axis Factor: {semiMajorAxisX}
            </h2>
            <input type="range" 
                {...form.register('semiMajorAxisX', {
                    valueAsNumber: true
                })}
                min={0}
                max={0.875}
                step={0.125}
            />
            <h2 className="text-lg">
                Semi-minor Axis Factor: {semiMinorAxisX}
            </h2>
            <input type="range" 
                {...form.register('semiMinorAxisX', {
                    valueAsNumber: true
                })}
                min={0}
                max={0.875}
                step={0.125}
            />
            <h2 className="text-lg font-bold">Final Ellipse Parameters</h2>
            <h2 className="text-lg">
                Center Latitude: {finalCenterLat}
            </h2>
            <h2 className="text-lg">
                Center Longitude: {finalCenterLong}
            </h2>
            <h2 className="text-lg">
                Semi-major Axis (m): {finalSemiMajorAxis}
            </h2>
            <h2 className="text-lg">
                Semi-minor Axis (m): {finalSemiMinorAxis}
            </h2>
        </div>
    )
}
