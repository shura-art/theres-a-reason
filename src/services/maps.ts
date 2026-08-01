let mapsLoaded = false;
let mapsPromise: Promise<typeof google> | null = null;

export function loadGoogleMaps(apiKey: string): Promise<typeof google> {
  if (mapsLoaded && window.google?.maps) {
    return Promise.resolve(window.google);
  }
  if (mapsPromise) return mapsPromise;

  mapsPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      mapsLoaded = true;
      resolve(window.google);
    };
    script.onerror = () => reject(new Error('Failed to load Google Maps'));
    document.head.appendChild(script);
  });

  return mapsPromise;
}

export function openInGoogleMaps(query: string): void {
  window.open(
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
    '_blank',
    'noopener,noreferrer'
  );
}

export function openInGoogleMapsCoords(lat: number, lng: number, label?: string): void {
  const query = label ? `${label}@${lat},${lng}` : `${lat},${lng}`;
  window.open(
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
    '_blank',
    'noopener,noreferrer'
  );
}
