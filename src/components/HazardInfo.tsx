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
import { useMemo } from "react"
import { HailScale } from "../hazard-components/HailIntensity"
import { Visibility } from "../hazard-components/Visibility"
import { SnowDepth } from "../hazard-components/SnowDepth"
import { FloodCategory } from "../hazard-components/FloodSeverity"
import { FogLevel } from "../hazard-components/FogLevel"
import { DroughtLevel } from "../hazard-components/DroughtLevel"
import { AvalanceRiskLevel } from "../hazard-components/AvalancheRisk"
import { AshfallAmount } from "../hazard-components/AshfallAmountImpact"
import { GeoMagneticScale } from "../hazard-components/GeomagneticScale"
import { TerrorismThreatLevel } from "../hazard-components/TerrorismThreat"
import { FireRiskLevel } from "../hazard-components/FireRiskLevel"
import { WaterQuality } from "../hazard-components/WaterQuality"
import { UVIndex } from "../hazard-components/UVIndex"
import { NumberOfCases } from "../hazard-components/NumberOfCases"
import { InfectionType } from "../hazard-components/InfectionType"
import { OutageEstimatedDuration } from "../hazard-components/OutageEstimation"
import { NuclearEventScale } from "../hazard-components/NuclearEventScale"

export function HazardInfo() {
  const form = useFormContext<IFormInput>()
  const hazardInfo = form.watch('hazardInfo')  

  const hazardInfoOptions = useMemo(() => {
    if (hazardInfo === 'Earthquake') 
      return (
          <>
              <Magnitude />
              <SeismicCoefficient />
              <CenterToEpicenter />
          </>
      ) 
    if (hazardInfo === 'Tsunami')
      return (
          <WaveHeight />
      )
  
    if (hazardInfo === 'Cold Wave')
      return (
          <TemperatureRange />
      )
  
    if (hazardInfo === 'Tropical Cyclone (Hurricane)')
      return (
          <>
              <HurricaneCategory />
              <WindSpeed />
              <RainfallAmount />
          </>
      )
  
    if (hazardInfo === 'Tropical Cyclone (Typhoon)')
      return (
          <>
              <TyphoonCategory />
              <WindSpeed />
              <RainfallAmount />
          </>
      )
  
    if (hazardInfo === 'Tornado')
      return (
          <>
              <WindSpeed />
              <RainfallAmount />
              <TornadoProbability />
          </>
      )
  
    if (hazardInfo === 'Storm or Thunderstorm')
      return (
          <>
              <WindSpeed />
              <RainfallAmount />
              <DamageCategory />
              <LightningIntensity />
          </>
      )

    if (hazardInfo === 'Hail')
      return <HailScale />

    if (hazardInfo === 'Rainfall')
      return (
          <>
            <RainfallAmount />
            <Visibility />
          </>
      )

    if (hazardInfo === 'Snowfall')
      return (
        <>
          <SnowDepth />
          <Visibility />
        </>
      )

    if (hazardInfo === 'Flood')
      return <FloodCategory />

    if (hazardInfo === 'Lightning')
      return <LightningIntensity />

    if (hazardInfo === 'Heat Wave')
      return <TemperatureRange />

    if (hazardInfo === 'Wind Chill/Frost')
      return <>
        <TemperatureRange />
        <WindSpeed />
      </>

    if (hazardInfo === 'Derecho')
      return <>
        <WindSpeed />
        <RainfallAmount />
        <LightningIntensity />
        <TornadoProbability />
      </>

    if (hazardInfo === 'Fog')
      return <>
        <FogLevel />
        <Visibility />
      </>

    if (hazardInfo === 'Snow Storm/ Blizzard')
      return <>
        <Visibility />
        <WindSpeed />
      </>

    if (hazardInfo === 'Drought')
      return <DroughtLevel />

    if (hazardInfo === 'Avalance Risk')
      return <AvalanceRiskLevel />

    if (hazardInfo === 'Tidal Wave')
      return <WaveHeight />

    if (hazardInfo === 'Ash Fall')
      return <AshfallAmount />

    if (hazardInfo === 'Wind/Wave/Storm Surge')
      return <>
        <WindSpeed />
        <WaveHeight />
      </>

    if (hazardInfo === 'Geomagnetic or Solar Storm')
      return <GeoMagneticScale />

    if (hazardInfo === 'Terrorism')
      return <TerrorismThreatLevel />

    if (hazardInfo === 'Forest Fire')
      return <FireRiskLevel />

    if (hazardInfo === 'Risk of Fire')
      return <FireRiskLevel />

    if (hazardInfo === 'Contaminated Drinking Water')
      return <WaterQuality />

    if (hazardInfo === 'UV Radiation')
      return <UVIndex />

    if (hazardInfo === 'Risk of Infection')
      return <>
        <NumberOfCases />
        <InfectionType />
      </>
  
    if (hazardInfo === 'Gas Supply Outage')
      return <OutageEstimatedDuration />

    if (hazardInfo === 'Power Outage')
      return <OutageEstimatedDuration />

    if (hazardInfo === 'Emergency Number Outage')
      return <OutageEstimatedDuration />

    if (hazardInfo === 'Telephone Line Outage')
      return <OutageEstimatedDuration />

    if (hazardInfo === 'Nuclear Power Station Accident')
      return <NuclearEventScale />

    return <></>
  }, [hazardInfo])

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
        <option>Ash Fall</option>
        <option>Wind/Wave/Storm Surge</option>
        <option>Geomagnetic or Solar Storm</option>
        <option>Terrorism</option>
        <option>Forest Fire</option>
        <option>Risk of Fire</option>
        <option>Contaminated Drinking Water</option>
        <option>UV Radiation</option>
        <option>Risk of Infection</option>
        {/*
          <option>Noise Pollution</option>
          <option>Air Pollution</option>
          <option>Marine Pollution</option>
          <option>River Pollution</option>
         */ }
        <option>Pandemia</option>
        <option>Gas Supply Outage</option>
        <option>Outage of IT Systems</option>
        <option>Power Outage</option>
        <option>Emergency Number Outage</option>
        <option>Telephone Line Outage</option>
        <option>Nuclear Power Station Accident</option>
        { /*
          <option>Chemical Hazard</option>
          <option>Biological Hazard</option>
          <option>Radiological Hazard</option>
          <option>Nuclear Hazard</option>
          <option>Explosive Hazard</option>
         */ }
      </select>
      { hazardInfo !== '' && <h2 className="font-bold col-span-2">Detailed Information</h2>}
      { hazardInfoOptions }
    </div>
  )
}
