/**
 * Integração com API de clima
 * Usa OpenWeatherMap (gratuito até 1000 chamadas/dia)
 * Alternativas: WeatherAPI, AccuWeather, etc.
 */

interface WeatherData {
  temperature: number;
  condition: string;
  city: string;
  icon?: string;
  humidity?: number;
  windSpeed?: number;
}

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutos
let cachedData: { data: WeatherData; timestamp: number } | null = null;

/**
 * Busca dados do clima de Andirá/PR usando OpenWeatherMap
 */
export async function getWeatherData(): Promise<WeatherData | null> {
  // Verifica cache primeiro
  if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
    return cachedData.data;
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  
  if (!apiKey) {
    console.warn('OPENWEATHER_API_KEY não configurada. Usando dados mockados.');
    return getMockWeatherData();
  }

  try {
    // Coordenadas de Andirá, PR
    const lat = -23.0525;
    const lon = -50.2264;
    
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=pt_br`;
    
    const response = await fetch(url, {
      next: { revalidate: 600 }, // Cache de 10 minutos no Next.js
    });

    if (!response.ok) {
      throw new Error(`API retornou status ${response.status}`);
    }

    const data = await response.json();

    const weatherData: WeatherData = {
      temperature: Math.round(data.main.temp),
      condition: translateCondition(data.weather[0].description),
      city: 'Andirá',
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      windSpeed: data.wind?.speed ? Math.round(data.wind.speed * 3.6) : undefined, // Converte m/s para km/h
    };

    // Atualiza cache
    cachedData = {
      data: weatherData,
      timestamp: Date.now(),
    };

    return weatherData;
  } catch (error) {
    console.error('Erro ao buscar dados do clima:', error);
    // Retorna dados mockados em caso de erro
    return getMockWeatherData();
  }
}

/**
 * Traduz condições do clima para português
 */
function translateCondition(condition: string): string {
  const translations: Record<string, string> = {
    'clear sky': 'Céu limpo',
    'few clouds': 'Poucas nuvens',
    'scattered clouds': 'Nuvens dispersas',
    'broken clouds': 'Nuvens quebradas',
    'shower rain': 'Chuva',
    'rain': 'Chuva',
    'thunderstorm': 'Tempestade',
    'snow': 'Neve',
    'mist': 'Neblina',
    'fog': 'Neblina',
    'haze': 'Neblina',
    'overcast clouds': 'Nublado',
  };

  const lowerCondition = condition.toLowerCase();
  return translations[lowerCondition] || condition;
}

/**
 * Retorna dados mockados quando a API não está disponível
 */
function getMockWeatherData(): WeatherData {
  return {
    temperature: 28,
    condition: 'Ensolarado',
    city: 'Andirá',
  };
}

/**
 * Busca dados do clima usando WeatherAPI (alternativa)
 */
export async function getWeatherDataFromWeatherAPI(): Promise<WeatherData | null> {
  const apiKey = process.env.WEATHERAPI_KEY;
  
  if (!apiKey) {
    return null;
  }

  try {
    // Código da cidade de Andirá, PR
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Andira,PR&lang=pt`;
    
    const response = await fetch(url, {
      next: { revalidate: 600 },
    });

    if (!response.ok) {
      throw new Error(`API retornou status ${response.status}`);
    }

    const data = await response.json();

    return {
      temperature: Math.round(data.current.temp_c),
      condition: data.current.condition.text,
      city: 'Andirá',
      humidity: data.current.humidity,
      windSpeed: Math.round(data.current.wind_kph),
    };
  } catch (error) {
    console.error('Erro ao buscar dados do WeatherAPI:', error);
    return null;
  }
}

