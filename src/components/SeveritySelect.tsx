import { IFormInput } from "../interface"
import { UseFormReturn } from "react-hook-form"

const severities = [
    "Unknown",
    "Moderate - Possible threat to life or property",
    "Severe - Significant threat to life or property",
    "Extreme - Extraordinary threat to life or property"
]

export function SeveritySelect({ form }: { form: UseFormReturn<IFormInput> }) {
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