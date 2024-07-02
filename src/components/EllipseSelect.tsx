import { MapContainer, TileLayer, useMap } from "react-leaflet" 
import Ellipse from "./Ellipse"
import { UseFormReturn } from "react-hook-form"
import { IFormInput } from "../interface"
import { useEffect, useRef } from "react"

type Map = ReturnType<typeof useMap>

const minRadius = 216.20
const maxRadius = 2500000
const radii = Array.from({ length: 32 }).map((_, i) => {
    const exp = Math.log10(minRadius) + 
        i * (Math.log10(maxRadius) - Math.log10(minRadius)) / 31
    return 10 ** exp
})

export function EllipseSelect({ form }: { form: UseFormReturn<IFormInput> }) {
    const mapRef = useRef<Map>(null)
    const [
        centerLat,
        centerLong,
        semiMajorAxis,
        semiMinorAxis,
        azimuthAngle,
        centerLatIdx, 
        centerLongIdx, 
        semiMajorAxisIdx,
        semiMinorAxisIdx,
        azimuthAngleIdx,
        centerLatInt,
        centerLongInt,
        semiMajorAxisX,
        semiMinorAxisX
    ] = form.watch([
        "centerLat",
        "centerLong",
        "semiMajorAxis",
        "semiMinorAxis",
        "azimuthAngle",
        "centerLatIdx",
        "centerLongIdx",
        "semiMajorAxisIdx",
        "semiMinorAxisIdx",
        "azimuthAngleIdx",
        "centerLatInt",
        "centerLongInt",
        "semiMajorAxisX",
        "semiMinorAxisX",
    ])

    useEffect(() => {
        form.setValue('centerLat', centerLatInt * centerLatIdx - 90)
    }, [centerLatIdx, centerLatInt])

    useEffect(() => {
        form.setValue('centerLong', centerLongInt * centerLongIdx - 180)
    }, [centerLongIdx, centerLongInt])

    useEffect(() => {
        form.setValue('semiMajorAxis', semiMajorAxisIdx === 0 ? 
            radii[0] - semiMajorAxisX * radii[0] :
            radii[semiMajorAxisIdx] - semiMajorAxisX * 
            (radii[semiMajorAxisIdx] - radii[semiMajorAxisIdx - 1])
        )
    }, [semiMajorAxisIdx, semiMajorAxisX])

    useEffect(() => {
        form.setValue('semiMinorAxis', semiMinorAxisIdx === 0 ?
            radii[0] - semiMinorAxisX * radii[0] :
            radii[semiMinorAxisIdx] - semiMinorAxisX * 
            (radii[semiMinorAxisIdx] - radii[semiMinorAxisIdx - 1])
        )
    }, [semiMinorAxisIdx, semiMinorAxisX])

    useEffect(() => {
        form.setValue('azimuthAngle', 2.8125 * azimuthAngleIdx - 90)
    }, [azimuthAngleIdx])

    return (
        <div className="grid gap-1 col-span-2">
            { centerLat !== undefined && !Number.isNaN(centerLat) &&
             centerLong !== undefined && !Number.isNaN(centerLong) &&
            <MapContainer
                center={[centerLat, centerLong]}
                zoom={13}
                scrollWheelZoom={false}
                className="w-full h-96"
                maxBounds={[[90, 180], [-90, -180]]}
                ref={mapRef}
            >
                <TileLayer 
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                { 
                    centerLat !== undefined && !Number.isNaN(centerLat) &&
                    centerLong !== undefined && !Number.isNaN(centerLong) &&
                    semiMajorAxis !== undefined && !Number.isNaN(semiMajorAxis) &&
                    semiMinorAxis !== undefined && !Number.isNaN(semiMinorAxis) &&
                    azimuthAngle !== undefined && !Number.isNaN(azimuthAngle)
                && 
                <Ellipse 
                    center={[centerLat, centerLong]}
                    radii={[semiMajorAxis, semiMinorAxis]}
                    tilt={azimuthAngle}
                    options={{
                        color: '#ff7961',
                        fillColor: '#ff7961',
                        fillOpacity: 0.5,
                        opacity: 1,
                        weight: 2,
                    }}
                />}
            </MapContainer>}
            <div className="grid grid-cols-[max-content_1fr] items-center gap-1">
                <label>Center Latitude: </label>
                <input 
                    type='number'
                    min={-90}
                    max={90}
                    step={centerLatInt}
                    className="w-full"
                    {...form.register("centerLat", {
                        valueAsNumber: true,
                        onBlur: (e) => {
                            // Change current value to the nearest valid value
                            const value = e.target.valueAsNumber
                            const idx = Math.round((value + 90) / centerLatInt)
                            form.setValue('centerLatIdx', idx)
                            form.setValue('centerLat', centerLatInt * idx - 90)
                            mapRef.current?.setView([centerLat, centerLong])
                        }
                    })}
                    onKeyDown={e => {
                        if (e.key === 'Enter') 
                            e.currentTarget.blur()
                    }}
                />
            </div>
            <input 
                type='range'
                min={0}
                max={2 ** 16 - 1}
                className="w-full"
                {...form.register("centerLatIdx", {
                    valueAsNumber: true
                })} 
            />
            <div className="grid grid-cols-[max-content_1fr] items-center gap-1">
                <label>Center Longitude: </label>
                <input 
                    type='number'
                    min={-180}
                    max={180}
                    step={centerLongInt}
                    className="w-full"
                    {...form.register("centerLong", {
                        valueAsNumber: true,
                        onBlur: (e) => {
                            // Change current value to the nearest valid value
                            const value = e.target.valueAsNumber
                            const idx = Math.round((value + 180) / centerLongInt)
                            form.setValue('centerLongIdx', idx)
                            form.setValue('centerLong', centerLongInt * idx - 180)
                            mapRef.current?.setView([centerLat, centerLong], 13)
                        }
                    })}
                    onKeyDown={e => {
                        if (e.key === 'Enter') 
                            e.currentTarget.blur()
                    }}
                />
            </div>
            <input 
                type='range'
                min={0}
                max={2 ** 17 - 1}
                className="w-full"
                {...form.register("centerLongIdx", {
                    valueAsNumber: true,
                })}
            />
            <div className="grid grid-cols-[max-content_1fr] items-center gap-1">
                <label>Semi-Major Axis: </label>
                <input 
                    type='number'
                    min={minRadius}
                    max={maxRadius}
                    step={semiMajorAxisX}
                    className="w-full"
                    {...form.register("semiMajorAxis", {
                        valueAsNumber: true,
                        onBlur: (e) => {
                            // Change current value to the nearest valid value
                            const value = e.target.valueAsNumber
                            const idx = radii.findIndex(r => r > value)
                            const x = (value - radii[idx - 1]) / (radii[idx] - radii[idx - 1])
                            form.setValue('semiMajorAxis', 
                                idx === 0 ? radii[0] - x * radii[0] : 
                                radii[idx] - x * (radii[idx] - radii[idx - 1])
                            )
                            form.setValue('semiMajorAxisIdx', idx)
                        }
                    })}
                    onKeyDown={e => {
                        if (e.key === 'Enter') 
                            e.currentTarget.blur()
                    }}
                />
            </div>
            <input 
                type='range'
                min={0}
                max={2 ** 5 - 1}
                className="w-full"
                {...form.register("semiMajorAxisIdx", {
                    valueAsNumber: true,
                })}
            />
            <div className="grid grid-cols-[max-content_1fr] items-center gap-1">
                <label>Semi-Minor Axis: </label>
                <input 
                    type='number'
                    min={minRadius}
                    max={maxRadius}
                    step={semiMinorAxisX}
                    className="w-full"
                    {...form.register("semiMinorAxis", {
                        valueAsNumber: true,
                        onBlur: (e) => {
                            // Change current value to the nearest valid value
                            const value = e.target.valueAsNumber
                            const idx = radii.findIndex(r => r > value)
                            const x = (value - radii[idx - 1]) / (radii[idx] - radii[idx - 1])
                            form.setValue('semiMinorAxis', 
                                idx === 0 ? radii[0] - x * radii[0] : 
                                radii[idx] - x * (radii[idx] - radii[idx - 1])
                            )
                            form.setValue('semiMinorAxisIdx', idx)
                        }
                    })}
                    onKeyDown={e => {
                        if (e.key === 'Enter') 
                            e.currentTarget.blur()
                    }}
                />
            </div>
            <input 
                type='range'
                min={0}
                max={2 ** 5 - 1}
                className="w-full"
                {...form.register("semiMinorAxisIdx", {
                    valueAsNumber: true
                })}
            />
            <div className="grid grid-cols-[max-content_1fr] items-center gap-1">
                <label>Azimuth Angle: </label>
                <input 
                    type='number'
                    min={-90}
                    max={90}
                    step={2.8125}
                    className="w-full"
                    {...form.register("azimuthAngle", {
                        valueAsNumber: true,
                        onBlur: (e) => {
                            // Change current value to the nearest valid value
                            const value = e.target.valueAsNumber
                            const idx = Math.round((value + 90) / 2.8125)
                            form.setValue('azimuthAngle', 2.8125 * idx - 90)
                            form.setValue('azimuthAngleIdx', idx)
                        }
                    })}
                    onKeyDown={e => {
                        if (e.key === 'Enter') 
                            e.currentTarget.blur()
                    }}
                />
            </div>
            <input 
                type='range'
                min={0}
                max={2 ** 6 - 1}
                className="w-full"
                {...form.register("azimuthAngleIdx", {
                    valueAsNumber: true,
                })}
            />
        </div>
    )
}