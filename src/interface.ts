export interface IFormInput {
    type: string,
    country: string,
    providers: Array<{
        name: string
    }>,
    providerId: string,
    providerCountry: string,
    hazardTypeCategory: string,
    hazardSeverity: string,
    hazardWeek: string,
    hazardUTCTime: string,
    hazardExpectedDuration: string,
    libSelection: string,
    libVersion: string,
    listAGeneralAction: string,
    listBMonitorAction: string,
    centerLat: string,
    cenerLong: string,
    semiMajorAxis: string,
    semiMinorAxis: string,
    azimuthAngle: string,
    specificSettings: string,
}


