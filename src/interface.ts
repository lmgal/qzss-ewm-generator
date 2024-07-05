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
    hazardDay: string,
    hazardHour: string,
    hazardMinute: string,
    hazardIsAM: string,
    hazardIs24HourClock: string,
    hazardUTCTime: string,
    hazardExpectedDuration: string,
    libSelection: string,
    libVersion: string,
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
    specificSettings: string,
    centerLatInt: number,
    centerLongInt: number,
    semiMajorAxisX: number,
    semiMinorAxisX: number,
    refinedCenterLat: number,
    refinedCenterLong: number,
}


