
interface PrayerTimes {
  Fajr: string;
  Sunrise: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Imsak: string;
  Midnight: string;
}

interface LocationData {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
}

interface PrayerTimesResponse {
  code: number;
  status: string;
  data: {
    timings: PrayerTimes;
    date: {
      readable: string;
      hijri: {
        date: string;
        day: string;
        month: {
          en: string;
          ar: string;
        };
        year: string;
      };
    };
    meta: {
      latitude: number;
      longitude: number;
      timezone: string;
      method: {
        name: string;
      };
    };
  };
}

export const PRAYER_API_BASE = 'https://api.aladhan.com/v1';
export const LOCATION_API_BASE = 'https://api.bigdatacloud.net/data';

// Get user's current location
export const getCurrentLocation = (): Promise<LocationData> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          console.log('Got location coordinates:', latitude, longitude);
          
          // Get city name from coordinates
          const locationResponse = await fetch(
            `${LOCATION_API_BASE}/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          
          if (locationResponse.ok) {
            const locationData = await locationResponse.json();
            resolve({
              latitude,
              longitude,
              city: locationData.city || 'Unknown',
              country: locationData.countryName || 'Unknown'
            });
          } else {
            resolve({
              latitude,
              longitude,
              city: 'Unknown',
              country: 'Unknown'
            });
          }
        } catch (error) {
          console.error('Error getting location details:', error);
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            city: 'Unknown',
            country: 'Unknown'
          });
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        // Return default location (Mecca)
        resolve({
          latitude: 21.3891,
          longitude: 39.8579,
          city: 'Mecca',
          country: 'Saudi Arabia'
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
};

// Get prayer times for specific location and date
export const fetchPrayerTimes = async (
  latitude: number, 
  longitude: number, 
  date?: string,
  method: number = 2 // ISNA method by default
): Promise<PrayerTimesResponse> => {
  try {
    const dateStr = date || new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD format
    console.log(`Fetching prayer times for ${latitude}, ${longitude} on ${dateStr}`);
    
    const response = await fetch(
      `${PRAYER_API_BASE}/timings/${dateStr}?latitude=${latitude}&longitude=${longitude}&method=${method}`
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch prayer times: ${response.status}`);
    }
    
    const data: PrayerTimesResponse = await response.json();
    console.log('Successfully fetched prayer times');
    return data;
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    throw error;
  }
};

// Get prayer times for current location
export const getCurrentLocationPrayerTimes = async (): Promise<PrayerTimesResponse> => {
  try {
    const location = await getCurrentLocation();
    return await fetchPrayerTimes(location.latitude, location.longitude);
  } catch (error) {
    console.error('Error getting current location prayer times:', error);
    // Return fallback prayer times for Mecca
    return await fetchPrayerTimes(21.3891, 39.8579);
  }
};

// Calculate next prayer time
export const getNextPrayer = (prayerTimes: PrayerTimes): { name: string; time: string } => {
  const now = new Date();
  const currentTime = now.getHours() * 60 + now.getMinutes();
  
  const prayers = [
    { name: 'Fajr', time: prayerTimes.Fajr },
    { name: 'Dhuhr', time: prayerTimes.Dhuhr },
    { name: 'Asr', time: prayerTimes.Asr },
    { name: 'Maghrib', time: prayerTimes.Maghrib },
    { name: 'Isha', time: prayerTimes.Isha }
  ];
  
  for (const prayer of prayers) {
    const [hours, minutes] = prayer.time.split(':').map(Number);
    const prayerTimeInMinutes = hours * 60 + minutes;
    
    if (prayerTimeInMinutes > currentTime) {
      return prayer;
    }
  }
  
  // If no prayer found for today, return Fajr for tomorrow
  return { name: 'Fajr (Tomorrow)', time: prayerTimes.Fajr };
};

// Format prayer time for display
export const formatPrayerTime = (time: string): string => {
  try {
    const [hours, minutes] = time.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  } catch (error) {
    return time; // Return original if formatting fails
  }
};
