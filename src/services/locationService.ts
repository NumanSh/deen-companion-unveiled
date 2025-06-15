
interface LocationData {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  timezone: string;
}

interface LocationPermission {
  granted: boolean;
  denied: boolean;
  prompt: boolean;
}

class LocationService {
  private currentLocation: LocationData | null = null;
  private locationWatchers: Set<(location: LocationData) => void> = new Set();

  async getCurrentLocation(): Promise<LocationData> {
    if (this.currentLocation) {
      return this.currentLocation;
    }

    try {
      // Try browser geolocation first
      const position = await this.getBrowserLocation();
      const locationData = await this.enrichLocationData(position.coords.latitude, position.coords.longitude);
      this.currentLocation = locationData;
      this.notifyWatchers(locationData);
      return locationData;
    } catch (error) {
      console.log('Browser geolocation failed, trying IP-based location');
      
      // Fallback to IP-based location
      try {
        const ipLocation = await this.getIPLocation();
        this.currentLocation = ipLocation;
        this.notifyWatchers(ipLocation);
        return ipLocation;
      } catch (ipError) {
        console.error('All location methods failed:', ipError);
        throw new Error('Unable to determine location');
      }
    }
  }

  private getBrowserLocation(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        resolve,
        reject,
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  }

  private async getIPLocation(): Promise<LocationData> {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    return {
      latitude: data.latitude,
      longitude: data.longitude,
      city: data.city,
      country: data.country_name,
      timezone: data.timezone
    };
  }

  private async enrichLocationData(lat: number, lon: number): Promise<LocationData> {
    try {
      // Try to get city and country from reverse geocoding
      const response = await fetch(`https://geocode.maps.co/reverse?lat=${lat}&lon=${lon}`);
      const data = await response.json();
      
      return {
        latitude: lat,
        longitude: lon,
        city: data.address?.city || data.address?.town || 'Unknown City',
        country: data.address?.country || 'Unknown Country',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };
    } catch (error) {
      // Fallback to basic location data
      return {
        latitude: lat,
        longitude: lon,
        city: 'Unknown City',
        country: 'Unknown Country',
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };
    }
  }

  async checkLocationPermission(): Promise<LocationPermission> {
    if (!navigator.permissions) {
      return { granted: false, denied: false, prompt: true };
    }

    try {
      const permission = await navigator.permissions.query({ name: 'geolocation' });
      return {
        granted: permission.state === 'granted',
        denied: permission.state === 'denied',
        prompt: permission.state === 'prompt'
      };
    } catch (error) {
      return { granted: false, denied: false, prompt: true };
    }
  }

  subscribeToLocationUpdates(callback: (location: LocationData) => void): () => void {
    this.locationWatchers.add(callback);
    
    // If we already have location, notify immediately
    if (this.currentLocation) {
      callback(this.currentLocation);
    }

    // Return unsubscribe function
    return () => {
      this.locationWatchers.delete(callback);
    };
  }

  private notifyWatchers(location: LocationData): void {
    this.locationWatchers.forEach(callback => callback(location));
  }

  updateLocation(location: LocationData): void {
    this.currentLocation = location;
    this.notifyWatchers(location);
  }

  clearLocationCache(): void {
    this.currentLocation = null;
  }
}

export const locationService = new LocationService();
export type { LocationData, LocationPermission };
