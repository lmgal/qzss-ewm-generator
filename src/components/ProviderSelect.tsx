import { useEffect, useState } from "react"
import { UseFormReturn, useFieldArray } from "react-hook-form"
import { intToBin } from "../utils"
import { IFormInput } from "../interface"
import Modal from 'react-modal'

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
    const [isModalOpen, setIsModalOpen] = useState(false)

    useEffect(() => {
        if (watchCountry) {
            const defaultProvidersForCountry = defaultProviders[watchCountry]
            if (defaultProvidersForCountry) {
                form.setValue("providers", defaultProvidersForCountry)
            }
        }
    }, [watchCountry])

    return (
        <div className="flex gap-1">
            <select {...form.register("providerId")} className="w-full">
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
            <button 
                className="py-2 px-4 rounded border border-gray-500" 
                onClick={() => setIsModalOpen(true)}
            >
                Edit
            </button>
            <Modal 
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                style={{
                    content: {
                        width: '50%',
                        margin: 'auto',
                    }
                }}
            >
                <div className="grid gap-3">
                    <div className='flex justify-between'>
                        <h2 className='text-xl font-bold'>Providers</h2>
                        <button onClick={() => setIsModalOpen(false)}>
                            Close
                        </button>
                    </div>
                    {providers.map((provider, i) => (
                        <div key={provider.id} className="w-full flex gap-1">
                            <input
                                className="w-full"
                                {...form.register(`providers.${i}.name`)}
                            />
                            <button 
                                type="button" 
                                onClick={() => remove(i)}
                                className="py-2 px-4 rounded border border-gray-500"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        className="py-2 px-4 rounded border border-gray-500"
                        onClick={() => {
                            append({ name: "" })
                        }}
                    >
                        Add Provider
                    </button>
                </div>
            </Modal>
        </div>
    )
}