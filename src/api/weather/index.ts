import axios, {AxiosRequestConfig} from 'axios';

interface Params {
  cityName?: string;
  days?: number;
  latitude?: number;
  longitude?: number;
}

const apiKey = '410127e8ad28e3071c43270b2b6492de';

const forecastEndpoint = (params: Params): string =>
  `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.cityName}&days=7&aqi=yes&alerts=yes`;

const locationsEndpoint = (params: Params): string =>
  `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}`;

const forecastLatLongpoint = (params: Params): string =>
  `https://api.openweathermap.org/data/2.5/weather?lat=${params.latitude}&lon=${params.longitude}&appid=${apiKey}`;

const apiCall = async <T>(endpoint: string): Promise<T> => {
  console.log(endpoint);
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: endpoint,
  };

  try {
    const response = await axios.request<T>(options);
    console.log('DATA', response?.data);
    return response.data;
  } catch (error) {
    console.log('error: ', error.response.data);
    return {} as T;
  }
};

export const fetchWeatherForecast = (params: Params) => {
  let forecastUrl = forecastEndpoint(params);
  return apiCall<any>(forecastUrl); // Since the response structure isn't defined, using 'any' here
};

export const fetchWeatherByLatLong = (params: Params) => {
  let forecastUrl = forecastLatLongpoint(params);
  return apiCall<any>(forecastUrl);
};

export const fetchLocations = (params: Params) => {
  let locationsUrl = locationsEndpoint(params);
  return apiCall<any>(locationsUrl); // Using 'any' due to undefined response structure
};
