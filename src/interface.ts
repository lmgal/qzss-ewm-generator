export interface IFormInput {
    type: number,
    country: number,
    providers: Array<{
        name: string
    }>,
    providerId: number,
    providerCountry: string,
    hazardTypeCategory: number,
    hazardSeverity: number,
    hazardWeek: number,
    hazardDay: number,
    hazardHour: number,
    hazardMinute: number,
    hazardIsAM: number,
    hazardIs24HourClock: number,
    hazardUTCTime: number,
    hazardExpectedDuration: number,
    libSelection: number,
    libVersion: number,
    libActions: Array<string>,
    customLibrary: Array<{
        bits: number,
        description: string
        instructs: Array<{
            code: string,
            detail: string
        }>
    }>,
    centerLat: number,
    centerLong: number,
    semiMajorAxis: number,
    semiMinorAxis: number,
    azimuthAngle: number,
    centerLatIdx: number,
    centerLongIdx: number,
    semiMajorAxisIdx: number,
    semiMinorAxisIdx: number,
    azimuthAngleIdx: number,
    specificSettings: number,
    semiMajorAxisX: number,
    semiMinorAxisX: number,
    refinedCenterLatIdx: number,
    refinedCenterLongIdx: number,
    hazardCenterDeltaLatIdx: number,
    hazardCenterDeltaLongIdx: number,
    ellipseCenterShift: number,
    homotheticFactor: number,
    rotationAngle: number,
    secondEllipseGuidanceIdx: number,
    modalOpen: boolean,
    hazardInfo: string,
    // Earthquake
    magnitude: number,
    seismicCoefficient: number,
    azimuthFromCenterToEpicenterIdx: number,
    lengthBetweenCenterAndEpicenterIdx: number,
    azimuthFromCenterToEpicenter: number,
    lengthBetweenCenterAndEpicenter: number,
    // Tsunami
    waveHeight: number,
    // Cold wave
    temperatureRange: number,
    // Hurricane
    hurricaneCategory: number,
    windSpeed: number,
    rainfallAmount: number,
    // Typhoon
    typhoonCategory: number,
    // Tornado
    tornadoProbability: number,
    // Storm or Thurderstorm
    damageCategory: number,
    lightningIntensity: number,
    // Hail
    hailScale: number,
    // Rainfall
    visibility: number,
    // Snow fall
    snowDepth: number,
    // Flood
    floodSeverity: number,
    // Lightning
    // Heatwave
    // Wind chill / Frost
    // Derecho
    // Fog
    fogLevel: number,
    // Storm Storm / Blizzard
    // Drought
    droughtLevel: number,
    // Avalance Risk
    avalanceWarningLevel: number,
    // Tidal wave
    // Ash fall
    ashFallAmount: number,
    // Wind/Wave/Storm Surge
    // Geomagnetic or Solar Storm
    geomagneticScale: number,
    // Terrorism
    terrorismThreatLevel: number,
    // Forest Fire
    fireRiskLevel: number,
    // Risk of Fire
    // Contaminated Drinking Water
    waterQuality: number,
    // UV Radiation
    uvIndex: number,
    // Risk of Infection
    caseNumberPer100000: number,
    infectionType: number,
    // Noise Pollution
    noiseRange: number,
    // Air Pollution
    airQualityIndex: number,
    // Marine Pollution
    // River Pollution
    // Pandemia
    // Gas Supply Outage
    outageEstimatedDuration: number,
    // Outage of IT systems
    // Power Outage
    // Emergency Number Outage
    // Telephone Line Outage
    // Nuclear Power Station Accident
    nuclearEventScale: number,
    // Chemical Hazard
    chemicalHazardType: number,
    // Biological Hazard
    biohazardLevel: number,
    biohazardType: number,
    // Radiological Hazard
    // Nuclear Hazard
    // Explosive Hazard
    explosiveHazardType: number
}


