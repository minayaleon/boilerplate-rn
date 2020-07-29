import React from 'react';
import {View} from 'react-native';
import SignUpForm from "../../forms/auth/SignUpForm";
import {appStyle} from '../../assets/styles/app';
import {formStyle} from '../../assets/styles/form';
import SafeAreaView from 'react-native-safe-area-view';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Appbar} from 'react-native-paper';

const SignUpScreen = ({navigation}) => {

  return (
    <SafeAreaView style={appStyle.panSafeArea} forceInset={{top: 'never'}}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      </Appbar.Header>
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <View style={formStyle.panContainer}>
          <SignUpForm navigation={navigation} />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;
