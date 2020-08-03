import React from 'react';
import {KeyboardAvoidingView, Platform, View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {connect} from 'react-redux';
import i18n from 'i18n-js';
import {appStyle} from '../../assets/styles/app';
import Header from '../../components/app/Header';
import {formStyle} from '../../assets/styles/form';
import GenderForm from '../../forms/profile/GenderForm';

const GenderScreen = (props) => {
  const {user} = props;

  return (
    <SafeAreaView style={appStyle.panSafeArea} forceInset={{top: 'never'}}>
      <Header
        content={{
          title: i18n.t('profileGender.header.main.title'),
          subtitle: i18n.t('profileGender.header.main.subtitle')
        }}
        withBack={true}
      />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={appStyle.panKeyboard}>
        <View style={formStyle.panContainer}>
          <GenderForm user={user} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(GenderScreen);
