import React from 'react';
import {Appearance, View} from 'react-native';
import {connect} from 'react-redux';
import SafeAreaView from 'react-native-safe-area-view';
import {appStyle} from '../assets/styles/app';
import Header from '../components/app/Header';
import {formStyle} from '../assets/styles/form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {List, Switch} from 'react-native-paper';
import i18n from 'i18n-js';
import {profileStyle} from '../assets/styles/profile';
import {changeTheme, setManageTheme} from '../redux/actions/app';

const PreferencesScreen = (props) => {
  const {navigation, app} = props;

  const onChangeTheme = () => {
    const theme = app.theme === 'dark' ? 'light' : 'dark';
    props.dispatch(changeTheme({theme}));
  };

  const onManageTheme = () => {
    const deviceTheme = Appearance.getColorScheme();
    const manageTheme = !app.manageTheme;
    props.dispatch(setManageTheme({manageTheme}));
    if (!manageTheme && app.theme !== deviceTheme) {
      props.dispatch(changeTheme({theme: deviceTheme}));
    }
  }

  return (
    <SafeAreaView style={appStyle.panSafeArea} forceInset={{top: 'never'}}>
      <Header content={{title: i18n.t('preferences.header.title')}} navigation={navigation} />
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <View style={formStyle.panContainer}>
          <List.Item
            title={i18n.t('preferences.list.manageTheme.title')}
            description={i18n.t('preferences.list.manageTheme.description')}
            right={() => <Switch style={{marginTop: 10}} value={app.manageTheme} onValueChange={onManageTheme} />}
            titleStyle={profileStyle.listItemTitle}
            descriptionStyle={profileStyle.listItemDescription}
          />
          <List.Item
            title={i18n.t('preferences.list.darkMode.title')}
            description={i18n.t('preferences.list.darkMode.description')}
            right={() =>
              <Switch
                style={{marginTop: 10}}
                value={app.theme === 'dark'}
                onValueChange={onChangeTheme}
                disabled={!app.manageTheme}
              />}
            titleStyle={profileStyle.listItemTitle}
            descriptionStyle={profileStyle.listItemDescription}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    app: state.app
  };
};
export default connect(mapStateToProps)(PreferencesScreen);
