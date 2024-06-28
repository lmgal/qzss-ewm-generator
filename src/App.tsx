import { useForm } from 'react-hook-form'
import { CountrySelect } from './components/CountrySelect'
import { IFormInput } from './interface'

import 'leaflet/dist/leaflet.css'
import { ProviderSelect } from './components/ProviderSelect'
import { HazardSelect } from './components/HazardSelect'
import { SeveritySelect } from './components/SeveritySelect'
import { UTCSelect } from './components/UTCSelect'

function App() {
  const form = useForm<IFormInput>({
    defaultValues: {
      providers: [{ name: ''}],
    }
  })

  return (
    <div>
      <select {...form.register('type')}>
        <option value='00'>Test</option>
        <option value='01'>Alert</option>
        <option value='10'>Update</option>
        <option value='11'>All Clear</option>
      </select>
      <CountrySelect form={form} />
      <ProviderSelect form={form} />
      <HazardSelect form={form} />
      <SeveritySelect form={form} />
      <select {...form.register('hazardWeek')}>
        <option value='0'>Current</option>
        <option value='1'>Next</option>
      </select>
      <UTCSelect form={form} />
      <select {...form.register('hazardExpectedDuration')}>
        <option value='01'>Duration &lt; 6</option>
        <option value='10'>6 &le; Duration &lt; 12</option>
        <option value='11'>12 &le; Duration &lt; 24</option>
      </select>
      <select {...form.register('libSelection')}>
        <option value='0'>International Guidance Library</option>
        <option value='1'>Country/Region Guidance Library</option>
      </select>
      <select {...form.register('libVersion')}>
        { [...Array(8).keys()].map((version) => (
          <option key={version} value={version}>
            # {version + 1}
          </option>
        ))}
      </select>
    </div>
  )
}

export default App
