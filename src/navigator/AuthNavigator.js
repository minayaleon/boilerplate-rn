import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import RecoverPasswordScreen from "../screens/auth/RecoverPasswordScreen";
import ResetPasswordScreen from "../screens/auth/ResetPasswordScreen";

const AuthStack = createStackNavigator();

const AuthNavigator = () => (
  <AuthStack.Navigator initialRouteName="Welcome">
    <AuthStack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name="SignIn"
      component={SignInScreen}
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name="RecoverPassword"
      component={RecoverPasswordScreen}
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name="SignUp"
      component={SignUpScreen}
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name="ResetPassword"
      component={ResetPasswordScreen}
      options={{headerShown: false}}
    />
  </AuthStack.Navigator>
);

export default AuthNavigator;
