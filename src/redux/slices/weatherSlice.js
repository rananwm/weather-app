import axios from 'axios';
// import Geolocation from 'react-native-geolocation-service';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// import RNBootSplash from 'react-native-bootsplash';
import {API_ID} from '../../constants/constants';
// import { showError } from '@app/constants';
import {addRecentSearch} from './recentSlice';

const initialState = {
  cityAPIResponse: {},
  latAPIResponse: {},
  currentLocation: '',
  fetching: true,
  error: null,
};

// Function to call api. Used in various screens.
export const getCurrentWeather = createAsyncThunk(
  'get/currentWeather',
  // {dispatch} comes from thunkAPI object.
  async ({cityName}, {dispatch, getState}) => {
    try {
      const state = getState();
      const baseURL = 'https://api.openweathermap.org/data/2.5';

      const cityAPIResponse = await axios.get(
        `${baseURL}/forecast?q=${cityName}&units=metric&appid=${API_ID}`,
      );

      cityAPIResponse?.status === 200 &&
      cityAPIResponse?.data?.city?.name.toLowerCase() !=
        state.weather.currentLocation.toLowerCase()
        ? dispatch(addRecentSearch(cityAPIResponse?.data?.city?.name))
        : null;

      const lat = cityAPIResponse?.data?.city?.coord?.lat || 0;
      const lon = cityAPIResponse?.data?.city?.coord?.lon || 0;

      const latAPIResponse = await axios.get(
        `${baseURL}/onecall?lat=${lat}&lon=${lon}&appid=${API_ID}&units=metric`,
      );

      dispatch(updateCityData(cityAPIResponse?.data || {}));
      dispatch(updateLatData(latAPIResponse?.data || {}));

      // RNBootSplash.hide();
    } catch (err) {
      dispatch(updateError(err?.response?.data || 'Error'));
    }
  },
);

export const getDeviceCity = createAsyncThunk(
  'get/deviceCity',
  async (_, {dispatch}) => {
    const baseURL = 'https://api.openweathermap.org/data/2.5';

    // Geolocation.getCurrentPosition(
    //   async position => {
    //     const { latitude, longitude } = position.coords;

    //     try {
    //       const response = await axios.get(
    //         `${baseURL}/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_ID}`,
    //       );

    //       dispatch(updateCurrentLocation(response?.data?.name));
    //       dispatch(getCurrentWeather({ cityName: response?.data?.name }));
    //     } catch (err) {
    //       // RNBootSplash.hide();

    //       // This shows toast for api call error.
    //       dispatch(updateError(err?.response?.data || 'Current City Error'));
    //     }
    //   },
    //   // This is alert for permission error.
    //   error => {
    //     // RNBootSplash.hide();
    //     // showError({ cod: 403, message: error.message });
    //     dispatch(getCurrentWeather({ cityName: 'London' }));
    //   },
    // );
  },
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    updateCityData(state, action) {
      state.cityAPIResponse = action?.payload;
    },
    updateLatData(state, action) {
      state.latAPIResponse = action?.payload;
    },
    updateError(state, action) {
      state.error = action?.payload;
    },
    updateCurrentLocation(state, action) {
      state.currentLocation = action?.payload;
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
        state.error = action;
      })
      .addCase(getDeviceCity.pending, state => {
        state.fetching = true;
        state.error = null;
      })
      .addCase(getDeviceCity.fulfilled, state => {
        state.fetching = false;
        state.error = null;
      })
      .addCase(getDeviceCity.rejected, (state, action) => {
        state.fetching = false;
        state.error = action;
      });
  },
});

// Exporting reducer from slice to use it in above getCurrentWeather function.
export const {
  updateCityData,
  updateLatData,
  updateError,
  updateCurrentLocation,
} = weatherSlice.actions;

export default weatherSlice.reducer;
