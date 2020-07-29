import React from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {appStyle} from '../../assets/styles/app';
import {formStyle} from '../../assets/styles/form';
import {View, KeyboardAvoidingView, Platform} from 'react-native';
import RecoverPasswordForm from '../../forms/auth/RecoverPasswordForm';
import {Appbar} from 'react-native-paper';

const RecoverPasswordScreen = ({navigation}) => {

  return (
    <SafeAreaView style={appStyle.panSafeArea} forceInset={{top: 'never'}}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
      </Appbar.Header>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={appStyle.panKeyboard}>
        <View style={formStyle.panContainer}>
          <RecoverPasswordForm navigation={navigation} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RecoverPasswordScreen;
