import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DrawerContent from './DrawerContent';
import SignOutScreen from '../screens/auth/SignOutScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PreferencesScreen from '../screens/PreferencesScreen';
import NameScreen from '../screens/profile/NameScreen';
import GenderScreen from '../screens/profile/GenderScreen';
import BirthScreen from '../screens/profile/BirthScreen';
import PasswordScreen from "../screens/profile/PasswordScreen";

const ProfileStack = createStackNavigator();

const ProfileNavigator = () => (
  <ProfileStack.Navigator initialRouteName="Profile">
    <ProfileStack.Screen
      name="Profile"
      component={ProfileScreen}
      options={{headerShown: false}}
    />
    <ProfileStack.Screen
      name="Name"
      component={NameScreen}
      options={{headerShown: false}}
    />
    <ProfileStack.Screen
      name="Gender"
      component={GenderScreen}
      options={{headerShown: false}}
    />
    <ProfileStack.Screen
      name="Birth"
      component={BirthScreen}
      options={{headerShown: false}}
    />
    <ProfileStack.Screen
      name="Password"
      component={PasswordScreen}
      options={{headerShown: false}}
    />
  </ProfileStack.Navigator>
);

const HomeDrawer = createDrawerNavigator();

const MainNavigator = () => (
  <HomeDrawer.Navigator initialRouteName="Home" drawerContent={() => <DrawerContent/>}>
    <HomeDrawer.Screen
      name="Home"
      component={HomeScreen}
    />
    <HomeDrawer.Screen
      name="Profile"
      component={ProfileNavigator}
    />
    <HomeDrawer.Screen
      name="Preferences"
      component={PreferencesScreen}
    />

    <HomeDrawer.Screen
      name="SignOut"
      component={SignOutScreen}
    />
  </HomeDrawer.Navigator>
);

export default MainNavigator;
