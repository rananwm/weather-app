import {StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import SearchBar from './SearchBar';
import LocationsList from './LocationsList';
import {LocationData} from '@/types';
import {debounce} from 'lodash';
import {fetchLocations} from '@/api/weather';
import {useDispatch} from 'react-redux';
import {getCurrentWeather} from '@/redux/slices/weatherSlice';

const Header = () => {
  const dispatch = useDispatch();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [locations, setLocations] = useState<LocationData[]>([]);

  const handleSearch = (value: string) => {
    if (value.length > 2) {
      fetchLocations({cityName: value}).then(data => setLocations(data));
    }
  };

  const handleDebounce = useCallback(debounce(handleSearch, 500), []);
  const handelLocation = (loc: {lat: string; long: string}) => {
    console.log(locations);
    setLocations([]);
    setShowSearchBar(false);

    dispatch(
      getCurrentWeather({
        params: {
          latitude: loc.lat,
          longitude: loc.lon,
        },
      }),
    );
  };

  return (
    <View style={styles.searchBarContainer}>
      <SearchBar
        showSearchBar={showSearchBar}
        setShowSearchBar={setShowSearchBar}
        handleDebounce={handleDebounce}
      />
      {locations.length > 0 && showSearchBar ? (
        <LocationsList locations={locations} handleLocation={handelLocation} />
      ) : null}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  searchBarContainer: {
    marginHorizontal: 12,
    // marginTop: 20,
    position: 'relative',
    zIndex: 10,
  },
});
