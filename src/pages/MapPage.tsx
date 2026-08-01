import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { openInGoogleMaps, openInGoogleMapsCoords } from '../services/maps';
import { EmptyState } from '../components/EmptyState';

declare global {
  interface Window {
    google?: typeof google;
  }
}

export function MapPage() {
  const { events } = useApp();
  const [selected, setSelected] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const mapRef = useRef<HTMLDivElement>(null);

  const eventsWithLocation = events.filter((e) => e.location);
  const allEvents = events.map((e, i) => ({
    ...e,
    hasLocation: !!e.location,
    top: 20 + (i % 3) * 25 + Math.random() * 10,
    left: 15 + (i % 4) * 22 + Math.random() * 10,
  }));

  const selectedEvent = selected !== null ? allEvents[selected] : null;

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    if (apiKey && window.google?.maps && mapRef.current) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 53.9023, lng: 27.5619 },
        zoom: 12,
      });
      eventsWithLocation.forEach((e) => {
        if (!e.location) return;
        new window.google.maps.Marker({
          position: { lat: e.location.lat, lng: e.location.lng },
          map,
          title: e.title,
        });
      });
    }
  }, [eventsWithLocation.length]);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const hasRealMap = !!apiKey && !!window.google?.maps;

  return (
    <main className="page">
      <header className="simple-head">
        <span>WHERE TO MEET</span>
        <h1>Map</h1>
        <p>Pins show where your reasons are happening. Tap to open in Google Maps.</p>
      </header>

      <div className="map-container">
        {hasRealMap ? (
          <div ref={mapRef} style={{ width: '100%', height: '300px' }} />
        ) : (
          <div className="map-surface">
            <input
              className="map-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="⌕ Where are we meeting?"
              aria-label="Search location"
            />
            {allEvents.slice(0, 6).map((e, i) => (
              <div
                key={e.id}
                className={`map-pin p${(i % 3) + 1}`}
                onClick={() => setSelected(i)}
                style={{ top: `${e.top}%`, left: `${e.left}%` }}
                aria-label={`Pin for ${e.title}`}
                role="button"
                tabIndex={0}
                onKeyDown={(e2) => {
                  if (e2.key === 'Enter') setSelected(i);
                }}
              >
                📍
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedEvent && (
        <div className="map-pop">
          <b>{selectedEvent.title}</b>
          <small>
            {selectedEvent.place}
            {selectedEvent.date} · {selectedEvent.time}
          </small>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              if (selectedEvent.location) {
                openInGoogleMapsCoords(
                  selectedEvent.location.lat,
                  selectedEvent.location.lng,
                  selectedEvent.location.label
                );
              } else {
                openInGoogleMaps(selectedEvent.place);
              }
            }}
          >
            Open in Google Maps
          </a>
        </div>
      )}

      {!hasRealMap && (
        <div className="list">
          {eventsWithLocation.map((e) => (
            <button
              className="list-row"
              key={e.id}
              onClick={() => {
                if (e.location) {
                  openInGoogleMapsCoords(e.location.lat, e.location.lng, e.location.label);
                } else {
                  openInGoogleMaps(e.place);
                }
              }}
            >
              <span>{events.indexOf(e) === selected ? '📍' : '📍'}</span>
              <div>
                <b>{e.title}</b>
                <small>{e.place}</small>
              </div>
              <i>›</i>
            </button>
          ))}
        </div>
      )}

      {eventsWithLocation.length === 0 && (
        <EmptyState icon="🗺️" title="No locations pinned yet" subtitle="Add a location when creating a reason" />
      )}
    </main>
  );
}
