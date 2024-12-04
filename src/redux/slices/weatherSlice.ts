import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {
  fetchWeatherForecast,
  fetchWeatherByLatLong,
  fetchLocations,
  getWeatherAndForecast,
} from '@/api/weather'; // Import new API functions

interface WeatherState {
  currentCoordinates: {latitude: number; longitude: number} | null;
  currentWeather: any;
  currentForecast: any;
  fetching: boolean;
  error: string | null;
}
interface LocationParams {
  latitude?: number;
  longitude?: number;
}
const initialState: WeatherState = {
  currentCoordinates: null,
  currentWeather: null,
  currentForecast: null,
  fetching: false,
  error: null,
};

// Thunks
export const getCurrentWeather = createAsyncThunk(
  'weather/getCurrentWeather',
  async ({params}: {params: LocationParams}, {dispatch, getState}) => {
    try {
      console.log('CALLED', params);
      // Fetch the current weather by latitude and longitude
      const weatherResponse = await getWeatherAndForecast({
        latitude: params.latitude,
        longitude: params.longitude,
      });
      // Store coordinates and weather data
      dispatch(
        updateCoordinates({
          latitude: params.latitude,
          longitude: params.longitude,
        }),
      );
      console.log('weatherResponse', weatherResponse);
      dispatch(updateCurrentWeather(weatherResponse.weather || {}));
      dispatch(updateCurrentForecast(weatherResponse.forecast || {}));
    } catch (err) {
      dispatch(updateError(err?.response?.data || 'Error fetching weather'));
    }
  },
);

// Reducers
const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    updateCoordinates(state, action) {
      state.currentCoordinates = action.payload;
    },
    updateCurrentWeather(state, action) {
      state.currentWeather = action.payload;
    },
    updateError(state, action) {
      state.error = action.payload;
    },
    updateCurrentForecast(state, action) {
      state.currentForecast = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getCurrentWeather.pending, state => {
        state.fetching = true;
        state.error = null;
      })
      .addCase(getCurrentWeather.fulfilled, state => {
        state.fetching = false;
        state.error = null;
      })
      .addCase(getCurrentWeather.rejected, (state, action) => {
        state.fetching = false;
        state.error = action.payload;
      });
  },
});

// Export actions
export const {
  updateCoordinates,
  updateCurrentWeather,
  updateError,
  updateCurrentForecast,
} = weatherSlice.actions;

export default weatherSlice.reducer;