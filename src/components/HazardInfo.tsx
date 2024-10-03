import { useFormContext } from "react-hook-form"
import { IFormInput } from "../interface"

import { Magnitude } from "../hazard-components/Magnitude"
import { SeismicCoefficient } from "../hazard-components/SeismicCoefficient"
import { CenterToEpicenter } from "../hazard-components/CenterToEpicenter"
import { WaveHeight } from "../hazard-components/WaveHeight"
import { TemperatureRange } from "../hazard-components/TemperatureRange"
import { HurricaneCategory } from "../hazard-components/HurricaneCategories"
import { WindSpeed } from "../hazard-components/WindSpeed"
import { RainfallAmount } from "../hazard-components/RainfallAmount"
import { TyphoonCategory } from "../hazard-components/TyphoonCategories"
import { TornadoProbability } from "../hazard-components/TornadoProbability"
import { DamageCategory } from "../hazard-components/DamageCategory"
import { LightningIntensity } from "../hazard-components/LightningIntensity"

export function HazardInfo() {
  const form = useFormContext<IFormInput>()
  const hazardInfo = form.watch('hazardInfo')  

  let hazardInfoOptions = <></>
  if (hazardInfo === 'Earthquake') 
    hazardInfoOptions = (
        <>
            <Magnitude />
            <SeismicCoefficient />
            <CenterToEpicenter />
        </>
    ) 
  if (hazardInfo === 'Tsunami')
    hazardInfoOptions = (
        <WaveHeight />
    )

  else if (hazardInfo === 'Cold Wave')
    hazardInfoOptions = (
        <TemperatureRange />
    )

  else if (hazardInfo === 'Tropical Cyclone (Hurricane)')
    hazardInfoOptions = (
        <>
            <HurricaneCategory />
            <WindSpeed />
            <RainfallAmount />
        </>
    )

  else if (hazardInfo === 'Tropical Cyclone (Typhoon)')
    hazardInfoOptions = (
        <>
            <TyphoonCategory />
            <WindSpeed />
            <RainfallAmount />
        </>
    )

  else if (hazardInfo === 'Tornado')
    hazardInfoOptions = (
        <>
            <WindSpeed />
            <RainfallAmount />
            <TornadoProbability />
        </>
    )

  else if (hazardInfo === 'Storm or Thunderstorm')
    hazardInfoOptions = (
        <>
            <WindSpeed />
            <RainfallAmount />
            <DamageCategory />
            <LightningIntensity />
        </>
    )

  

  return (
    <div className="col-span-2 grid grid-cols-[max-content_1fr] items-center gap-1 gap-y-2">
      <select 
        {...form.register('hazardInfo')}
        className="col-span-2"
      >
        <option value='' disabled>Select Hazard Category</option>
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
      { hazardInfo !== '' && <h2 className="font-bold col-span-2">Detailed Information</h2>}
      { hazardInfoOptions }
    </div>
  )
}
