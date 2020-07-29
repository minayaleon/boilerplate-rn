import React from 'react';
import {KeyboardAvoidingView, Platform, View} from 'react-native';
import {Appbar} from "react-native-paper";
import SafeAreaView from 'react-native-safe-area-view';
import {appStyle} from '../../assets/styles/app';
import {formStyle} from '../../assets/styles/form';
import ResetPasswordForm from '../../forms/auth/ResetPasswordForm';

const ResetPasswordScreen = ({route, navigation}) => {
  const {at} = route.params;

  return (
    <SafeAreaView style={appStyle.panSafeArea} forceInset={{top: 'never'}}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()}/>
      </Appbar.Header>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={appStyle.panKeyboard}>
        <View style={appStyle.panMain}>
          <View style={[formStyle.panContainer]}>
            <ResetPasswordForm navigation={navigation} at={at} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;
