import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { CountrySelect } from './components/CountrySelect'
import { IFormInput } from './interface'
import Modal from 'react-modal'

import 'leaflet/dist/leaflet.css'
import 'leaflet-geosearch/dist/geosearch.css'
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

Modal.setAppElement('#root')

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
      }
    }

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
      <div className='grid grid-cols-[max-content_1fr] gap-3 bg-white p-8 rounded-lg my-16 items-center lg:max-w-4xl'>
        <FormProvider {...form}>
          <h1 className='text-2xl font-bold col-span-2'>QZSS EWS Message Generator</h1>
          <h2 className='text-lg font-bold'>Type</h2>
          <select {...form.register('type', {
            valueAsNumber: true
          })}>
            <option value={0}>Test</option>
            <option value={1}>Alert</option>
            <option value={2}>Update</option>
            <option value={3}>All Clear</option>
          </select>
          <h2 className='text-lg font-bold'>Country</h2>
          <CountrySelect />
          <h2 className='text-lg font-bold'>Provider</h2>
          <ProviderSelect />
          <h2 className='text-lg font-bold col-span-2'>Hazard</h2>
          <h2 className='text-lg'>Category and Type</h2>
          <HazardSelect />
          <h2 className='text-lg'>Severity</h2>
          <SeveritySelect />
          <h2 className='text-lg'>Week</h2>
          <select {...form.register('hazardWeek', {
            valueAsNumber: true
          })}>
            <option value={0}>Current Week</option>
            <option value={1}>Next Week</option>
          </select>
          <h2 className='text-lg'>UTC Time</h2>
          <UTCSelect />
          <h2 className='text-lg'>Expected Duration (hours)</h2>
          <select {...form.register('hazardExpectedDuration', {
            valueAsNumber: true
          })}>
            <option value={0}>Unknown</option>
            <option value={1}>Duration &lt; 6</option>
            <option value={2}>6 &le; Duration &lt; 12</option>
            <option value={3}>12 &le; Duration &lt; 24</option>
          </select>
          <h2 className='text-lg font-bold col-span-2'>Guidance</h2>
          <h2 className='text-lg'>Library</h2>
          <select {...form.register('libSelection', {
            valueAsNumber: true
          })}>
            <option value={0}>International Guidance Library</option>
            <option value={1}>Country/Region Guidance Library</option>
          </select>
          <h2 className='text-lg'>Version</h2>
          <select {...form.register('libVersion', {
            valueAsNumber: true
          })}>
            {[...Array(8).keys()].map((version) => (
              <option key={version} value={version}>
                #{version + 1}
              </option>
            ))}
          </select>
          <h2 className='text-lg'>Instructions</h2>
          <GuidanceSelect />
          <h2 className='text-xl font-bold col-span-2'>Ellipse Definition</h2>
          <EllipseSelect />
          <h2 className='text-lg font-bold'>Specific Settings</h2>
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
