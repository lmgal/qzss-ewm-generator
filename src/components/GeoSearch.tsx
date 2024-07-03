import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch"
import { useEffect } from "react"
import { useMap } from "react-leaflet"

export function GeoSearch() {
    const provider = new OpenStreetMapProvider()
    const map = useMap()
    // @ts-ignore
    const searchControl = new GeoSearchControl({
        provider,
        style: 'bar',
        showMarker: false,
        showPopup: false,
        autoClose: true,
        retainZoomLevel: false,
        animateZoom: true,
        keepResult: true,
        searchLabel: 'Enter address',
    })

    // @ts-ignore
    useEffect(() => {
        map.addControl(searchControl)
        return () => map.removeControl(searchControl)
    }, [])

    return null
}