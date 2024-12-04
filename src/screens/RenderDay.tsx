import {Image, Text, View, StyleSheet} from 'react-native';
import removeStartingDoubleSlash from '@/helpers/removeStartingDoubleSlash';
import {ForecastDay} from '@/types/WeatherData';

type RenderImageProp = {
  item: ForecastDay;
};

const RenderImage: React.FC<RenderImageProp> = ({item}) => {
  console.log('Image: ', item?.day?.condition?.text);

  let date = new Date(item.date);
  let options: Intl.DateTimeFormatOptions = {weekday: 'long'};
  let dayName = date.toLocaleDateString('en-US', options);

  return (
    <View key={'' + item?.date_epoch} style={styles.container}>
      <Text style={styles.dayName}>{dayName}</Text>
      <Image
        source={{
          uri:
            'https://' +
            removeStartingDoubleSlash(item?.day?.condition?.icon || ''),
        }}
        style={styles.image}
      />
      <Text style={styles.conditionText}>
        {item?.day?.condition?.text ? `(${item?.day?.condition?.text})` : ''}
      </Text>
      <Text style={styles.tempText}>{item?.day?.avgtemp_c}&#176;</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 128, // 32 * 4 for more consistency
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginLeft: 12,
    backgroundColor: '#4B5563', // Slate color
  },
  dayName: {
    color: '#CBD5E1', // Light slate color
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 4,
  },
  image: {
    width: 80, // 20 * 4 for more consistent design
    height: 80, // 20 * 4
    alignSelf: 'center',
  },
  conditionText: {
    color: '#CBD5E1', // Light slate color
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 4,
  },
  tempText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default RenderImage;
