import React, {useEffect} from 'react';
import {Dimensions} from 'react-native';
import {connect} from 'react-redux';
import i18n from 'i18n-js';
import {appStyle} from '../assets/styles/app';
import SafeAreaView from 'react-native-safe-area-view';
import Header from '../components/app/Header';

const HomeScreen = (props) => {
  const {navigation} = props;

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  console.log('--Home--');
  console.log(windowWidth);
  console.log(windowHeight);
  console.log('--------');

  useEffect(() => {
   // TODO
  }, []);

  return (
    <SafeAreaView style={appStyle.panSafeArea} forceInset={{top: 'never'}}>
      <Header content={{
        title: i18n.t('home.header.title'),
        subtitle: i18n.t('home.header.subtitle')
      }} navigation={navigation} />
    </SafeAreaView>
  );
};

export default connect(null)(HomeScreen);
