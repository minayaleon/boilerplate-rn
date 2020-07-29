import React from 'react';
import {Image, View} from 'react-native';
import {Title} from 'react-native-paper';
import {appStyle} from '../../assets/styles/app';
import {useTheme} from 'react-native-paper';

const Logo = () => {
  const {dark} = useTheme();
  const logoPath = !dark
    ? require('../../assets/images/logo/light/logo.png')
    : require('../../assets/images/logo/dark/logo.png');

  return (
    <View style={appStyle.panLogo}>
      <Image
        source={logoPath}
        style={appStyle.imgLogo}
      />
      <Title style={appStyle.txtLogo}>React Native</Title>
    </View>
  );
};

export default Logo;
