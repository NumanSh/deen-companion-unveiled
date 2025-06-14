
import React from "react";

// Maps weather code or condition to GIF URLs (using public GIFs for demo)
const weatherGifMap: Record<string, string> = {
  rain: "https://media.giphy.com/media/26uf9QPzzlKPvQG5K/giphy.gif",
  drizzle: "https://media.giphy.com/media/3o7TKRW9E5cOBERpxe/giphy.gif",
  thunderstorm: "https://media.giphy.com/media/10dU7AN7xsi1I4/giphy.gif",
  snow: "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif",
  cloudy: "https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif",
  clear: "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
  fog: "https://media.giphy.com/media/3o6Zt6ML6BklcajjsA/giphy.gif",
  // fallback gif for unknown
  unknown: "https://media.giphy.com/media/wpoLqr5FT1sY0/giphy.gif",
};

// Open-Meteo simplified weather code mapping
function mapWeatherCodeToType(code: number): string {
  if ([61, 63, 65, 80, 81, 82].includes(code)) return "rain";
  if ([51, 53, 55, 56, 57].includes(code)) return "drizzle";
  if ([95, 96, 99].includes(code)) return "thunderstorm";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";
  if ([45, 48].includes(code)) return "fog";
  if ([1, 2, 3].includes(code)) return "cloudy";
  if (code === 0) return "clear";
  return "unknown";
}

type WeatherGifProps = {
  code: number | null;
};

const WeatherGif: React.FC<WeatherGifProps> = ({ code }) => {
  const type = code === null ? "unknown" : mapWeatherCodeToType(code);
  const src = weatherGifMap[type] || weatherGifMap.unknown;
  const alt = `${type} weather gif`;
  return (
    <img
      src={src}
      alt={alt}
      className="w-32 h-32 rounded-lg object-cover mx-auto shadow-md border"
    />
  );
};

export default WeatherGif;
