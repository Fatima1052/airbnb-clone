import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { FiX } from "react-icons/fi";

import { cityCoords } from "../data/destinations";
import { parsePrice } from "../data/catalog";

// Listings only have a city today, so each pin is placed near the city centre
// with a small stable offset (same listing = same spot every time) so pins
// don't sit on top of each other. Replace with real lat/lng from the backend.
export function pinPosition(listing) {
  const center = cityCoords[listing.location];
  if (!center) return null;

  const seed = Number(listing.id) || 1;
  const dx = (Math.sin(seed * 12.9898) * 43758.5453) % 1;
  const dy = (Math.sin(seed * 78.233) * 12345.6789) % 1;

  return [center[0] + dy * 0.035, center[1] + dx * 0.035];
}

const priceIcon = (label, active) =>
  L.divIcon({
    className: "price-pin-wrapper",
    html: `<div class="price-pin${active ? " active" : ""}">${label}</div>`,
    iconSize: [0, 0],
  });

function FitToPins({ points }) {
  const map = useMap();

  useEffect(() => {
    if (points.length === 0) return;

    if (points.length === 1) {
      map.setView(points[0], 12);
      return;
    }

    map.fitBounds(L.latLngBounds(points), { padding: [50, 50], maxZoom: 13 });
  }, [map, points]);

  return null;
}

// Map with a price pin for every listing. Hovering a card highlights its pin,
// clicking a pin opens a small preview card.
function SearchMap({ listings, hoveredId }) {
  const [selectedId, setSelectedId] = useState(null);

  const pins = useMemo(
    () =>
      listings
        .map((listing) => ({ listing, position: pinPosition(listing) }))
        .filter((pin) => pin.position),
    [listings]
  );

  const points = useMemo(() => pins.map((pin) => pin.position), [pins]);

  const selected = pins.find((pin) => pin.listing.id === selectedId)?.listing;

  return (
    <div className="relative isolate h-full w-full">
      <MapContainer
        center={[30.3753, 69.3451]}
        zoom={5}
        minZoom={3}
        scrollWheelZoom
        className="h-full w-full"
        zoomControl
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        <FitToPins points={points} />

        {pins.map(({ listing, position }) => (
          <Marker
            key={listing.id}
            position={position}
            icon={priceIcon(
              `$${parsePrice(listing.price)}`,
              listing.id === hoveredId || listing.id === selectedId
            )}
            eventHandlers={{ click: () => setSelectedId(listing.id) }}
          />
        ))}
      </MapContainer>

      {selected && (
        <div className="absolute bottom-6 left-1/2 z-[1100] w-[calc(100%-32px)] max-w-[300px] -translate-x-1/2 overflow-hidden rounded-[16px] bg-white shadow-[0_8px_28px_rgba(0,0,0,0.25)]">
          <button
            type="button"
            aria-label="Close preview"
            onClick={() => setSelectedId(null)}
            className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow"
          >
            <FiX size={16} />
          </button>

          <Link to={`/listing/${selected.id}`} className="block">
            <img
              src={selected.image}
              alt={selected.title}
              className="h-[150px] w-full object-cover"
            />

            <div className="p-3">
              <div className="flex items-start justify-between gap-2">
                <p className="text-[15px] font-semibold">{selected.title}</p>
                <p className="shrink-0 text-[14px]">★ {selected.rating}</p>
              </div>

              <p className="text-[14px] text-[#717171]">{selected.location}</p>
              <p className="mt-1 text-[14px] font-semibold">{selected.price}</p>
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default SearchMap;
