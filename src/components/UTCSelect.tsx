import { intToBin } from "../utils"
import { UseFormReturn } from "react-hook-form"
import { IFormInput } from "../interface"
import { useEffect } from "react"

export function UTCSelect({ form }: { form: UseFormReturn<IFormInput> }) {
    const { watch, setValue } = form

    const watchUTCSelects = watch(['hazardDay', 
        'hazardHour', 'hazardMinute', 'hazardIsAM'])

    useEffect(() => {
        const [hazardDay, hazardHour, 
            hazardMinute, hazardIsAM] = watchUTCSelects

        let hazardUTC = 1
        hazardUTC += parseInt(hazardMinute)
        hazardUTC += parseInt(hazardHour) * 60
        hazardUTC += parseInt(hazardDay) * 60 * 24
        if (parseInt(hazardIsAM) === 1) 
            hazardUTC += 12 * 60

        setValue('hazardUTCTime', intToBin(hazardUTC, 14))
    }, [watchUTCSelects])

    return (
        <div className="flex">
            <select {...form.register('hazardDay')}>
                <option value={0}>Monday</option>
                <option value={1}>Tuesday</option>
                <option value={2}>Wednesday</option>
                <option value={3}>Thursday</option>
                <option value={4}>Friday</option>
                <option value={5}>Saturday</option>
                <option value={6}>Sunday</option>
            </select>
            <select {...form.register('hazardHour')}>
                {[...Array(12).keys()].map((hour) => (
                    <option key={hour} value={hour}>
                        {hour}
                    </option>
                ))}
            </select>
            <select {...form.register('hazardMinute')}>
                {[...Array(60).keys()].map((minute) => (
                    <option key={minute} value={minute}>
                        {minute.toString().padStart(2, '0')}
                    </option>
                ))}
            </select>
            <select {...form.register('hazardIsAM')}>
                <option value={0}>AM</option>
                <option value={1}>PM</option>
            </select>
        </div>
        
    )
}