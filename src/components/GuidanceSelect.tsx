import { UseFormReturn } from 'react-hook-form'
import { IFormInput } from '../interface'
import { getCountryFromBin } from './CountrySelect'
import { useEffect, useState } from 'react'
import { intToBin } from '../utils'
import { useFieldArray } from 'react-hook-form'
import Modal from 'react-modal'
import { InstructsInput } from './InstructsInput'

export const guidanceLibraries : { [key: string] : Array<{
    bits: number
    description: string
    instructs: Array<{
        code: string,
        detail: string
    }>
}>} = {
    'Japan': [
        {
            bits: 2,
            description: 'Basic instruction',
            instructs: [
                { code: 'IC-1-001', detail: 'empty field'},
                { code: 'IC-1-002', detail: 'Stay'},
                { code: 'IC-1-003', detail: 'Go'},
                { code: 'IC-1-004', detail: 'Leave'},
            ]
        },
        {
            bits: 8,
            description: 'Basic instruction information',
            instructs: [
                { code: 'IC-2-001', detail: 'empty field'},
                { code: 'IC-2-002', detail: 'Under / inside the sturdy' },
                { code: 'IC-2-003', detail: '3rd floor and above' },
                { code: 'IC-2-004', detail: 'Underground' },
                { code: 'IC-2-005', detail: 'Mountains' },
                { code: 'IC-2-006', detail: 'Watering place' },
                { code: 'IC-2-007', detail: 'Buildings handling chemical systems such as factories' },
                { code: 'IC-2-008', detail: 'Cliffs and other collapsible areas' },
            ]
        }
    ],
    'International': [
        {
            bits: 5,
            description: 'General required action',
            instructs: [
                {
                    code: 'IC-A-001',
                    detail: 'empty field'
                },
                {
                    code: 'IC-A-002',
                    detail: `You are in the danger zone, leave the area immediately. 
                    Listen to radio or media for directions and information.`
                },
                {
                    code: 'IC-A-003',
                    detail: `You are in the danger zone, leave the area immediately 
                    and reach the evacuation point indicated by the area plotted in yellow. 
                    Listen to radio or media for directions and information.`
                },
                {
                    code: 'IC-A-004',
                    detail: `Seek shelter in a building immediately. 
                    Stay under cover and stay informed.`
                },
                {
                    code: 'IC-A-005',
                    detail: 'Seek out a cellar or interior rooms on lower floors.'
                },
                {
                    code: 'IC-A-006',
                    detail: `If you are in a alpine terrain, 
                    start descending immediately and seek for shelter.`
                },
                
                {
                    code: 'IC-A-007',
                    detail: `Quickly move into interior rooms. If you are in a vehicle: 
                    Stop driving immediately on the edge of the road. If a building is nearby, 
                    seek shelter in that building.`
                },
                {
                    code: 'IC-A-008',
                    detail: `If you are in open terrain and you cannot find shelter, 
                    lie face-down on the ground and protect your head and neck with your hands, 
                    in a hollow where possible`
                },
                {
                    code: 'IC-A-009',
                    detail: `Prepare for evacuation. Take only the essentials with you, 
                    especially ID cards, passport, credit cards and cash. Evacuate only after 
                    the instruction of the emergency authorities.`
                },
                {
                    code: 'IC-A-010',
                    detail: `Prepare emergency food and relief material: 
                    Check and restock your equipment and supplies of water, food, medicine,
                        cash and batteries.`
                },
                {
                    code: 'IC-A-011',
                    detail: `Stay away from glass surfaces such as windows and glass doors. 
                    There is a risk of injury from glass splinters.`
                },
                {
                    code: 'IC-A-012',
                    detail: `Reduce your power consumption to a minimum.`
                },
                {
                    code: 'IC-A-013',
                    detail: `Reduce your water consumption to a minimum.`
                },
                {
                    code: 'IC-A-014',
                    detail: `Boil water before drinking it or using it in the kitchen.`
                },
                {
                    code: 'IC-A-015',
                    detail: `Keep at least one metre away from any conversation partners. 
                    Avoid physical contact with other people such as kissing and shaking hands. 
                    Wash your hands regularly and thoroughly.`
                },
                {
                    code: 'IC-A-016',
                    detail: `Do not drink any tap water. Avoid any skin contact with tap water. 
                    Only drink mineral water from a bottle. Turn off the water supply to your house.`
                },
                {
                    code: 'IC-A-017',
                    detail: `Watch out for escaping gas. This can be indicated by hissing noises 
                    or a typical gas odour. Do not use matches, lighters or the like: 
                    naked flames in combination with leaking gas can lead to explosions and fires.`
                },
                {
                    code: 'IC-A-018',
                    detail: `Do not go outside and do not use your car.`
                },
                {
                    code: 'IC-A-019',
                    detail: `Do not touch any objects that seem suspicious to you. 
                    Debris can cause additional hazards such as fires and explosions. 
                    Inform the emergency services about damage and debris.`
                },
                {
                    code: 'IC-A-020',
                    detail: `Do not enter smoke-filled rooms. Deadly gases can form there.`
                },
                {
                    code: 'IC-A-021',
                    detail: `Do not enter cellars or underground car parks.`
                },
                {
                    code: 'IC-A-022',
                    detail: `Do not leave pets or livestock outside.`
                },
                {
                    code: 'IC-A-023',
                    detail: `Do not touch any dead animals. 
                    Report any findings of dead wild animals to the authorities.`
                },
                {
                    code: 'IC-A-024',
                    detail: `Avoid driving`
                },
                {
                    code: 'IC-A-025',
                    detail: `Avoid all items with metal parts such as umbrellas and bicycles. 
                    Do not bathe or shower during a thunderstorm. 
                    Bathing and showering can be life-threatening.`
                },
                {
                    code: 'IC-A-026',
                    detail: `Avoid rooms directly underneath the roof truss. 
                    Avoid very large rooms, such as halls, in which the ceiling is not supported 
                    by pillars.`
                },
                {
                    code: 'IC-A-027',
                    detail: `Avoid going outdoors. Keep away from trees, towers and masts. 
                    Keep at least 20 m away from power lines. Watch out for flying objects.`
                },
                {
                    code: 'IC-A-028',
                    detail: `Avoid the danger area`
                },
                {
                    code: 'IC-A-029',
                    detail: `Avoid going out when it is not necessary`
                },
                {
                    code: 'IC-A-030',
                    detail: `This is a only test. You do not have to take any action or 
                    to adopt any particular sheltering behavior`
                },
                {
                    code: 'IC-A-031',
                    detail: `This replaces the warning previously in effect for this area.`
                },
                {
                    code: 'IC-A-032',
                    detail: `Conditions have improved and are no longer expected to meet 
                    alert criteria.`
                }
            ]
        }, {
            bits: 5,
            description: 'Monitoring + Required action, hazard specifics',
            instructs: [
                {
                    code: 'IC-B-001',
                    detail: 'empty field'
                },
                {
                    code: 'IC-B-002',
                    detail: `Check with the weather services and local authorities for 
                    additional information`
                },
                {
                    code: 'IC-B-003',
                    detail: `Find out the location of the information points set up 
                    by the authorities on official channels (radio, internet, 
                    TV, social networks…)`
                },
                {
                    code: 'IC-B-004',
                    detail: `Sensitive or vulnerable people should not go out unless they must.`
                },
                {
                    code: 'IC-B-005',
                    detail: `Rescue operation under process by security forces and emergency services. 
                    Avoid moving to facilitate security and emergency actions.`
                },
                {
                    code: 'IC-B-006',
                    detail: `Protect the most vulnerable and hear from your loved ones. 
                    Be aware of their special needs and support, as required. 
                    If you notice distressed or vulnerable persons, call the emergency services. 
                    Provide first aid if necessary but do not put yourself in any danger.`
                },
                {
                    code: 'IC-B-007',
                    detail: `Pay attention to announcements made by the police, fire brigade 
                    and by officials.`
                },
                {
                    code: 'IC-B-008',
                    detail: `To stay aware, keep listening to official instructions broadcast 
                    on the radio, television, websites and social networks pages`
                },
                {
                    code: 'IC-B-009',
                    detail: `If you need help leaving your home, call the emergency services.`
                },
                {
                    code: 'IC-B-010',
                    detail: `Only make phone calls in serious emergencies to avoid overloading 
                    the mobile network.`
                },
                {
                    code: 'IC-B-011',
                    detail: `Extreme intensity weather phenomena expected. 
                    The weather is very dangerous and implies high level of threat to health, 
                    even the life hazard. BE AWARE and keep up to date with the latest weather forecast.`
                },
                {
                    code: 'IC-B-012',
                    detail: `Severe weather expected. BE PREPARED. 
                    Take precautions and keep up to date with the latest weather forecast. 
                    Severe damages to people and
                    properties may occur, especially to those vulnerable or in exposed areas.`
                },
                {
                    code: 'IC-B-013',
                    detail: `Moderate intensity weather phenomena expected. 
                    BE AWARE, keep up to date with the latest weather forecast. 
                    Moderate damages to people and properties may occur, 
                    especially to those vulnerable or in exposed areas`
                },
                {
                    code: 'IC-B-014',
                    detail: `BE PREPARED to protect yourself and your property. 
                    Flooding of properties and transport networks is expected. 
                    Disruption to power, communications and water supplies are possible. 
                    Evacuation may be required. Dangerous driving conditions due to reduced 
                    visibility and aquaplaning`
                },
                {
                    code: 'IC-B-015',
                    detail: `Do not go near or in flooded waters. 
                    Do not walk or drive on a submerged road. 
                    Flood waves may surprise you, the river bank may collapse or you could 
                    be sucked in a manhole or hit by a floating debris. 
                    Keep drains and shafts clear so that the water can drain away. 
                    Secure and/or move assets away from vulnerable area (car along the river,
                     basements).`
                },
                {
                    code: 'IC-B-016',
                    detail: `Take shelter in the most resistant part of a permanent building, 
                    a municipal shelter if possible, and keep away from windows. 
                    BE AWARE of the “eye of the storm”, the calm area in its centre. 
                    It will be followed by an inversion and the strengthening of winds. 
                    Do not go outside and do not use your car. 
                    Wait until the alert is over.`
                },
                {
                    code: 'IC-B-017',
                    detail: `TAKE PRECAUTIONS, High temperatures are expected. 
                    Protect yourself from the heat and avoid physical and sports activities. 
                    Wet your body several times a day. Drink plenty of water and eat light food.`
                },
                {
                    code: 'IC-B-018',
                    detail: `Forest fire danger. Under these conditions fires may 
                    develop and spread rapidly resulting in damage to property and 
                    possible loss of human and/or animal life. 
                    Do not throw away any burning cigarettes or matches to the environment. 
                    Do not make a fire outdoors. Do not light any fireworks. 
                    Do not barbeque in open places.
                    Vegetation is easily ignited and large areas may be affected.
                    Follow the instructions from the local authorities.`
                },
                {
                    code: 'IC-B-019',
                    detail: `Risks of fire. Use permanent fireplaces when barbecuing. 
                    Make sure your fire is completely extinguished before you leave. 
                    Only light fireworks with the permission of the municipality, 
                    keep a safe distance from the forest and have water to hand.`
                },
                {
                    code: 'IC-B-020',
                    detail: `"Keep as far away as possible from coastal areas, beaches and rivers. 
                    Get immediately to the highest ground possible and wait until the alert is over. 
                    If you are in danger of being overtaken by waves, climb onto a roof or up a solid tree, 
                    or cling on to a floating object carried along by the water.
                    "`
                },
                {
                    code: 'IC-B-021',
                    detail: `Do not go to sea and keep as far away as possible from the 
                    coast and wait until the alert is over. If you are at sea, don't return
                    to port. Keep away from the coast. 
                    Waves are much less dangerous out at sea.`
                },
                {
                    code: 'IC-B-022',
                    detail: `Leave the affected area immediately and seek higher ground or 
                    move to higher parts of the building. 
                    Listen to radio or media for directions and information`
                },
                {
                    code: 'IC-B-023',
                    detail: `Indoors : during the quake, take shelter near a wall or 
                    a solid piece of furniture. 
                    Outside: during the quake, keep away from anything that might collapse. 
                    In a car : during the quake, stop as far away from buildings as you can. 
                    After, Be prepared for aftershocks. If you are indoor, leave by the stairs.`
                },
                {
                    code: 'IC-B-024',
                    detail: `Leave the impact site immediately and cover your mouth and 
                    nose with improvised respiratory protection (cloth, garment, surgical mask). 
                    This protects you from dust, but not from gaseous hazardous substances. 
                    Seek out a building. Move wherever possible at a right angle to the wind 
                    direction as this is the quickest way to leave the danger zone with a 
                    possible cloud of hazardous substances.`
                },
                {
                    code: 'IC-B-025',
                    detail: `Switch off the ventilation and air conditioning systems.
                    Close all windows, doors and shutters.
                    Cover your mouth and nose and breathe through a face-mask or an 
                    improvised respiratory protection (cloth, garment, surgical mask) 
                    if the air is filled with smoke and ashes`
                },
                {
                    code: 'IC-B-026',
                    detail: `Have iodine tablets ready. DO NOT take the iodine tablets now.
                    If this becomes necessary, we will inform you in good time.`
                },
                {
                    code: 'IC-B-027',
                    detail: `Take the iodine tablets NOW according to the package insert.`
                },
                {
                    code: 'IC-B-028',
                    detail: `Avoid watering your plants during the hottest hours, 
                    avoid using water for secondary uses such as washing your car.`
                },
                {
                    code: 'IC-B-029',
                    detail: `Seek shelter if you cannot leave the area immediately.`
                },
                {
                    code: 'IC-B-030',
                    detail: `not allocated`
                },
                {
                    code: 'IC-B-031',
                    detail: `not allocated`
                },
                {
                    code: 'IC-B-032',
                    detail: `This replaces the warning previously in effect for this area.`
                }
            ]
        }
    ]
}
        
export const GuidanceSelect = ({ form }: { form: UseFormReturn<IFormInput> }) => {
    const [watchLibSelection, watchCountry] = form.watch(['libSelection','country'])
    const watchLibrary = form.watch('customLibrary')
    const [libModalIsOpen, setLibModalIsOpen] = useState(false)
    const [isLibEdit, setIsLibEdit] = useState(false)

    const { fields: lists, append: appendList, remove: removeList } = useFieldArray({
        control: form.control,
        name: 'customLibrary'
    })

    useEffect(() => {
        if (watchLibSelection === '0') {
            form.setValue('customLibrary', guidanceLibraries['International'])
        } else {
            const country = getCountryFromBin(watchCountry)
            if (Object.keys(guidanceLibraries).includes(country)) {
                form.setValue('customLibrary', guidanceLibraries[country])
            } else {
                form.setValue(
                    'customLibrary', [])
            }
        }
    }, [watchLibSelection, watchCountry])

    const bitSum = (lists: Array<{
        bits: number
    }>) => lists.reduce((sum, list) => sum + list.bits, 0)

    return (
        <div className='flex'>
            <select {...form.register('libSelection')}>
                <option value='0'>International Guidance Library</option>
                <option value='1'>Country/Region Guidance Library</option>
            </select>
            <select {...form.register('libVersion')}>
                {[...Array(8).keys()].map((version) => (
                    <option key={version} value={version}>
                        #{version + 1}
                    </option>
                ))}
            </select>
            {
                watchLibrary.map((list, i) => (
                    <select key={i} {...form.register(`libActions.${i}`)}>
                        {list.instructs.map((instruct, j) => (
                            <option key={instruct.code} value={intToBin(
                                j, list.bits
                            )}>
                                {instruct.code}
                            </option>
                        ))}
                    </select>
                ))
            }
            <button onClick={() => setLibModalIsOpen(true)}>?</button>
            <Modal
                isOpen={libModalIsOpen}
                onRequestClose={() => setLibModalIsOpen(false)}
            >
                <div className='flex justify-between'>
                    <div>
                        <h2 className='text-xl font-bold'>Guidance Library</h2>
                        <button className='text-xl' onClick={() => setIsLibEdit(!isLibEdit)}>
                            { !isLibEdit ? 'Edit' : 'Save' }
                        </button>
                    </div>
                    <button onClick={() => setLibModalIsOpen(false)}>Close</button>
                </div>
                <div className='flex gap-5'>
                { !isLibEdit ?
                    watchLibrary.map((list, i) => (
                        <div key={i}>
                            <h3 className='text-lg font-bold'>{list.description}</h3>
                            <ul>
                                {list.instructs.map((instruct) => (
                                    <li key={instruct.code}>
                                        <strong>{instruct.code}</strong>: {instruct.detail}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )) :
                    <div>
                        <div className='flex'></div>
                        <div className='flex-col gap-5'>
                        {
                            lists.map((list, i) => (
                                <div key={list.id}>
                                    <div className='flex'>
                                        <input
                                            {...form.register(`customLibrary.${i}.description`)}
                                            placeholder='Description'
                                        />
                                        <input
                                            {...form.register(`customLibrary.${i}.bits`, {
                                                valueAsNumber: true,
                                                validate: (_, formValues) => {
                                                    return bitSum(formValues.customLibrary) <= 10 || 
                                                    'Total bits must be less than or equal to 10'
                                                }
                                            })}
                                            placeholder='Bits'
                                            type='number'
                                            min={1}
                                            max={10}
                                        />
                                        <button type='button' onClick={() => removeList(i)}>
                                            Remove
                                        </button>
                                    </div>
                                    <InstructsInput form={form} i={i} />
                                </div>
                            ))
                        }
                        { bitSum(watchLibrary) + 1 <= 10 && 
                        <button type='button' onClick={() => appendList({ 
                            bits: 1, 
                            description: '', 
                            instructs: []
                         })}>
                            Add Instruction List
                        </button> }
                        </div>
                    </div>
                }
                </div>
            </Modal>
        </div>
    )
}