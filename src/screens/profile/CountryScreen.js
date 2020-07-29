import React from 'react';
import {Text, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

const CountryScreen = () => {
  return (
    <SafeAreaView forceInset={{top: 'never'}}>
      <View>
        <Text>Country</Text>
      </View>
    </SafeAreaView>
  );
};

export default CountryScreen;
