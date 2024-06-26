import { useForm } from 'react-hook-form'
import { CountrySelect } from './components/CountrySelect'
import { IFormInput } from './interface'

import 'leaflet/dist/leaflet.css'
import { ProviderSelect } from './components/ProviderSelect'

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
    </div>
  )
}

export default App
