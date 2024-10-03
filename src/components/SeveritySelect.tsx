import { IFormInput } from "../interface"
import { useFormContext } from "react-hook-form"

const severities = [
    "Unknown",
    "Moderate - Possible threat to life or property",
    "Severe - Significant threat to life or property",
    "Extreme - Extraordinary threat to life or property"
]

export function SeveritySelect() {
    const form = useFormContext<IFormInput>()

    return (
        <select {...form.register('hazardSeverity', {
            valueAsNumber: true
        })}>
            {severities.map((severity, i) => (
                <option key={severity} value={i}>
                    {severity}
                </option>
            ))}
        </select>
    )
}
