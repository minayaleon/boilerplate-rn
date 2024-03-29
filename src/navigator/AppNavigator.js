import React, {useEffect, useReducer} from 'react';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import {coreState} from '../app/state';
import appReducer from '../app/reducers/app';

const SplashStack = createStackNavigator();
const initialState = {...coreState.navigator};

const SplashNavigator = () => (
  <SplashStack.Navigator>
    <SplashStack.Screen
      name="Splash"
      component={SplashScreen}
      options={{headerShown: false}}
    />
  </SplashStack.Navigator>
);

const AppNavigator = (props) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    dispatch({type: 'UPDATE_STATE', payload: {isLoading: false}});
    (async function main() {
      await checkToken();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.user.accessToken]);

  const checkToken = async () => {
    const accessToken = props.user.accessToken;

    if (accessToken !== '' && !state.isLogged) {
      dispatch({type: 'UPDATE_STATE', payload: {isLogged: true}});
    }

    if (accessToken === '' && state.isLogged) {
      dispatch({type: 'UPDATE_STATE', payload: {isLogged: false}});
    }
  };

  return state.isLoading && !props.localizationConfigured ? (
    <SplashNavigator />
  ) : state.isLogged ? (
    <MainNavigator />
  ) : (
    <AuthNavigator />
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(AppNavigator);
