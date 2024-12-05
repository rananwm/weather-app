import {View, Text, Platform, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {FontAwesome} from '@expo/vector-icons';
import {LocationData} from '@/types';

interface LocationsListProps {
  locations: LocationData[];
  handleLocation: (location: LocationData) => void;
}

const LocationsList: React.FC<LocationsListProps> = ({
  locations,
  handleLocation,
}) => {
  return (
    <View
      style={[
        styles.container,
        Platform.OS === 'android' && styles.androidMargin,
      ]}>
      {locations.map((loc, index) => {
        let showBorder = index + 1 !== locations.length;
        return (
          <TouchableOpacity
            onPress={() => handleLocation(loc)}
            key={index}
            style={[styles.locationItem, showBorder && styles.borderBottom]}>
            <FontAwesome name="map-marker" size={20} color="black" />
            <Text style={styles.locationText}>{loc?.name}</Text>
            <Text style={styles.locationText}>{loc?.country}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    zIndex: 999,
    top: 64, // Adjusted for top spacing (16px)
    backgroundColor: '#CBD5E1', // Slate color
    borderRadius: 24,
  },
  androidMargin: {
    marginTop: 16, // Additional margin for Android
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  borderBottom: {
    borderBottomWidth: 2,
    borderBottomColor: '#D1D5DB', // Light gray border color
  },
  locationText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 8,
  },
});

export default LocationsList;
