import { UseFormReturn } from "react-hook-form"
import { IFormInput } from "../interface"

import { Magnitude } from "../hazard-components/Magnitude"
import { SeismicCoefficient } from "../hazard-components/SeismicCoefficient"
import { CenterToEpicenter } from "../hazard-components/CenterToEpicenter"

export function HazardInfo({ form }: { form: UseFormReturn<IFormInput> }) {
  const hazardInfo = form.watch('hazardInfo')  

  let hazardInfoOptions = <></>
  if (hazardInfo === 'Earthquake') 
    hazardInfoOptions = (
        <>
            <Magnitude form={form} />
            <SeismicCoefficient form={form} />
            <CenterToEpicenter form={form} />
        </>
    ) 
  

  return (
    <div className="col-span-2 grid gap-1">
      <select 
        {...form.register('hazardInfo')}
      >
        <option value='' selected disabled>Select Hazard Category</option>
        <option>Earthquake</option>
        <option>Tsunami</option> 
        <option>Cold Wave</option>
        <option>Tropical Cyclone (Hurricane)</option>
        <option>Tropical Cyclone (Typhoon)</option>
        <option>Tornado</option>
        <option>Storm or Thunderstorm</option>
        <option>Hail</option>
        <option>Rainfall</option>
        <option>Snowfall</option>
        <option>Flood</option>
        <option>Lightning</option>
        <option>Heat Wave</option>
        <option>Wind Chill/Frost</option>
        <option>Derecho</option>
        <option>Fog</option>
        <option>Snow Storm/ Blizzard</option>
        <option>Drought</option>
        <option>Avalance Risk</option>
        <option>Tidal Wave</option>
        <option>Wind/Wave/Storm Surge</option>
        <option>Geomagnetic or Solar Storm</option>
        <option>Terrorism</option>
        <option>Forest Fire</option>
        <option>Risk of Fire</option>
        <option>Contaminated Drinking Water</option>
        <option>UV Radiation</option>
        <option>Risk of Infection</option>
        <option>Noise Pollution</option>
        <option>Air Pollution</option>
        <option>Marine Pollution</option>
        <option>River Pollution</option>
        <option>Pandemia</option>
        <option>Gas Supply Outage</option>
        <option>Outage of IT Systems</option>
        <option>Power Outage</option>
        <option>Emergency Number Outage</option>
        <option>Telephone Line Outage</option>
        <option>Nuclear Power Station Accident</option>
        <option>Chemical Hazard</option>
        <option>Biological Hazard</option>
        <option>Radiological Hazard</option>
        <option>Nuclear Hazard</option>
        <option>Explosive Hazard</option>
      </select>
      { hazardInfoOptions }
    </div>
  )
}
