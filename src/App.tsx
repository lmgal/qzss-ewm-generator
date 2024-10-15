import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { CountrySelect } from './components/CountrySelect'
import { IFormInput } from './interface'

import 'leaflet/dist/leaflet.css'
import 'leaflet-geosearch/dist/geosearch.css'
import 'react-responsive-modal/styles.css'
import { ProviderSelect } from './components/ProviderSelect'
import { HazardSelect } from './components/HazardSelect'
import { SeveritySelect } from './components/SeveritySelect'
import { UTCSelect } from './components/UTCSelect'
import { GuidanceSelect, guidanceLibraries } from './components/GuidanceSelect'
import { EllipseSelect } from './components/EllipseSelect'
import { ImprovedResolution } from './components/ImprovedResolution'
import { HazardCenter } from './components/HazardCenter'
import { useEffect } from 'react'
import { SecondEllipse } from './components/SecondEllipse'
import { HazardInfo } from './components/HazardInfo'
import { intToBin } from './utils'

function App() {
  const [binaryString, setBinaryString] = useState<string>('')
  const form = useForm<IFormInput>({
    defaultValues: {
      providers: [{ name: '' }],
      customLibrary: guidanceLibraries['International'],
      centerLatIdx: 0,
      centerLongIdx: 0,
      semiMajorAxisIdx: 0,
      semiMinorAxisIdx: 0,
      semiMajorAxisX: 0,
      semiMinorAxisX: 0,
      azimuthAngleIdx: 0,
      refinedCenterLatIdx: 0,
      refinedCenterLongIdx: 0,
      hazardCenterDeltaLatIdx: 0,
      hazardCenterDeltaLongIdx: 0,
      modalOpen: false,
      azimuthFromCenterToEpicenterIdx: 0,
      lengthBetweenCenterAndEpicenterIdx: 0,
    }
  })

  const handleSubmit = (data: IFormInput) => {
    let binary = ''
    binary += intToBin(data.type, 2)
    binary += intToBin(data.country, 9)
    binary += intToBin(data.providerId, 5)
    binary += intToBin(data.hazardTypeCategory, 7)
    binary += intToBin(data.hazardSeverity, 2)
    binary += intToBin(data.hazardWeek, 1)
    binary += intToBin(data.hazardUTCTime, 14)
    binary += intToBin(data.hazardExpectedDuration, 2)
    binary += intToBin(data.libSelection, 1)
    binary += intToBin(data.libVersion, 3)
    // Guidance Select (10 bits distributed based on selected library)
    data.libActions.forEach((action, i) => {
      binary += intToBin(action, data.customLibrary[i].bits)
    })
    // Ellipse Definition 
    binary += intToBin(data.centerLatIdx, 16)
    binary += intToBin(data.centerLongIdx, 17)
    binary += intToBin(data.semiMajorAxisIdx, 5)
    binary += intToBin(data.semiMinorAxisIdx, 5)
    binary += intToBin(data.azimuthAngleIdx, 6)
    // Specific Settings
    binary += intToBin(data.specificSettings, 2)
    // Improved Resolution of Main Ellipse
    if (data.specificSettings === 0) {
      binary += intToBin(data.refinedCenterLatIdx, 3)
      binary += intToBin(data.refinedCenterLongIdx, 3)

      // TODO: Use index on input range instead of value, just so it is uniform
      const semiMajorAxisXIdx = Math.floor(data.semiMajorAxisX / 0.125)
      const semiMinorAxisXIdx = Math.floor(data.semiMinorAxisX / 0.125)
      binary += intToBin(semiMajorAxisXIdx, 3)
      binary += intToBin(semiMinorAxisXIdx, 3)

      binary += '0'.repeat(3) // Reserved bits
    }
    // Position of Center of Hazard
    if (data.specificSettings === 1) {
      binary += intToBin(data.hazardCenterDeltaLatIdx, 7)
      binary += intToBin(data.hazardCenterDeltaLongIdx, 7)
      binary += '0' // Reserved bit
    }
    // Second Ellipse Definition
    if (data.specificSettings === 2) {
      binary += intToBin(data.ellipseCenterShift, 2)
      binary += intToBin(data.homotheticFactor, 3)
      binary += intToBin(data.rotationAngle, 5)
      binary += intToBin(data.secondEllipseGuidanceIdx, 5)
    }
    // Quantitative or Detailed Information related to Hazard
    if (data.specificSettings === 3) {
      // Earthquake
      if (data.hazardInfo === 'Earthquake') {
        binary += intToBin(data.magnitude, 4)
        binary += intToBin(data.seismicCoefficient, 3)
        binary += intToBin(data.azimuthFromCenterToEpicenterIdx, 4)
        binary += intToBin(data.lengthBetweenCenterAndEpicenterIdx, 4)

      } else if (data.hazardInfo === 'Tsunami') {
        binary += intToBin(data.waveHeight, 3)
        binary += '0'.repeat(12) // Reserved bits

      } else if (data.hazardInfo === 'Cold Wave') {
        binary += intToBin(data.temperatureRange, 4)
        binary += '0'.repeat(11) // Reserved bits

      } else if (data.hazardInfo === 'Tropical Cyclone (Hurricane)') {
        binary += intToBin(data.hurricaneCategory, 3)
        binary += intToBin(data.windSpeed, 4)
        binary += intToBin(data.rainfallAmount, 3)
        binary += '0'.repeat(5) // Reserved bits

      } else if (data.hazardInfo === 'Tropical Cyclone (Typhoon)') {
        binary += intToBin(data.typhoonCategory, 3)
        binary += intToBin(data.windSpeed, 4)
        binary += intToBin(data.rainfallAmount, 3)
        binary += '0'.repeat(5) // Reserved bits

      } else if (data.hazardInfo === 'Tornado') {
        binary += intToBin(data.windSpeed, 4)
        binary += intToBin(data.rainfallAmount, 3)
        binary += intToBin(data.tornadoProbability, 3)
        binary += '0'.repeat(5) // Reserved bits

      } else if (data.hazardInfo === 'Storm or Thunderstorm') {
        binary += intToBin(data.windSpeed, 4)
        binary += intToBin(data.rainfallAmount, 3)
        binary += intToBin(data.damageCategory, 3)
        binary += intToBin(data.lightningIntensity, 3)
        binary += '0'.repeat(2) // Reserved bits

      } else if (data.hazardInfo === 'Hail') {
        binary += intToBin(data.hailScale, 4)
        binary += '0'.repeat(11) // Reserved bits

      } else if (data.hazardInfo === 'Rainfall') {
        binary += intToBin(data.rainfallAmount, 3)
        binary += intToBin(data.visibility, 4)
        binary += '0'.repeat(8) // Reserved bits

      } else if (data.hazardInfo === 'Snowfall') {
        binary += intToBin(data.snowDepth, 5)
        binary += intToBin(data.visibility, 4)
        binary += '0'.repeat(6) // Reserved bits

      } else if (data.hazardInfo === 'Flood') {
        binary += intToBin(data.floodSeverity, 2)
        binary += '0'.repeat(13) // Reserved bits

      } else if (data.hazardInfo === 'Lightning') {
        binary += intToBin(data.lightningIntensity, 3)
        binary += '0'.repeat(12) // Reserved bits
      
      } else if (data.hazardInfo === 'Heat Wave') {
        binary += intToBin(data.temperatureRange, 4)
        binary += '0'.repeat(11) // Reserved bits

      } else if (data.hazardInfo === 'Wind Chill/Frost') {
        binary += intToBin(data.windSpeed, 4)
        binary += intToBin(data.temperatureRange, 4)
        binary += '0'.repeat(7) // Reserved bits

      } else if (data.hazardInfo === 'Derecho') {
        binary += intToBin(data.windSpeed, 4)
        binary += intToBin(data.rainfallAmount, 3)
        binary += intToBin(data.lightningIntensity, 3)
        binary += intToBin(data.tornadoProbability, 3)
        binary += '0'.repeat(2) // Reserved bit

      } else if (data.hazardInfo === 'Fog') {
        binary += intToBin(data.fogLevel, 3)
        binary += intToBin(data.visibility, 4)
        binary += '0'.repeat(8) // Reserved bits

      } else if (data.hazardInfo === 'Snow Storm/ Blizzard') {
        binary += intToBin(data.visibility, 4)
        binary += intToBin(data.windSpeed, 4)
        binary += '0'.repeat(7) // Reserved bits

      } else if (data.hazardInfo === 'Drought') {
        binary += intToBin(data.droughtLevel, 2)
        binary += '0'.repeat(13) // Reserved bits

      } else if (data.hazardInfo === 'Avalance Risk') {
        binary += intToBin(data.avalanceWarningLevel, 3)
        binary += '0'.repeat(12) // Reserved bits

      } else if (data.hazardInfo === 'Tidal Wave') {
        binary += intToBin(data.waveHeight, 3)
        binary += '0'.repeat(12) // Reserved bits

      } else if (data.hazardInfo === 'Ash Fall') {
        binary += intToBin(data.ashFallAmount, 3)
        binary += '0'.repeat(12) // Reserved bits

      } else if (data.hazardInfo === 'Wind/Wave/Storm Surge') {
        binary += intToBin(data.windSpeed, 4)
        binary += intToBin(data.waveHeight, 3)
        binary += '0'.repeat(8) // Reserved bits

      } else if (data.hazardInfo === 'Geomagnetic or Solar Storm') {
        binary += intToBin(data.geomagneticScale, 3)
        binary += '0'.repeat(12) // Reserved bits

      } else if (data.hazardInfo === 'Terrorism') {
        binary += intToBin(data.terrorismThreatLevel, 3)
        binary += '0'.repeat(12) // Reserved bits

      } else if (data.hazardInfo === 'Forest Fire') {
        binary += intToBin(data.fireRiskLevel, 3)
        binary += '0'.repeat(12) // Reserved bits

      } else if (data.hazardInfo === 'Risk of Fire') {
        binary += intToBin(data.fireRiskLevel, 3)
        binary += '0'.repeat(12) // Reserved bits

      } else if (data.hazardInfo === 'Contaminated Drinking Water') {
        binary += intToBin(data.waterQuality, 3)
        binary += '0'.repeat(12) // Reserved bits

      } else if (data.hazardInfo === 'UV Radiation') {
        binary += intToBin(data.uvIndex, 4)
        binary += '0'.repeat(11) // Reserved bits

      } else if (data.hazardInfo === 'Risk of Infection') {
        binary += intToBin(data.caseNumberPer100000, 5)
        binary += intToBin(data.infectionType, 6)
        binary += '0'.repeat(4)

      } else if (data.hazardInfo === 'Pandemia') {
        binary += intToBin(data.caseNumberPer100000, 5)
        binary += intToBin(data.infectionType, 6)
        binary += '0'.repeat(4)

      } else if (data.hazardInfo === 'Gas Supply Outage') {
        binary += intToBin(data.outageEstimatedDuration, 4)
        binary += '0'.repeat(11)

      } else if (data.hazardInfo === 'Outage of IT Systems') {
        binary += intToBin(data.outageEstimatedDuration, 4)
        binary += '0'.repeat(11)

      } else if (data.hazardInfo === 'Power Outage') {
        binary += intToBin(data.outageEstimatedDuration, 4)
        binary += '0'.repeat(11)

      } else if (data.hazardInfo === 'Emergency Number Outage') {
        binary += intToBin(data.outageEstimatedDuration, 4)
        binary += '0'.repeat(11)

      } else if (data.hazardInfo === 'Telephone Line Outage') {
        binary += intToBin(data.outageEstimatedDuration, 4)
        binary += '0'.repeat(11)
       
      } else if (data.hazardInfo === 'Nuclear Power Station Accident') {
        binary += intToBin(data.nuclearEventScale, 4)
        binary += '0'.repeat(11)

      }
    }

    console.assert(binary.length === 122, 'Binary string length is not 122 bits')
    setBinaryString(binary)
  }

  const specificSettings = form.watch('specificSettings')

  useEffect(() => {
    if (specificSettings !== 0) {
      // Reset the values of the improved resolution
      form.reset({
        ...form.getValues(),
        refinedCenterLatIdx: 0,
        refinedCenterLongIdx: 0,
        semiMajorAxisX: 0,
        semiMinorAxisX: 0,
      })
    }

    if (specificSettings !== 1) {
      // Reset the values of the hazard center
      form.reset({
        ...form.getValues(),
        hazardCenterDeltaLatIdx: 0,
        hazardCenterDeltaLongIdx: 0,
      })
    } else {
      // Set marker to center
      form.reset({
        ...form.getValues(),
        hazardCenterDeltaLatIdx: 2 ** 6,
        hazardCenterDeltaLongIdx: 2 ** 6,
      })
    }

    if (specificSettings !== 2) {
      // Reset the values of the second ellipse
      form.reset({
        ...form.getValues(),
        ellipseCenterShift: 0,
        homotheticFactor: 3,
        rotationAngle: 0,
      })
    }

    if (specificSettings !== 3) {
      // Reset the values of the hazard info
      form.reset({
        ...form.getValues(),
        hazardInfo: ''
      })
    }
  }, [specificSettings])

  return (
    <div className={`w-full h-full flex justify-center bg-gradient-to-br from-purple-700 to-amber-700`}>
      <div className='grid grid-cols-[max-content_1fr] gap-3 bg-white p-8 rounded-lg md:my-16 items-center'>
        <FormProvider {...form}>
          <h1 className='text-2xl font-bold col-span-2'>QZSS EWS Message Generator</h1>
          <h2 className='text-lg font-bold col-span-2 md:col-span-1'>Type</h2>
          <select {...form.register('type', {
            valueAsNumber: true
          })}>
            <option value={0}>Test</option>
            <option value={1}>Alert</option>
            <option value={2}>Update</option>
            <option value={3}>All Clear</option>
          </select>
          <h2 className='text-lg font-bold col-span-2 md:col-span-1'>Country</h2>
          <CountrySelect />
          <h2 className='text-lg font-bold col-span-2 md:col-span-1'>Provider</h2>
          <ProviderSelect />
          <h2 className='text-lg font-bold col-span-2'>Hazard</h2>
          <h2 className='text-lg col-span-2 md:col-span-1'>Category and Type</h2>
          <HazardSelect />
          <h2 className='text-lg col-span-2 md:col-span-1'>Severity</h2>
          <SeveritySelect />
          <h2 className='text-lg col-span-2 md:col-span-1'>Week</h2>
          <select {...form.register('hazardWeek', {
            valueAsNumber: true
          })}>
            <option value={0}>Current Week</option>
            <option value={1}>Next Week</option>
          </select>
          <h2 className='text-lg col-span-2 md:col-span-1'>UTC Time</h2>
          <UTCSelect />
          <h2 className='text-lg col-span-2 md:col-span-1'>Expected Duration (hours)</h2>
          <select {...form.register('hazardExpectedDuration', {
            valueAsNumber: true
          })}>
            <option value={0}>Unknown</option>
            <option value={1}>Duration &lt; 6</option>
            <option value={2}>6 &le; Duration &lt; 12</option>
            <option value={3}>12 &le; Duration &lt; 24</option>
          </select>
          <h2 className='text-lg font-bold col-span-2'>Guidance</h2>
          <h2 className='text-lg col-span-2 md:col-span-1'>Library</h2>
          <select {...form.register('libSelection', {
            valueAsNumber: true
          })}>
            <option value={0}>International Guidance Library</option>
            <option value={1}>Country/Region Guidance Library</option>
          </select>
          <h2 className='text-lg col-span-2 md:col-span-1'>Version</h2>
          <select {...form.register('libVersion', {
            valueAsNumber: true
          })}>
            {[...Array(8).keys()].map((version) => (
              <option key={version} value={version}>
                #{version + 1}
              </option>
            ))}
          </select>
          <h2 className='text-lg col-span-2 md:col-span-1'>Instructions</h2>
          <GuidanceSelect />
          <h2 className='text-xl font-bold col-span-2'>Ellipse Definition</h2>
          <EllipseSelect />
          <h2 className='text-lg font-bold col-span-2 md:col-span-1'>Specific Settings</h2>
          <select {...form.register('specificSettings', {
            valueAsNumber: true
          })}>
            <option value={0}>Improved Resolution of Main Ellipse</option>
            <option value={1}>Position of Center of Hazard</option>
            <option value={2}>Second Ellipse Definition</option>
            <option value={3}>Quantitative or Detailed Information related to Hazard Category</option>
          </select>
          {specificSettings === 0 && <ImprovedResolution />}
          {specificSettings === 1 && <HazardCenter />}
          {specificSettings === 2 && <SecondEllipse />}
          {specificSettings === 3 && <HazardInfo />}
          <button
            className='bg-blue-500 text-white rounded-lg p-2 col-span-2'
            onClick={form.handleSubmit(handleSubmit)}
          >
            Generate
          </button>
          {binaryString !== '' && (
            <div className='col-span-2'>
              <h2 className='text-lg font-bold'>Binary String</h2>
              <textarea
                className='w-full h-32 p-2 resize-none'
                readOnly
                value={binaryString}
              />
            </div>
          )}
        </FormProvider>
      </div>
    </div>
  )
}

export default App
