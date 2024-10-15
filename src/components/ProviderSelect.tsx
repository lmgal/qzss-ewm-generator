import { useEffect, useState } from "react"
import { useFormContext, useFieldArray } from "react-hook-form"
import { IFormInput } from "../interface"
import Modal from "react-responsive-modal"

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

export function ProviderSelect() {
    const form = useFormContext<IFormInput>()
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
        <div className="grid gap-2 lg:flex lg:gap-1">
            <select {...form.register("providerId", {
                valueAsNumber: true
            })} className="w-full">
                {watchProviders.map((provider, i) => (
                    <option key={i} value={i}>
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
                onClick={() => {
                    setIsModalOpen(true)
                    form.setValue('modalOpen', true)
                }}
            >
                Edit
            </button>
            <Modal 
                open={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false)
                    form.setValue('modalOpen', false)
                }}
            //    styles={{
            //        content: {
            //            width: '50%',
            //            margin: 'auto',
            //        }
            //    }}
            >
                <div className="grid gap-3">
                    <h2 className='text-xl font-bold'>Providers</h2>
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
