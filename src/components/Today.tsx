import {ScrollView} from 'react-native';
import React from 'react';
import PrimaryWidget from '@/components/PrimaryWidget';
import SecondaryWidget from '@/components/SecondaryWidget';
import ForeCastFeed from '@/components/ForeCastFeed';

const Today = () => {
  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: 65}}
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        marginBottom: 20,
        marginTop: 10,
        backgroundColor: 'transparent',
      }}>
      <PrimaryWidget />
      <SecondaryWidget />
      <ForeCastFeed />
    </ScrollView>
  );
};

export default Today;
