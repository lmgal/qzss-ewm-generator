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
}


