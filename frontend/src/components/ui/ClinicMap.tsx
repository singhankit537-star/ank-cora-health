import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const US_CENTER = [39.5, -98.35]
const US_ZOOM = 4

// Brand-colored circular pin built from inline styles (no image assets needed).
function pinIcon(color) {
  return L.divIcon({
    className: 'clinic-pin',
    html: `<span style="display:block;width:18px;height:18px;border-radius:9999px;background:${color};border:3px solid #fff;box-shadow:0 1px 5px rgba(0,0,0,.45)"></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -10],
  })
}

/**
 * Interactive Leaflet map that plots a marker for every clinic passed in and
 * fits the view to them. When `highlight` is true (a state filter is active)
 * the markers render in the brand orange so the filtered results stand out.
 */
export default function ClinicMap({ clinics = [], highlight = false }) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const layerRef = useRef(null)

  // initialise the map once
  useEffect(() => {
    if (mapRef.current) return
    const map = L.map(containerRef.current, {
      scrollWheelZoom: false,
    }).setView(US_CENTER, US_ZOOM)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 19,
    }).addTo(map)

    layerRef.current = L.layerGroup().addTo(map)
    mapRef.current = map

    return () => {
      map.remove()
      mapRef.current = null
      layerRef.current = null
    }
  }, [])

  // re-plot markers whenever the filtered clinics (or highlight) change
  useEffect(() => {
    const map = mapRef.current
    const layer = layerRef.current
    if (!map || !layer) return

    layer.clearLayers()
    const points = clinics.filter((c) => c.lat != null && c.lng != null)
    const icon = pinIcon(highlight ? '#f57c00' : '#0072bc')

    const markers = points.map((c) => {
      const marker = L.marker([c.lat, c.lng], { icon }).bindPopup(
        `<strong style="color:#0c3d6e">CORA ${c.city}</strong><br/>${c.address.join('<br/>')}<br/><a href="tel:${c.phone.replace(/[^\d]/g, '')}">${c.phone}</a>`,
      )
      layer.addLayer(marker)
      return marker
    })

    if (markers.length === 1) {
      map.setView([points[0].lat, points[0].lng], 11)
    } else if (markers.length > 1) {
      map.fitBounds(L.featureGroup(markers).getBounds().pad(0.25))
    } else {
      map.setView(US_CENTER, US_ZOOM)
    }
  }, [clinics, highlight])

  return (
    <div
      ref={containerRef}
      className="h-[320px] w-full sm:h-[420px]"
      aria-label="Map of clinic locations"
    />
  )
}
