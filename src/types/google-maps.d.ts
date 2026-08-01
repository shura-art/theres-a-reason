declare namespace google {
  namespace maps {
    class Map {
      constructor(element: Element, options?: MapOptions);
    }
    class Marker {
      constructor(options: MarkerOptions);
    }
    interface MapOptions {
      center?: LatLng;
      zoom?: number;
      [key: string]: unknown;
    }
    interface MarkerOptions {
      position?: LatLng;
      map?: Map | null;
      title?: string;
      [key: string]: unknown;
    }
    interface LatLng {
      lat: number;
      lng: number;
    }
  }
}

interface Window {
  google?: typeof google;
}
