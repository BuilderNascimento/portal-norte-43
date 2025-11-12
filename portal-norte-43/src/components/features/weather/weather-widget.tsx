'use client';

import { useCallback, useEffect, useState } from 'react';

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
  const [locationRequested, setLocationRequested] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const requestLocation = useCallback(() => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      console.log('Geolocalização não suportada');
      setLocationError('Geolocalização não suportada pelo navegador');
      setLocationRequested(true);
      return;
    }

    console.log('🌍 Solicitando localização do usuário...');
    setLocationRequested(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        console.log('✅ Localização obtida:', lat, lon);
        setLocation({ lat, lon });
        setLocationError(null);
      },
      (error) => {
        console.warn('⚠️ Localização não disponível:', error.code, error.message);
        let errorMsg = 'Localização não disponível';
        if (error.code === 1) {
          errorMsg = 'Permissão negada';
        } else if (error.code === 2) {
          errorMsg = 'Localização indisponível';
        } else if (error.code === 3) {
          errorMsg = 'Timeout';
        }
        setLocationError(errorMsg);
        setLocation(null);
      },
      {
        enableHighAccuracy: false,
        timeout: 15000,
        maximumAge: 0,
      },
    );
  }, []);

  useEffect(() => {
    // Tenta obter localização automaticamente na primeira vez
    requestLocation();
  }, [requestLocation]);

  useEffect(() => {
    // Só busca clima quando a solicitação de localização foi concluída
    if (!locationRequested) return;

    let cancelled = false;

    async function fetchWeather() {
      try {
        // Monta URL com coordenadas se disponíveis
        let url = '/api/weather';
        if (location) {
          // Arredonda coordenadas para evitar cache desnecessário
          const lat = Number(location.lat.toFixed(4));
          const lon = Number(location.lon.toFixed(4));
          url += `?lat=${lat}&lon=${lon}&_=${Date.now()}`; // Timestamp para evitar cache do navegador
          console.log('🌍 Buscando clima para coordenadas:', lat, lon);
        } else {
          console.log('📍 Usando localização padrão (Andirá, PR)');
        }

        // Busca dados da API
        const response = await fetch(url, {
          cache: 'no-store', // Não usar cache do navegador
        });

        if (cancelled) return;

        if (response.ok) {
          const data = await response.json();
          console.log('✅ Dados do clima recebidos:', data);
          setWeather(data);
        } else {
          const errorData = await response.json().catch(() => ({}));
          console.error('❌ Erro na resposta:', response.status, errorData);
          // Fallback para dados mockados
          setWeather({
            temperature: 28,
            condition: 'Ensolarado',
            city: location ? 'Sua localização' : 'Andirá',
          });
        }
      } catch (error) {
        if (cancelled) return;
        console.error('❌ Erro ao carregar clima:', error);
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

    // Aguarda um pouco para garantir que a localização foi processada
    const timer = setTimeout(fetchWeather, 500);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [location, locationRequested]);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <div className="h-3 w-3 animate-pulse rounded-full bg-slate-300" />
        <span>Carregando...</span>
      </div>
    );
  }

  if (!weather) {
    // Se houve erro de localização, mostra botão para tentar novamente
    if (locationError && locationError !== 'Localização não disponível') {
      return (
        <button
          onClick={requestLocation}
          className="flex items-center gap-1 text-xs text-slate-500 hover:text-red-600 transition-colors"
          title="Clique para usar sua localização"
        >
          <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="hidden sm:inline">Usar localização</span>
        </button>
      );
    }
    return null;
  }

  return (
    <div className="flex items-center gap-2 text-xs text-slate-600">
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
      <span className="text-slate-400">•</span>
      <span className="hidden sm:inline">{weather.condition}</span>
      <span className="text-slate-400 hidden sm:inline">•</span>
      <span className="hidden md:inline font-semibold">{weather.city}</span>
    </div>
  );
}
