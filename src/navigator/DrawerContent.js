import React from 'react';
import {View} from 'react-native';
import {
  DrawerItem,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {Drawer, Text, TouchableRipple, Switch} from 'react-native-paper';
import {connect} from 'react-redux';
import i18n from 'i18n-js';
import {drawerStyle} from '../assets/styles/drawer';
import {useGlobalUI} from '../app/context/ui';
import * as navigation from '../navigator/RootNavigation';
import {changeTheme} from '../redux/actions/app';
import ProfileAvatar from '../components/ProfileAvatar';

const DrawerContent = props => {
  const {user, app} = props;
  const {dialogUI} = useGlobalUI();

  const toggleTheme = () => {
    const theme = app.theme === 'dark' ? 'light' : 'dark';
    props.dispatch(changeTheme({theme}));
  };

  const selectPhoto = () => {
    navigation.navigate('Profile');
  };

  return (
    <DrawerContentScrollView>
      <View style={drawerStyle.panContent}>
        <ProfileAvatar user={user} selectPhoto={selectPhoto} section="drawer" />
        <Drawer.Section style={drawerStyle.panSection}>
          <DrawerItem
            label={i18n.t('app.nav.home')}
            onPress={() => navigation.navigate('Home')}
          />
          <DrawerItem
            label={i18n.t('app.nav.profile')}
            onPress={() => navigation.navigate('Profile')}
          />
          <DrawerItem
            label={i18n.t('app.nav.preferences')}
            onPress={() => navigation.navigate('Preferences')}
          />
        </Drawer.Section>
        {app.manageTheme &&
        <Drawer.Section>
          <TouchableRipple onPress={toggleTheme}>
            <View style={drawerStyle.panPreference}>
              <Text>{i18n.t('app.txt.darkMode')}</Text>
              <View pointerEvents="none">
                <Switch value={app.theme === 'dark'}/>
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>}
        <Drawer.Section>
          <DrawerItem
            label={i18n.t('app.nav.logout')}
            onPress={() => {
              dialogUI.current.open(
                i18n.t('app.dlg.logout.title'),
                i18n.t('app.dlg.logout.content'),
                {navigation, screen: 'SignOut'},
                true);
            }}
          />
        </Drawer.Section>
      </View>
    </DrawerContentScrollView>
  );
};
const mapStateToProps = (state) => {
  return {
    user: state.user,
    app: state.app
  };
};
export default connect(mapStateToProps)(DrawerContent);
