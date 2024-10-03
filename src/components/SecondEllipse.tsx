import { useFormContext } from "react-hook-form"
import { IFormInput } from "../interface"
import ReactModal from "react-modal"
import { useState } from "react"

const guidanceChoices = [
    {
        code: 'IC-2ND-01',
        guidance: 'empty field',
    },
    {
        code: 'IC-2ND-02',
        guidance: 'Prepare for evacuation. Take only the essentials with you, especially ID cards, passport, credit cards and cash. Evacuate only after the instruction of the emergency authorities.',
    },
    {
        code: 'IC-2ND-03',
        guidance: 'Prepare emergency food and relief material : Check and restock your equipment and supplies of water, food, medicine, cash and batteries.',
    },
    {
        code: 'IC-2ND-04',
        guidance: 'Be prepare to protect yourself and your property. Flooding of properties and transport networks is expected. Disruption to power, communications and water supplies are possible. Evacuation may be required. Dangerous driving conditions due to reduced visibility and aquaplaning.',
    },
    {
        code: 'IC-2ND-05',
        guidance: 'Have iodine tablets ready. DO NOT take the iodine tablets now. If this becomes necessary, we will inform you in good time.',
    },
    {
        code: 'IC-2ND-06',
        guidance: 'Keep your smartphone charged to be able to receive further instructions and information.',
    },
    {
        code: 'IC-2ND-07',
        guidance: 'Avoid using lifts.',
    },
    {
        code: 'IC-2ND-08',
        guidance: 'Avoid the danger area.',
    },
    {
        code: 'IC-2ND-09',
        guidance: 'Avoid driving.',
    },
    {
        code: 'IC-2ND-10',
        guidance: 'Rescue operation under process by security forces and emergency services. Avoid moving to facilitate security and emergency actions.',
    },
    {
        code: 'IC-2ND-11',
        guidance: 'Check with the weather services and local authorities for additional information.',
    },
    {
        code: 'IC-2ND-12',
        guidance: 'Find out the location of the information points set up by the authorities on official channels (radio, internet, TV, social networks…).',
    },
    {
        code: 'IC-2ND-13',
        guidance: 'Sensitive or vulnerable people should not go out unless they must.',
    },
    {
        code: 'IC-2ND-14',
        guidance: 'Protect the most vulnerable and hear from your loved ones. Be aware of their special needs and support, as required. If you notice distressed or vulnerable persons, contact the emergency services. Provide first aid if necessary but do not put yourself in any danger.',
    },
    {
        code: 'IC-2ND-15',
        guidance: 'Pay attention to announcements made by the police, fire brigade and by officials.',
    },
    {
        code: 'IC-2ND-16',
        guidance: 'To stay aware, keep listening to official instructions broadcast on the radio, television, websites and social networks pages.',
    },
    {
        code: 'IC-2ND-17',
        guidance: 'Only make phone calls in serious emergencies to avoid overloading the mobile network.',
    },
    {
        code: 'IC-2ND-18',
        guidance: 'not allocated',
    },
    {
        code: 'IC-2ND-19',
        guidance: 'not allocated',
    },
    {
        code: 'IC-2ND-20',
        guidance: 'not allocated',
    },
    {
        code: 'IC-2ND-21',
        guidance: 'not allocated',
    },
    {
        code: 'IC-2ND-22',
        guidance: 'not allocated',
    },
    {
        code: 'IC-2ND-23',
        guidance: 'not allocated',
    },
    {
        code: 'IC-2ND-24',
        guidance: 'not allocated',
    },
    {
        code: 'IC-2ND-25',
        guidance: 'not allocated',
    },
    {
        code: 'IC-2ND-26',
        guidance: 'not allocated',
    },
    {
        code: 'IC-2ND-27',
        guidance: 'not allocated',
    },
    {
        code: 'IC-2ND-28',
        guidance: 'not allocated',
    },
    {
        code: 'IC-2ND-29',
        guidance: 'not allocated',
    },
    {
        code: 'IC-2ND-30',
        guidance: 'not allocated',
    },
    {
        code: 'IC-2ND-31',
        guidance: 'not allocated',
    },
    {
        code: 'IC-2ND-32',
        guidance: 'This is a only test. You do not have to take any action or to adopt any particular sheltering behavior',
    },
    {
        code: 'IC-2ND-33',
        guidance: 'Conditions have improved and are no longer expected to meet alert criteria.',
    },
]

export function SecondEllipse() {
    const form = useFormContext<IFormInput>()
    const [
        ellipseCenterShift,
        homotheticFactor,
        rotationAngle,
    ] = form.watch([
        'ellipseCenterShift',
        'homotheticFactor',
        'rotationAngle',
    ])
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className="col-span-2 grid grid-cols-1 gap-1">
            <h2 className="text-xl font-bold ">
                Second Ellipse Guidance
            </h2>
            <h2 className="text-lg">
                Shift of Second Ellipse (factor with respect to semi-major axis of main ellipse):
                {ellipseCenterShift}
            </h2>
            <input type="range" 
                {...form.register('ellipseCenterShift', {
                    valueAsNumber: true
                })}
                min={0}
                max={3}
                step={1}
            />
            <h2 className="text-lg">
                Homothetic Factor:
                {0.25 * homotheticFactor + 0.25}
            </h2>
            <input type="range" 
                {...form.register('homotheticFactor', {
                    valueAsNumber: true
                })}
                min={0}
                max={2**3 - 1}
                step={1}
            />
            <h2 className="text-lg">
                Rotation Angle:
                {rotationAngle * 11.25}
            </h2>
            <input type="range" 
                {...form.register('rotationAngle', {
                    valueAsNumber: true
                })}
                min={0}
                max={2**5 - 1}
                step={1}
            />
            <div className="flex gap-1 items-center">
                <h2 className="text-lg">
                    Guidance for Second Ellipse
                </h2>
                <select {...form.register('secondEllipseGuidanceIdx', { valueAsNumber: true })}>
                    {guidanceChoices.map(({ code }, idx) => (
                        <option key={idx} value={idx}>{code}</option>
                    ))}
                </select>
                <button 
                    onClick={() => {
                        setIsModalOpen(true)
                        form.setValue('modalOpen', true)
                    }}
                    className="py-2 px-4 rounded border border-gray-500"
                >
                    Show details
                </button>
            </div>
            <ReactModal
                isOpen={isModalOpen}
                onRequestClose={() => {
                    setIsModalOpen(false)
                    form.setValue('modalOpen', false)
                }}
            >
                <div className="flex justify-between">
                    <h2 className="text-xl font-bold">
                        Guidance valid for Second Ellipse
                    </h2>
                    <button
                        onClick={() => {
                            setIsModalOpen(false)
                            form.setValue('modalOpen', false)
                        }}
                        className="py-2 px-4 rounded border border-gray-500"
                    >
                        Close
                    </button>
                </div>
                <ul>
                    { guidanceChoices.map(({ code, guidance }, idx) => (
                        <li key={idx}>
                            <strong>{code}: </strong>{guidance}
                        </li>
                    ))}
                </ul>
            </ReactModal>
        </div>
    )
}
