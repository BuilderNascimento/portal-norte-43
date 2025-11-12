'use client';

import { useEffect, useState } from 'react';

interface WeatherData {
  temperature: number;
  condition: string;
  city: string;
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Por enquanto, mostra dados mockados
    // Futuramente pode integrar com API de clima (OpenWeatherMap, etc)
    const mockWeather: WeatherData = {
      temperature: 28,
      condition: 'Ensolarado',
      city: 'Andirá',
    };

    setTimeout(() => {
      setWeather(mockWeather);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <div className="h-3 w-3 animate-pulse rounded-full bg-slate-300" />
        <span>Carregando...</span>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
      <span className="font-medium">{weather.temperature}°C</span>
      <span className="text-slate-400 dark:text-slate-500">•</span>
      <span>{weather.condition}</span>
      <span className="text-slate-400 dark:text-slate-500">•</span>
      <span>{weather.city}</span>
    </div>
  );
}

