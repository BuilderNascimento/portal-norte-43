'use client';

import { useEffect, useState } from 'react';

interface WeatherData {
  temperature: number;
  condition: string;
  city: string;
  icon?: string;
  humidity?: number;
  windSpeed?: number;
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);

  useEffect(() => {
    // Tenta obter localização do usuário
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Localização obtida:', position.coords.latitude, position.coords.longitude);
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (error) => {
          console.log('Localização não disponível:', error.message);
          // Continua sem localização (usará padrão Andirá)
          setLocation(null);
        },
        {
          enableHighAccuracy: false,
          timeout: 10000, // Aumentado para 10 segundos
          maximumAge: 0, // Sempre busca localização atual
        },
      );
    } else {
      console.log('Geolocalização não suportada pelo navegador');
      setLocation(null);
    }
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function fetchWeather() {
      try {
        // Monta URL com coordenadas se disponíveis
        let url = '/api/weather';
        if (location) {
          url += `?lat=${location.lat}&lon=${location.lon}&t=${Date.now()}`; // Adiciona timestamp para evitar cache
          console.log('Buscando clima para:', location.lat, location.lon);
        } else {
          console.log('Usando localização padrão (Andirá)');
        }

        // Busca dados da API
        const response = await fetch(url, {
          cache: 'no-store', // Não usar cache do navegador
        });

        if (cancelled) return;

        if (response.ok) {
          const data = await response.json();
          console.log('Dados do clima recebidos:', data);
          setWeather(data);
        } else {
          const errorData = await response.json().catch(() => ({}));
          console.error('Erro na resposta:', response.status, errorData);
          // Fallback para dados mockados
          setWeather({
            temperature: 28,
            condition: 'Ensolarado',
            city: location ? 'Sua localização' : 'Andirá',
          });
        }
      } catch (error) {
        if (cancelled) return;
        console.error('Erro ao carregar clima:', error);
        // Fallback para dados mockados
        setWeather({
          temperature: 28,
          condition: 'Ensolarado',
          city: location ? 'Sua localização' : 'Andirá',
        });
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    // Aguarda um pouco para obter localização, ou busca imediatamente se já tiver
    const timer = setTimeout(fetchWeather, location !== null ? 0 : 2000);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [location]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
        <div className="h-3 w-3 animate-pulse rounded-full bg-slate-300 dark:bg-slate-600" />
        <span>Carregando...</span>
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
      {weather.icon ? (
        <img
          src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt={weather.condition}
          className="h-5 w-5"
        />
      ) : (
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
        </svg>
      )}
      <span className="font-medium">{weather.temperature}°C</span>
      <span className="text-slate-400 dark:text-slate-500">•</span>
      <span className="hidden sm:inline">{weather.condition}</span>
      <span className="text-slate-400 dark:text-slate-500 hidden sm:inline">•</span>
      <span className="hidden md:inline">{weather.city}</span>
    </div>
  );
}
