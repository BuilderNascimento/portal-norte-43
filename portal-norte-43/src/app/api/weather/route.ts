import { NextResponse } from 'next/server';

import { getWeatherData } from '@/lib/weather';

/**
 * API route para buscar dados do clima
 * Cache de 10 minutos
 */
export async function GET() {
  try {
    const weather = await getWeatherData();

    if (!weather) {
      return NextResponse.json(
        { error: 'Não foi possível obter dados do clima.' },
        { status: 500 },
      );
    }

    return NextResponse.json(weather, {
      headers: {
        'Cache-Control': 'public, s-maxage=600', // 10 minutos
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

