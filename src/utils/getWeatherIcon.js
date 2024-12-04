import {weatherAnimations} from '@/constants/weatherAnimations';
export const getWeatherIcon = icon => {
  switch (icon) {
    case '01d':
      return weatherAnimations.Sunny;
    case '01n':
      return weatherAnimations.ClearNight;
    case '02d':
      return weatherAnimations?.PartialySunny;
    case '02n':
      return weatherAnimations?.PartialyCloudyNight;
    case '03d':
      return weatherAnimations?.PartialySunny;
    case '03n':
      return weatherAnimations?.PartialyCloudyNight;
    case '04d':
      return weatherAnimations?.PartialySunny;
    case '04n':
      return weatherAnimations?.PartialyCloudyNight;
    case '09d':
      return weatherAnimations.Drizzle;
    case '09n':
      return weatherAnimations.Drizzle;
    case '10d':
      return weatherAnimations.Drizzle;
    case '10n':
      return weatherAnimations.Drizzle;
    case '11d':
      return weatherAnimations.ThunderStorm;
    case '11n':
      return weatherAnimations.ThunderStorm;
    case '13d':
      return weatherAnimations.Snow;
    case '13n':
      return weatherAnimations.Snow;
    case '50d':
      return weatherAnimations.Mist;
    case '50n':
      return weatherAnimations.Mist;

    default:
      break;
  }
};
