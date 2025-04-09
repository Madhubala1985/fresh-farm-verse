
import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Cloud,
  CloudDrizzle,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Loader2,
  Sun,
  Wind,
} from 'lucide-react';
import { Button } from './ui/button';

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
  name: string;
}

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<string>('Delhi'); // Default location

  const fetchWeather = async (loc: string) => {
    setLoading(true);
    setError(null);
    
    // In a real app, you'd use an API key from environment variables
    const apiKey = 'demo_key';
    
    try {
      // In a real implementation, this would be a call to an actual weather API
      // For this demo, we'll simulate a response based on the location
      
      // Simulate API response based on location
      setTimeout(() => {
        const mockWeatherData: WeatherData = {
          main: {
            temp: loc === 'Delhi' ? 32 : loc === 'Mumbai' ? 30 : 28,
            humidity: loc === 'Delhi' ? 60 : loc === 'Mumbai' ? 80 : 65,
            pressure: 1012
          },
          weather: [
            {
              id: loc === 'Delhi' ? 800 : loc === 'Mumbai' ? 500 : 801,
              main: loc === 'Delhi' ? 'Clear' : loc === 'Mumbai' ? 'Rain' : 'Clouds',
              description: loc === 'Delhi' ? 'clear sky' : loc === 'Mumbai' ? 'light rain' : 'few clouds'
            }
          ],
          wind: {
            speed: loc === 'Delhi' ? 2.1 : loc === 'Mumbai' ? 4.2 : 3.1
          },
          name: loc
        };
        
        setWeather(mockWeatherData);
        setLoading(false);
      }, 1000);
      
    } catch (err) {
      setError('Failed to fetch weather data. Please try again later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(location);
  }, [location]);

  const getWeatherIcon = () => {
    if (!weather) return <Cloud className="h-10 w-10" />;
    
    const id = weather.weather[0].id;
    
    if (id >= 200 && id < 300) return <CloudLightning className="h-10 w-10" />;
    if (id >= 300 && id < 500) return <CloudDrizzle className="h-10 w-10" />;
    if (id >= 500 && id < 600) return <CloudRain className="h-10 w-10" />;
    if (id >= 600 && id < 700) return <CloudSnow className="h-10 w-10" />;
    if (id >= 700 && id < 800) return <Wind className="h-10 w-10" />;
    if (id === 800) return <Sun className="h-10 w-10 text-yellow-400" />;
    return <Cloud className="h-10 w-10" />;
  };

  const locations = ['Delhi', 'Mumbai', 'Bangalore', 'Kolkata', 'Chennai'];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Weather Forecast</CardTitle>
        <CardDescription>Real-time weather data for planning farm activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4 overflow-x-auto pb-1 scrollbar-thin">
          {locations.map(loc => (
            <Button
              key={loc}
              variant={location === loc ? "default" : "outline"}
              size="sm"
              onClick={() => setLocation(loc)}
              className="min-w-fit"
            >
              {loc}
            </Button>
          ))}
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-10 w-10 animate-spin text-muted-foreground" />
          </div>
        ) : error ? (
          <div className="text-center text-destructive py-8">{error}</div>
        ) : weather ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col items-center justify-center p-4 bg-muted/50 rounded-lg">
              {getWeatherIcon()}
              <h3 className="text-2xl font-bold mt-2">
                {Math.round(weather.main.temp)}°C
              </h3>
              <p className="capitalize text-muted-foreground">
                {weather.weather[0].description}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {weather.name}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-muted/30 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">Humidity</p>
                <p className="text-lg font-medium">{weather.main.humidity}%</p>
              </div>
              <div className="bg-muted/30 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">Wind</p>
                <p className="text-lg font-medium">{weather.wind.speed} m/s</p>
              </div>
              <div className="bg-muted/30 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">Pressure</p>
                <p className="text-lg font-medium">{weather.main.pressure} hPa</p>
              </div>
              <div className="bg-muted/30 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground">Forecast</p>
                <p className="text-lg font-medium capitalize">{weather.weather[0].main}</p>
              </div>
            </div>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
