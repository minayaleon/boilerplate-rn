import React, {useEffect} from 'react';
import {Dimensions} from 'react-native';
import {connect} from 'react-redux';
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
  // console.log('JaJaJa');

  useEffect(() => {
   // TODO
  }, []);

  return (
    <SafeAreaView style={appStyle.panSafeArea} forceInset={{top: 'never'}}>
      <Header content={{title: 'Home', subtitle: 'Welcome'}} navigation={navigation} />
    </SafeAreaView>
  );
};

export default connect(null)(HomeScreen);
