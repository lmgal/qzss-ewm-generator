import { useFormContext } from "react-hook-form"
import { IFormInput } from "../interface"

const step = 20 / (2 ** 7)

export function HazardCenter() {
    const form = useFormContext<IFormInput>()
    const [
        hazardCenterDeltaLatIdx,
        hazardCenterDeltaLongIdx,
    ] = form.watch([
        'hazardCenterDeltaLatIdx',
        'hazardCenterDeltaLongIdx',
    ])

    // Exclude 0 from the range of possible values
    const hazardDeltaLat = hazardCenterDeltaLatIdx >= 2 ** 6 ? 
        (hazardCenterDeltaLatIdx + 1) * step - 10 :
        hazardCenterDeltaLatIdx * step - 10
    const hazardDeltaLong = hazardCenterDeltaLongIdx >= 2 ** 6 ? 
        (hazardCenterDeltaLongIdx + 1) * step - 10 :
        hazardCenterDeltaLongIdx * step - 10

    return (
        <div className='col-span-2 grid grid-cols-1 gap-1'>
            <h2 className='text-lg font-bold'>Hazard Center</h2>
            <h2 className='text-lg'>
                Delta Latitude from Ellipse Center: {hazardDeltaLat}
            </h2>
            <input type='range'
                {...form.register('hazardCenterDeltaLatIdx', {
                    valueAsNumber: true
                })}
                min={0}
                max={2**7 - 1}
            />
            <h2 className='text-lg'>
                Delta Longitude from Ellipse Center: {hazardDeltaLong}
            </h2>
            <input type='range'
                {...form.register('hazardCenterDeltaLongIdx', {
                    valueAsNumber: true
                })}
                min={0}
                max={2**7 - 1}
            />
        </div>
    )
}
