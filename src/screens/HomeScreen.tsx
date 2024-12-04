import {
  View,
  Text,
  ScrollView,
  Alert,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {StatusBar} from 'expo-status-bar';
import {FontAwesome} from '@expo/vector-icons';
import {debounce} from 'lodash';
import * as Location from 'expo-location';
import {LocationData, WeatherData} from '@/types';
import {
  fetchLocations,
  fetchWeatherByLatLong,
  fetchWeatherForecast,
} from '@/api/weather';
import RenderDay from './RenderDay';
import CurrentWeather from './CurrentWeather';
import LocationsList from './LocationsList';
import SearchBar from './SearchBar';

export default function HomeScreen() {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [locations, setLocations] = useState<LocationData[]>([]);
  const [weather, setWeather] = useState<WeatherData>({});
  const [loading, setLoading] = useState(true);

  const handelLocation = (loc: {name: string}) => {
    console.log(locations);
    setLocations([]);
    setShowSearchBar(false);
    setLoading(true);
    fetchWeatherForecast({
      cityName: loc.name,
    }).then(data => {
      setWeather(data);
      setLoading(false);
      console.log(data);
    });
  };

  const handleSearch = (value: string) => {
    if (value.length > 2) {
      fetchLocations({cityName: value}).then(data => setLocations(data));
    }
  };

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }
      Location.getCurrentPositionAsync({}).then(location => {
        fetchWeatherByLatLong(location.coords).then(data => {
          setWeather(data);
          setLoading(false);
        });
      });
    })();
  };

  const handleDebounce = useCallback(debounce(handleSearch, 500), []);
  const {current, location} = weather;

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <StatusBar style="light" />
        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        ) : (
          <View style={styles.contentContainer}>
            {/* SEARCH BAR SECTION */}
            <View style={styles.searchBarContainer}>
              <SearchBar
                showSearchBar={showSearchBar}
                setShowSearchBar={setShowSearchBar}
                handleDebounce={handleDebounce}
              />
              {locations.length > 0 && showSearchBar ? (
                <LocationsList
                  locations={locations}
                  handleLocation={handelLocation}
                />
              ) : null}
            </View>

            {/* FORECAST SECTION */}
            <View style={styles.forecastContainer}>
              <View style={styles.locationContainer}>
                <Text style={styles.locationName}>{location?.name},</Text>
                <Text style={styles.countryName}>
                  {' ' + location?.country}
                </Text>
              </View>

              {/* CURRENT WEATHER */}
              <CurrentWeather current={current} />

              {/* NEXT DAYS FORECAST */}
              <View style={styles.dailyForecastTitleContainer}>
                <FontAwesome name="calendar" size={30} color="white" />
                <Text style={styles.dailyForecastTitle}>Daily Forecast</Text>
              </View>
              <FlatList
                data={weather?.forecast?.forecastday}
                renderItem={({item}) => <RenderDay item={item} />}
                horizontal
              />
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#64748B',
  },
  container: {
    flex: 1,
    backgroundColor: '#64748B',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  searchBarContainer: {
    marginHorizontal: 16,
    marginTop: 20,
    position: 'relative',
    zIndex: 10,
  },
  forecastContainer: {
    flex: 1,
    justifyContent: 'space-around',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  locationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  countryName: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    textAlign: 'center',
  },
  dailyForecastTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
    marginTop: 24,
  },
  dailyForecastTitle: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
    marginLeft: 12,
  },
});
