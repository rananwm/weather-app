import {
  View,
  TextInput,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';
import React, {Dispatch, SetStateAction} from 'react';
import {FontAwesome5} from '@expo/vector-icons';

interface SearchBarProps {
  showSearchBar: boolean;
  setShowSearchBar: Dispatch<SetStateAction<boolean>>;
  handleDebounce: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  showSearchBar,
  setShowSearchBar,
  handleDebounce,
}) => {
  return (
    <View
      style={[
        styles.container,
        Platform.OS === 'android' && styles.androidMargin,
        showSearchBar && styles.activeSearchBar,
      ]}>
      {showSearchBar ? (
        <TextInput
          onChangeText={handleDebounce}
          placeholder="Search City"
          placeholderTextColor="white"
          style={styles.input}
        />
      ) : null}

      <TouchableOpacity
        onPress={() => setShowSearchBar(!showSearchBar)}
        style={styles.searchButton}>
        <FontAwesome5 name="search-location" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 50,
  },
  androidMargin: {
    marginTop: 16,
  },
  activeSearchBar: {
    backgroundColor: 'rgba(255,255,255,0.1)', // Slate color
  },
  input: {
    height: 48,
    paddingLeft: 16,
    fontSize: 18,

    flex: 1,
    color: 'white',
  },
  searchButton: {
    padding: 12,
    borderRadius: 50,
    margin: 4,
    backgroundColor: 'rgba(255,255,255,0.1)', // Slate color
  },
});

export default SearchBar;
