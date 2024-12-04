import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import weatherSlice from './slices/weatherSlice';
import recentSlice from './slices/recentSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['recentSearches'],
};

const rootReducer = combineReducers({
  weather: weatherSlice,
  recent: persistReducer(persistConfig, recentSlice),
});

export const store = configureStore({
  reducer: rootReducer,
  // To disable "A non-serializable value was detected in an action" warning.
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
