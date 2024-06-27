import { useEffect } from "react"
import { UseFormReturn, useFieldArray } from "react-hook-form"
import { intToBin } from "../utils"
import { IFormInput } from "../interface"

const defaultProviders : { [key: string] : Array<{
    name: string
}>} = {
    'Custom': [
        { name: ''}
    ],
    'European Union': [
        { name: 'EU Council' },
        { name: 'High Representative of the EU' },
        { name: 'European Commission' },
        { name: 'EEAS' },
        { name: 'EUSPA' },
        { name: 'GSOp' },
        { name: 'GRC' },
        { name: 'RLSP' },
        { name: 'European Rescue Coordination Center' },
    ],
    'United Nations': [
        { name: 'UN Office for Disaster Risk Reduction' },
        { name: 'FAO' },
        { name: 'WMO' },
        { name: 'ICAO' },
        { name: 'IMO' },
        { name: 'WHO' },
    ],
    'Japan': [
        { name: 'JICA' },
        { name: 'JAXA' },
        { name: 'JMA' },
        { name: 'JCG' },
        { name: 'JMOD' },
    ],
    'Philippines': [
        { name: 'NDRRMC' },
        { name: 'RDRRMC' },
        { name: 'MDRRMC' },
    ],
}

export function ProviderSelect({ form }: { form: UseFormReturn<IFormInput> }) {
    const { fields: providers, append, remove } = useFieldArray({
        control: form.control,
        name: "providers",
    })
    const watchCountry = form.watch("providerCountry")
    const watchProviders = form.watch("providers") as Array<{
        name: string
    }>

    useEffect(() => {
        if (watchCountry) {
            const defaultProvidersForCountry = defaultProviders[watchCountry]
            if (defaultProvidersForCountry) {
                form.setValue("providers", defaultProvidersForCountry)
            }
        }
    }, [watchCountry])

    return (
        <div>
            <select {...form.register("providerId")}>
                {watchProviders.map((provider, i) => (
                    <option key={i} value={intToBin(i, 9)}>
                        {provider.name}
                    </option>
                ))}
            </select>
            <select {...form.register("providerCountry")}>
                { Object.keys(defaultProviders).map((country) => (
                    <option key={country} value={country}>
                        {country}
                    </option>
                ))}
            </select>
            {providers.map((provider, i) => (
                <div key={provider.id}>
                    <input
                        {...form.register(`providers.${i}.name`)}
                    />
                    <button type="button" onClick={() => remove(i)}>
                        Remove
                    </button>
                </div>
            ))}
            <button
                type="button"
                onClick={() => {
                    append({ name: "" })
                }}
            >
                Add Provider
            </button>
        </div>
    )
}