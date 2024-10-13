import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet" 
import Ellipse from "./Ellipse"
import { useFormContext } from "react-hook-form"
import { IFormInput } from "../interface"
import { useEffect, useRef } from "react"
import { getCountryFromBin } from "./CountrySelect"
import { GeoSearch } from "./GeoSearch"
import { minRadius, maxRadius, radii, centerLatInt, centerLongInt, lengthFactors } from "../constants"

type Map = ReturnType<typeof useMap>

const hazardCenterStep = 20 / (2 ** 7)

const countryCapitalCoords: { [key: string]: [number, number] } = {
    "Afghanistan": [34.53, 69.17],
    "Albania": [41.33, 19.82],
    "Antarctica": [-82.86, 135.00],
    "Algeria": [28.03, 1.66],
    "American Samoa": [-14.27, -170.13],
    "Andorra": [42.55, 1.60],
    "Angola": [-11.20, 17.87],
    "Antigua and Barbuda": [17.06, -61.80],
    "Azerbaijan": [40.14, 47.58],
    "Argentina": [-38.42, -63.62],
    "Australia": [-35.31, 149.12],
    "Austria": [48.21, 16.37],
    "Bahamas (the)": [25.03, -77.40],
    "Bahrain": [26.23, 50.58],
    "Bangladesh": [23.81, 90.41],
    "Armenia": [40.18, 44.51],
    "Barbados": [13.10, -59.62],
    "Belgium": [50.85, 4.35],
    "Bermuda": [32.29, -64.78],
    "Bhutan": [27.47, 89.64],
    "Bolivia (Plurinational State of)": [-16.50, -68.15],
    "Bosnia and Herzegovina": [43.85, 18.38],
    "Botswana": [-24.65, 25.91],
    "Bouvet Island": [-54.42, 3.36],
    "Brazil": [-15.78, -47.93],
    "Belize": [17.49, -88.19],
    "British Indian Ocean Territory (the)": [-7.34, 72.41],
    "Solomon Islands": [-9.43, 159.95],
    "Virgin Islands (British)": [18.42, -64.64],
    "Brunei Darussalam": [4.89, 114.94],
    "Bulgaria": [42.70, 23.32],
    "Myanmar": [16.80, 96.15],
    "Burundi": [-3.38, 29.36],
    "Belarus": [53.90, 27.56],
    "Cambodia": [11.55, 104.92],
    "Cameroon": [3.87, 11.52],
    "Canada": [45.42, -75.69],
    "Cabo Verde": [14.92, -23.51],
    "Cayman Islands (the)": [19.30, -81.38],
    "Central African Republic (the)": [4.36, 18.56],
    "Sri Lanka": [6.93, 79.85],
    "Chad": [12.11, 15.03],
    "Chile": [-33.46, -70.65],
    "China": [39.91, 116.39],
    "Taiwan (Province of China)": [25.03, 121.63],
    "Christmas Island": [-10.42, 105.71],
    "Cocos (Keeling) Islands (the)": [-12.12, 96.83],
    "Colombia": [4.61, -74.08],
    "Comoros (the)": [-11.70, 43.24],
    "Mayotte": [-12.79, 45.23],
    "Congo (the)": [-4.32, 15.32],
    "Congo (the Democratic Republic of the)": [-4.32, 15.32],
    "Cook Islands (the)": [-21.20, -159.78],
    "Costa Rica": [9.93, -84.08],
    "Croatia": [45.81, 15.98],
    "Cuba": [23.13, -82.38],
    "Cyprus": [35.17, 33.37],
    "Czechia": [50.08, 14.43],
    "Benin": [6.49, 2.62],
    "Denmark": [55.68, 12.57],
    "Dominica": [15.30, -61.39],
    "Dominican Republic (the)": [18.49, -69.89],
    "Ecuador": [-0.23, -78.52],
    "El Salvador": [13.69, -89.19],
    "Equatorial Guinea": [3.75, 8.78],
    "Ethiopia": [9.02, 38.74],
    "Eritrea": [15.33, 38.93],
    "Estonia": [59.43, 24.73],
    "Faroe Islands (the)": [62.01, -6.77],
    "Falkland Islands (the) [Malvinas]": [-51.69, -57.85],
    "South Georgia and the South Sandwich Islands": [-54.27, -36.51],
    "Fiji": [-18.14, 178.43],
    "Finland": [60.17, 24.94],
    "Åland Islands": [60.12, 19.92],
    "France": [48.86, 2.35],
    "French Guiana": [4.94, -52.33],
    "French Polynesia": [-17.53, -149.57],
    "French Southern Territories (the)": [-49.28, 69.35],
    "Djibouti": [11.59, 43.15],
    "Gabon": [0.39, 9.45],
    "Georgia": [41.69, 44.80],
    "Gambia (the)": [13.45, -16.57],
    "Palestine, State of": [31.77, 35.23],
    "Germany": [52.52, 13.41],
    "Ghana": [5.56, -0.20],
    "Gibraltar": [36.14, -5.35],
    "Kiribati": [1.33, 172.98],
    "Greece": [37.98, 23.73],
    "Greenland": [64.18, -51.72],
    "Grenada": [12.05, -61.75],
    "Guadeloupe": [16.00, -61.71],
    "Guam": [13.47, 144.75],
    "Guatemala": [14.63, -90.51],
    "Guinea": [9.64, -13.58],
    "Guyana": [6.80, -58.16],
    "Haiti": [18.54, -72.34],
    "Heard Island and McDonald Islands": [-53.06, 72.51],
    "Holy See (the)": [41.90, 12.45],
    "Honduras": [14.08, -87.21],
    "Hong Kong": [22.28, 114.16],
    "Hungary": [47.50, 19.04],
    "Iceland": [64.14, -21.94],
    "India": [28.61, 77.23],
    "Indonesia": [-6.18, 106.83],
    "Iran (Islamic Republic of)": [35.69, 51.42],
    "Iraq": [33.32, 44.42],
    "Ireland": [53.35, -6.26],
    "Israel": [31.78, 35.22],
    "Italy": [41.90, 12.49],
    "Côte d'Ivoire": [5.33, -4.03],
    "Jamaica": [18.01, -76.79],
    "Japan": [35.68, 139.76],
    "Kazakhstan": [51.17, 71.43],
    "Jordan": [31.95, 35.93],
    "Kenya": [-1.29, 36.82],
    "Korea (the Democratic People's Republic of)": [39.03, 125.75],
    "Korea (the Republic of)": [37.56, 126.97],
    "Kuwait": [29.37, 47.98],
    "Kyrgyzstan": [42.87, 74.59],
    "Lao People's Democratic Republic (the)": [17.97, 102.60],
    "Lebanon": [33.89, 35.50],
    "Lesotho": [-29.32, 27.48],
    "Latvia": [56.95, 24.10],
    "Liberia": [6.31, -10.80],
    "Libya": [32.88, 13.19],
    "Liechtenstein": [47.14, 9.55],
    "Lithuania": [54.69, 25.27],
    "Luxembourg": [49.61, 6.13],
    "Macao": [22.20, 113.55],
    "Madagascar": [-18.88, 47.52],
    "Malawi": [-13.97, 33.79],
    "Malaysia": [3.14, 101.69],
    "Maldives": [4.17, 73.51],
    "Mali": [12.65, -8.00],
    "Malta": [35.90, 14.51],
    "Martinique": [14.61, -61.03],
    "Mauritania": [18.08, -15.98],
    "Mauritius": [-20.16, 57.50],
    "Mexico": [19.43, -99.13],
    "Monaco": [43.73, 7.42],
    "Mongolia": [47.92, 106.92],
    "Moldova (the Republic of)": [47.03, 28.83],
    "Montenegro": [42.44, 19.26],
    "Montserrat": [16.74, -62.19],
    "Morocco": [33.99, -6.84],
    "Mozambique": [-25.97, 32.58],
    "Oman": [23.61, 58.59],
    "Namibia": [-22.57, 17.08],
    "Nauru": [-0.52, 166.93],
    "Nepal": [27.71, 85.32],
    "Netherlands (the)": [52.37, 4.90],
    "Curaçao": [12.17, -68.99],
    "Aruba": [12.52, -69.97],
    "Sint Maarten (Dutch part)": [18.04, -63.06],
    "Bonaire, Sint Eustatius and Saba": [12.17, -68.26],
    "New Caledonia": [-22.27, 166.46],
    "Vanuatu": [-17.74, 168.32],
    "New Zealand": [-41.29, 174.78],
    "Nicaragua": [12.14, -86.27],
    "Niger (the)": [13.51, 2.11],
    "Nigeria": [9.07, 7.49],
    "Niue": [-19.05, -169.92],
    "Norfolk Island": [-29.04, 167.95],
    "Norway": [59.91, 10.74],
    "Northern Mariana Islands (the)": [15.21, 145.75],
    "United States Minor Outlying Islands (the)": [19.28, 166.60],
    "Micronesia (Federated States of)": [6.92, 158.25],
    "Marshall Islands (the)": [7.09, 171.38],
    "Palau": [7.51, 134.57],
    "Pakistan": [33.68, 73.04],
    "Panama": [8.98, -79.52],
    "Papua New Guinea": [-9.47, 147.19],
    "Paraguay": [-25.26, -57.66],
    "Peru": [-12.05, -77.04],
    "Philippines (the)": [14.60, 120.98],
    "Pitcairn": [-24.37, -128.32],
    "Poland": [52.23, 21.01],
    "Portugal": [38.71, -9.14],
    "Guinea-Bissau": [11.86, -15.60],
    "Timor-Leste": [-8.56, 125.56],
    "Puerto Rico": [18.22, -66.59],
    "Qatar": [25.29, 51.53],
    "Réunion": [-20.88, 55.45],
    "Romania": [44.43, 26.10],
    "Russian Federation (the)": [55.75, 37.62],
    "Rwanda": [-1.94, 30.06],
    "Saint Barthélemy": [17.90, -62.83],
    "Saint Helena, Ascension and Tristan da Cunha": [-15.95, -5.71],
    "Saint Kitts and Nevis": [17.30, -62.73],
    "Anguilla": [18.22, -63.07],
    "Saint Lucia": [13.91, -60.97],
    "Saint Martin (French part)": [18.07, -63.05],
    "Saint Pierre and Miquelon": [46.78, -56.18],
    "Saint Vincent and the Grenadines": [13.16, -61.23],
    "San Marino": [43.94, 12.46],
    "Sao Tome and Principe": [0.33, 6.73],
    "Saudi Arabia": [24.71, 46.68],
    "Senegal": [14.69, -17.45],
    "Serbia": [44.82, 20.46],
    "Seychelles": [-4.68, 55.49],
    "Sierra Leone": [8.49, -13.23],
    "Singapore": [1.29, 103.85],
    "Slovakia": [48.15, 17.11],
    "Viet Nam": [21.03, 105.85],
    "Slovenia": [46.05, 14.51],
    "Somalia": [2.04, 45.34],
    "South Africa": [-25.75, 28.19],
    "Zimbabwe": [-17.83, 31.05],
    "Spain": [40.41, -3.70],
    "South Sudan": [4.85, 31.58],
    "Sudan (the)": [15.59, 32.53],
    "Western Sahara*": [27.15, -13.20],
    "Suriname": [5.87, -55.17],
    "Svalbard and Jan Mayen": [78.22, 15.63],
    "Eswatini": [-26.32, 31.14],
    "Sweden": [59.33, 18.06],
    "Switzerland": [46.95, 7.44],
    "Syrian Arab Republic (the)": [33.51, 36.29],
    "Tajikistan": [38.56, 68.78],
    "Thailand": [13.75, 100.52],
    "Togo": [6.13, 1.22],
    "Tokelau": [-9.20, -171.85],
    "Tonga": [-21.14, -175.20],
    "Trinidad and Tobago": [10.66, -61.51],
    "United Arab Emirates (the)": [24.47, 54.37],
    "Tunisia": [36.80, 10.18],
    "Turkey": [39.93, 32.86],
    "Turkmenistan": [37.95, 58.38],
    "Turks and Caicos Islands (the)": [21.79, -72.20],
    "Tuvalu": [-8.52, 179.20],
    "Uganda": [0.32, 32.58],
    "Ukraine": [50.45, 30.52],
    "North Macedonia": [41.99, 21.43],
    "Egypt": [30.04, 31.24],
    "United Kingdom of Great Britain and Northern Ireland (the)": [51.51, -0.13],
    "Guernsey": [49.45, -2.57],
    "Jersey": [49.19, -2.11],
    "Isle of Man": [54.23, -4.55],
    "Tanzania, the United Republic of": [-6.17, 35.74],
    "United States of America (the)": [38.90, -77.03],
    "Virgin Islands (U.S.)": [18.34, -64.93],
    "Burkina Faso": [12.24, -1.56],
    "Uruguay": [-32.52, -55.77],
    "Uzbekistan": [41.38, 64.59],
    "Venezuela (Bolivarian Republic of)": [6.42, -66.59],
    "Wallis and Futuna": [-13.77, -177.18],
    "Samoa": [-13.76, -172.10],
    "Yemen": [15.55, 48.52],
    "Zambia": [-13.13, 27.85]
}

const sin = (deg: number) : number => Math.sin(deg * Math.PI / 180)
const cos = (deg: number) : number => Math.cos(deg * Math.PI / 180)

export function EllipseSelect() {
    const form = useFormContext<IFormInput>()
    const mapRef = useRef<Map>(null)
    const [
        countryBin,
        centerLat,
        centerLong,
        azimuthAngle,
        centerLatIdx, 
        centerLongIdx, 
        semiMajorAxisIdx,
        semiMinorAxisIdx,
        azimuthAngleIdx,
        semiMajorAxisX,
        semiMinorAxisX,
        refinedCenterLatIdx,
        refinedCenterLongIdx,
        hazardCenterDeltaLatIdx,
        hazardCenterDeltaLongIdx,
        ellipseCenterShift,
        homotheticFactor,
        rotationAngle,
        specificSettings,
        modalOpen,
        hazardInfo,
        azimuthFromCenterToEpicenterIdx,
        lengthBetweenCenterAndEpicenterIdx
    ] = form.watch([
        "country",
        "centerLat",
        "centerLong",
        "azimuthAngle",
        "centerLatIdx",
        "centerLongIdx",
        "semiMajorAxisIdx",
        "semiMinorAxisIdx",
        "azimuthAngleIdx",
        "semiMajorAxisX",
        "semiMinorAxisX",
        "refinedCenterLatIdx",
        "refinedCenterLongIdx",
        "hazardCenterDeltaLatIdx",
        "hazardCenterDeltaLongIdx",
        "ellipseCenterShift",
        "homotheticFactor",
        "rotationAngle",
        "specificSettings",
        "modalOpen",
        "hazardInfo",
        "azimuthFromCenterToEpicenterIdx",
        "lengthBetweenCenterAndEpicenterIdx"
    ])

    useEffect(() => {
        form.setValue('centerLat', centerLatInt * centerLatIdx - 90)
    }, [centerLatIdx])

    useEffect(() => {
        form.setValue('centerLong', centerLongInt * centerLongIdx - 180)
    }, [centerLongIdx])

    useEffect(() => {
        form.setValue('semiMajorAxis', radii[semiMajorAxisIdx])
    }, [semiMajorAxisIdx])

    useEffect(() => {
        form.setValue('semiMinorAxis', radii[semiMinorAxisIdx])
    }, [semiMinorAxisIdx])

    useEffect(() => {
        form.setValue('azimuthAngle', 2.8125 * azimuthAngleIdx - 90)
    }, [azimuthAngleIdx])

    // Calculate the final ellipse definition, including the improved resolution
    const finalCenterLat = centerLat + centerLatInt / 8 * refinedCenterLatIdx

    const finalCenterLong = centerLong + centerLongInt / 8 * refinedCenterLongIdx

    const finalSemiMajorAxis = semiMajorAxisIdx === 0 ? radii[0] - semiMajorAxisX * radii[0] : 
      radii[semiMajorAxisIdx] - semiMajorAxisX * (radii[semiMajorAxisIdx] - radii[semiMajorAxisIdx - 1])

    const finalSemiMinorAxis = semiMinorAxisIdx === 0 ? radii[0] - semiMinorAxisX * radii[0] :
        radii[semiMinorAxisIdx] - semiMinorAxisX * (radii[semiMinorAxisIdx] - radii[semiMinorAxisIdx -1])

    // Calculate the hazard center
    const hazardCenterLat = finalCenterLat + ( hazardCenterDeltaLatIdx >= 2 ** 6 ? 
        (hazardCenterDeltaLatIdx + 1) * hazardCenterStep - 10 :
        hazardCenterDeltaLatIdx * hazardCenterStep - 10 )

    const hazardCenterLong = finalCenterLong + ( hazardCenterDeltaLongIdx >= 2 ** 6 ?
        (hazardCenterDeltaLongIdx + 1) * hazardCenterStep - 10 :
        hazardCenterDeltaLongIdx * hazardCenterStep - 10 )


    // Calculate the second ellipse definition
    const secondEllipseCenterLat = 
        finalCenterLat + (ellipseCenterShift * sin(rotationAngle * 11.25 + azimuthAngle) *
            finalSemiMajorAxis / 111319.9)

    const secondEllipseCenterLong = 
        finalCenterLong + (ellipseCenterShift * cos(rotationAngle * 11.25 + azimuthAngle) *
            finalSemiMajorAxis / 111319.9)

    const secondEllipseSemiMajorAxis = finalSemiMajorAxis * (0.25 * homotheticFactor + 0.25)

    const secondEllipseSemiMinorAxis = finalSemiMinorAxis * (0.25 * homotheticFactor + 0.25)


    // Calculate the Earthquake epicenter
    const epicenterLat = (() => {
      const azimuth = azimuthFromCenterToEpicenterIdx * 22.5
      const lengthInDeg = lengthFactors[lengthBetweenCenterAndEpicenterIdx] * (finalSemiMajorAxis / 111319.9)

      return finalCenterLat + lengthInDeg * sin(azimuth)
    })()

    const epicenterLong =(() => {
        const azimuth = azimuthFromCenterToEpicenterIdx * 22.5
        const lengthInDeg = lengthFactors[lengthBetweenCenterAndEpicenterIdx] * (finalSemiMajorAxis / 111319.9)

        return finalCenterLong + lengthInDeg * cos(azimuth)
    })()


    useEffect(() => {
        const country = getCountryFromBin(countryBin)
        if (country === undefined) return

        const [lat, long] = countryCapitalCoords[country]
        // Change current value to the nearest valid value
        const idxLat = Math.round((lat + 90) / centerLatInt)
        form.setValue('centerLatIdx', idxLat)

        const idxLong = Math.round((long + 180) / centerLongInt)
        form.setValue('centerLongIdx', idxLong)

        mapRef.current?.setView([lat, long], 13)
    }, [countryBin])

    useEffect(() => {
        if (mapRef.current === null) return
        if (form === null) return

        const map = mapRef.current!
        map.on('geosearch/showlocation', (e) => {
            // @ts-ignore
            const lat = e.location.y as number
            // @ts-ignore
            const lng = e.location.x as number
            const centerLatIdx = Math.round((lat + 90) / (180 / ((2 ** 16)-1)))
            const centerLongIdx = Math.round((lng + 180) / (360 / ((2 ** 17)-1)))
            form.setValue('centerLatIdx', centerLatIdx)
            form.setValue('centerLongIdx', centerLongIdx)

            // @ts-ignore Bounds is a tuple of tuples of degrees
            const bounds = e.location.bounds as [[number, number], [number, number]]
            const semiMajorAxisDeg = Math.abs(bounds[1][0] - bounds[0][0]) / 2
            const semiMinorAxisDeg = Math.abs(bounds[1][1] - bounds[0][1]) / 2

            // Convert degrees to meters
            const semiMajorAxisM = semiMajorAxisDeg * 111319.9
            const semiMinorAxisM = semiMinorAxisDeg * 111319.9

            // Generate the radii array based on current x values
            const majorRadii = Array.from({ length: 32 }).map((_, i) => {
                if (i === 0) return radii[0] - semiMajorAxisX * radii[0]
                return radii[i] - semiMajorAxisX * (radii[i] - radii[i - 1])
            })
            const minorRadii = Array.from({ length: 32 }).map((_, i) => {
                if (i === 0) return radii[0] - semiMinorAxisX * radii[0]
                return radii[i] - semiMinorAxisX * (radii[i] - radii[i - 1])
            })

            // Get index of the nearest valid value
            const semiMajorAxisIdx = majorRadii.findIndex(r => r > semiMajorAxisM)
            const semiMinorAxisIdx = minorRadii.findIndex(r => r > semiMinorAxisM)

            form.setValue('semiMajorAxisIdx', semiMajorAxisIdx)
            form.setValue('semiMinorAxisIdx', semiMinorAxisIdx)
            form.setValue('azimuthAngleIdx', 0)
        })
    }, [mapRef?.current, form])
    
    return (
        <div className="grid gap-1 col-span-2">
            <div className="grid grid-cols-[max-content_1fr] items-center gap-1">
                <label>Search: </label>
            </div>
            <MapContainer
                center={countryCapitalCoords['Afghanistan']}
                zoom={13}
                scrollWheelZoom={false}
                className={`w-full h-96 sticky top-0`}
                maxBounds={[[90, 180], [-90, -180]]}
                ref={mapRef}
            >
                { !modalOpen && <>
                <GeoSearch />
                <TileLayer 
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                { 
                    finalCenterLat !== undefined && !Number.isNaN(finalCenterLat) &&
                    finalCenterLong !== undefined && !Number.isNaN(finalCenterLong) &&
                    finalSemiMajorAxis !== undefined && !Number.isNaN(finalSemiMajorAxis) &&
                    finalSemiMinorAxis !== undefined && !Number.isNaN(finalSemiMinorAxis) &&
                    azimuthAngle !== undefined && !Number.isNaN(azimuthAngle)
                && 
                <Ellipse 
                    center={[finalCenterLat, finalCenterLong]}
                    radii={[finalSemiMajorAxis, finalSemiMinorAxis]}
                    tilt={azimuthAngle}
                    options={{
                        color: '#ff7961',
                        fillColor: '#ff7961',
                        fillOpacity: 0.5,
                        opacity: 1,
                        weight: 2,
                    }}
                >
                    <Popup>Main Ellipse</Popup>
                </Ellipse>}
                { 
                    specificSettings === 2 &&
                    secondEllipseCenterLat !== undefined && !Number.isNaN(secondEllipseCenterLat) &&
                    secondEllipseCenterLong !== undefined && !Number.isNaN(secondEllipseCenterLong) &&
                    secondEllipseSemiMajorAxis !== undefined && !Number.isNaN(secondEllipseSemiMajorAxis) &&
                    secondEllipseSemiMinorAxis !== undefined && !Number.isNaN(secondEllipseSemiMinorAxis) &&
                    azimuthAngle !== undefined && !Number.isNaN(azimuthAngle)
                &&
                <Ellipse 
                    center={[secondEllipseCenterLat, secondEllipseCenterLong]}
                    radii={[secondEllipseSemiMajorAxis, secondEllipseSemiMinorAxis]}
                    tilt={azimuthAngle}
                    options={{
                        color: 'blue',
                        fillColor: 'blue',
                        fillOpacity: 0.5,
                        opacity: 1,
                        weight: 2,
                    }}
                lengthFactors>
                    <Popup>Second Ellipse</Popup>
                </Ellipse>}
                { specificSettings === 1 &&
                    <Marker position={[hazardCenterLat, hazardCenterLong]}>
                        <Popup>Center of Hazard</Popup>
                    </Marker>
                }
                { hazardInfo === 'Earthquake' && 
                    <Marker position={[epicenterLat, epicenterLong]}>
                        <Popup>Earthquake Epicenter</Popup>
                    </Marker>
                }
                </>}
            </MapContainer>
            <div className="grid grid-cols-[max-content_1fr] items-center gap-1">
                <label>Center Latitude: </label>
                <input 
                    type='number'
                    min={-90}
                    max={90}
                    step={centerLatInt}
                    {...form.register("centerLat", {
                        valueAsNumber: true,
                        onBlur: (e) => {
                            // Change current value to the nearest valid value
                            const value = e.target.valueAsNumber
                            const idx = Math.round((value + 90) / centerLatInt)
                            form.setValue('centerLatIdx', idx)
                            const newCenterLat = centerLatInt * idx - 90
                            mapRef.current?.setView([newCenterLat, centerLong])
                        }
                    })}
                    onKeyDown={e => {
                        if (e.key === 'Enter') 
                            e.currentTarget.blur()
                    }}
                />
                <div className="col-span-2 flex gap-1">
                    <button
                        className="py-2 px-4 rounded border border-gray-500 disabled:opacity-50"
                        disabled={centerLatIdx === 0}
                        onClick={() => {
                            form.setValue('centerLatIdx', centerLatIdx - 1)
                        }}
                    >
                        -
                    </button>
                    <input 
                        type='range'
                        className="w-full"
                        min={0}
                        max={2 ** 16 - 1}
                        {...form.register("centerLatIdx", {
                            valueAsNumber: true
                        })} 
                    />
                    <button
                        className="py-2 px-4 rounded border border-gray-500 disabled:opacity-50"
                        disabled={centerLatIdx === 2 ** 16 - 1}
                        onClick={() => {
                            form.setValue('centerLatIdx', centerLatIdx + 1)
                        }}
                    >
                        +
                    </button>
                </div>
                <label>Center Longitude: </label>
                <input 
                    type='number'
                    min={-180}
                    max={180}
                    step={centerLongInt}
                    {...form.register("centerLong", {
                        valueAsNumber: true,
                        onBlur: (e) => {
                            // Change current value to the nearest valid value
                            const value = e.target.valueAsNumber
                            const idx = Math.round((value + 180) / centerLongInt)
                            form.setValue('centerLongIdx', idx)
                            const newCenterLong = centerLongInt * idx - 180
                            mapRef.current?.setView([centerLat, newCenterLong], 13)
                        }
                    })}
                    onKeyDown={e => {
                        if (e.key === 'Enter') 
                            e.currentTarget.blur()
                    }}
                />
                <div className="col-span-2 flex gap-1">
                    <button
                        className="py-2 px-4 rounded border border-gray-500 disabled:opacity-50"
                        disabled={centerLongIdx === 0}
                        onClick={() => {
                            form.setValue('centerLongIdx', centerLongIdx - 1)
                        }}
                    >
                        -
                    </button>
                    <input 
                        type='range'
                        className="w-full"
                        min={0}
                        max={2 ** 17 - 1}
                        {...form.register("centerLongIdx", {
                            valueAsNumber: true
                        })} 
                    />
                    <button
                        className="py-2 px-4 rounded border border-gray-500 disabled:opacity-50"
                        disabled={centerLongIdx === 2 ** 17 - 1}
                        onClick={() => {
                            form.setValue('centerLongIdx', centerLongIdx + 1)
                        }}
                    >
                        +
                    </button>
                </div>
                <label>Semi-Major Axis (m): </label>
                <input 
                    type='number'
                    min={minRadius}
                    max={maxRadius}
                    step={semiMajorAxisX}
                    {...form.register("semiMajorAxis", {
                        valueAsNumber: true,
                        onBlur: (e) => {
                            // Change current value to the nearest valid value
                            const value = e.target.valueAsNumber
                            const majorRadii = Array.from({ length: 32 }).map((_, i) => {
                                if (i === 0) return radii[0] - semiMajorAxisX * radii[0]
                                return radii[i] - semiMajorAxisX * (radii[i] - radii[i - 1])
                            })
                            const idx = majorRadii.findIndex(r => r > value)
                            form.setValue('semiMajorAxisIdx', idx)
                        }
                    })}
                    onKeyDown={e => {
                        if (e.key === 'Enter') 
                            e.currentTarget.blur()
                    }}
                />
                <input 
                    type='range'
                    min={0}
                    max={2 ** 5 - 1}
                    className="col-span-2"
                    {...form.register("semiMajorAxisIdx", {
                        valueAsNumber: true,
                    })}
                />
                <label>Semi-Minor Axis (m): </label>
                <input 
                    type='number'
                    min={minRadius}
                    max={maxRadius}
                    step={semiMinorAxisX}
                    {...form.register("semiMinorAxis", {
                        valueAsNumber: true,
                        onBlur: (e) => {
                            // Change current value to the nearest valid value
                            const value = e.target.valueAsNumber
                            const minorRadii = Array.from({ length: 32 }).map((_, i) => {
                                if (i === 0) return radii[0] - semiMinorAxisX * radii[0]
                                return radii[i] - semiMinorAxisX * (radii[i] - radii[i - 1])
                            })
                            const idx = minorRadii.findIndex(r => r > value)
                            form.setValue('semiMinorAxisIdx', idx)
                        }
                    })}
                    onKeyDown={e => {
                        if (e.key === 'Enter') 
                            e.currentTarget.blur()
                    }}
                />
                <input 
                    type='range'
                    min={0}
                    max={2 ** 5 - 1}
                    className="col-span-2"
                    {...form.register("semiMinorAxisIdx", {
                        valueAsNumber: true
                    })}
                />
                <label>Azimuth Angle: </label>
                <input 
                    type='number'
                    min={-90}
                    max={90}
                    step={2.8125}
                    {...form.register("azimuthAngle", {
                        valueAsNumber: true,
                        onBlur: (e) => {
                            // Change current value to the nearest valid value
                            const value = e.target.valueAsNumber
                            const idx = Math.round((value + 90) / 2.8125)
                            form.setValue('azimuthAngleIdx', idx)
                        }
                    })}
                    onKeyDown={e => {
                        if (e.key === 'Enter') 
                            e.currentTarget.blur()
                    }}
                />
                <input 
                    type='range'
                    min={0}
                    max={2 ** 6 - 1}
                    className="col-span-2"
                    {...form.register("azimuthAngleIdx", {
                        valueAsNumber: true,
                    })}
                />
            </div>
        </div>
    )
}
