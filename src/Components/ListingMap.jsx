import { Circle, MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { cityCoords } from "../data/destinations";

// "Where you'll be" – shows the approximate area (a circle, like Airbnb) rather
// than an exact address, which is only shared after booking.
function ListingMap({ city }) {
  const center = cityCoords[city];

  if (!center) {
    return (
      <div className="mt-6 flex h-[320px] items-center justify-center rounded-[18px] bg-[#eeeeee] text-[#717171]">
        Map not available for this location yet
      </div>
    );
  }

  return (
    <div className="isolate mt-6 h-[320px] overflow-hidden rounded-[18px] sm:h-[400px]">
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        <Circle
          center={center}
          radius={1800}
          pathOptions={{
            color: "#ff385c",
            fillColor: "#ff385c",
            fillOpacity: 0.18,
            weight: 2,
          }}
        />
      </MapContainer>
    </div>
  );
}

export default ListingMap;
