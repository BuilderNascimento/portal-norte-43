import { NextResponse } from 'next/server';

import { getWeatherData } from '@/lib/weather';

/**
 * API route para buscar dados do clima
 * Cache de 10 minutos
 * 
 * Query params opcionais:
 * - lat: Latitude
 * - lon: Longitude
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    let weather;
    
    if (lat && lon) {
      // Usa coordenadas fornecidas
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lon);
      
      if (isNaN(latitude) || isNaN(longitude)) {
        return NextResponse.json(
          { error: 'Coordenadas inválidas.' },
          { status: 400 },
        );
      }

      weather = await getWeatherData(latitude, longitude);
    } else {
      // Usa localização padrão (Andirá, PR)
      weather = await getWeatherData();
    }

    if (!weather) {
      return NextResponse.json(
        { error: 'Não foi possível obter dados do clima.' },
        { status: 500 },
      );
    }

    // Cache diferente baseado nas coordenadas
    const cacheControl = lat && lon 
      ? 'public, s-maxage=600, stale-while-revalidate=300' // Cache mais curto para localizações dinâmicas
      : 'public, s-maxage=600'; // Cache padrão para Andirá

    return NextResponse.json(weather, {
      headers: {
        'Cache-Control': cacheControl,
      },
    });
  } catch (error) {
    console.error('Erro na API de clima:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar dados do clima.' },
      { status: 500 },
    );
  }
}

