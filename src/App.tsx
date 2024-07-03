import { useForm } from 'react-hook-form'
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

Modal.setAppElement('#root')

function App() {
  const form = useForm<IFormInput>({
    defaultValues: {
      providers: [{ name: ''}],
      customLibrary: guidanceLibraries['International'],
      centerLatIdx: 0,
      centerLongIdx: 0,
      centerLatInt: 180 / ((2 ** 16)-1),
      centerLongInt: 360 / ((2 ** 17)-1),
      semiMajorAxisIdx: 0,
      semiMinorAxisIdx: 0,
      semiMajorAxisX: 0,
      semiMinorAxisX: 0,
      azimuthAngleIdx: 0
    }
  })

  return (
    <div className={`w-full h-full flex justify-center bg-gradient-to-br from-purple-700 to-amber-700`}>
      <div className='grid grid-cols-[max-content_1fr] gap-3 bg-white p-8 rounded-lg my-16 items-center'>
        <h1 className='text-2xl font-bold col-span-2'>QZSS EWS Message Generator</h1>
        <h2 className='text-lg font-bold'>Type</h2>
        <select {...form.register('type')}>
          <option value='00'>Test</option>
          <option value='01'>Alert</option>
          <option value='10'>Update</option>
          <option value='11'>All Clear</option>
        </select>
        <h2 className='text-lg font-bold'>Country</h2>
        <CountrySelect form={form} />
        <h2 className='text-lg font-bold'>Provider</h2>
        <ProviderSelect form={form} />
        <h2 className='text-lg font-bold col-span-2'>Hazard</h2>
        <h2 className='text-lg'>Category and Type</h2>
        <HazardSelect form={form} />
        <h2 className='text-lg'>Severity</h2>
        <SeveritySelect form={form} />
        <h2 className='text-lg'>UTC Time</h2>
        <UTCSelect form={form} />
        <h2 className='text-lg font-bold col-span-2'>Guidance</h2>
        <h2 className='text-lg'>Library</h2>
        <select {...form.register('libSelection')}>
            <option value='0'>International Guidance Library</option>
            <option value='1'>Country/Region Guidance Library</option>
        </select>
        <h2 className='text-lg'>Version</h2>
        <select {...form.register('libVersion')}>
            {[...Array(8).keys()].map((version) => (
                <option key={version} value={version}>
                    #{version + 1}
                </option>
            ))}
        </select>
        <h2 className='text-lg'>Instructions</h2>
        <GuidanceSelect form={form} />
        <h2 className='text-lg font-bold col-span-2'>Ellipse Definition</h2>
        <EllipseSelect form={form} />
      </div>
    </div>
  )
}

export default App
