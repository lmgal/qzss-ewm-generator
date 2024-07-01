import { useForm } from 'react-hook-form'
import { CountrySelect } from './components/CountrySelect'
import { IFormInput } from './interface'
import Modal from 'react-modal'

import 'leaflet/dist/leaflet.css'
import { ProviderSelect } from './components/ProviderSelect'
import { HazardSelect } from './components/HazardSelect'
import { SeveritySelect } from './components/SeveritySelect'
import { UTCSelect } from './components/UTCSelect'
import { GuidanceSelect, guidanceLibraries } from './components/GuidanceSelect'

Modal.setAppElement('#root')

function App() {
  const form = useForm<IFormInput>({
    defaultValues: {
      providers: [{ name: ''}],
      customLibrary: guidanceLibraries['International']
    }
  })

  return (
    <div className={`w-full h-full flex justify-center bg-gradient-to-br from-purple-700 to-amber-700`}>
      <div className='grid grid-cols-[max-content_1fr] gap-1 bg-white p-8 rounded-lg my-16'>
        <h1 className='text-2xl font-bold col-span-2'>QZSS EWS Message Generator</h1>
        <h2 className='text-lg font-bold float-left'>Type</h2>
        <select className='clear-right' {...form.register('type')}>
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
        <h2 className='text-lg'>UTC</h2>
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
      </div>
    </div>
  )
}

export default App
