import React, {useState, useEffect, useRef} from 'react';
import {connect} from "react-redux";
import {StatusBar, Appearance} from "react-native";
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme
} from 'react-native-paper';
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme
} from '@react-navigation/native';
import {navigationRef} from './navigator/RootNavigation';
import AppNavigator from './navigator/AppNavigator';
import {linking} from "./navigator/linking";
import {UIProvider} from './app/context/ui';
import {changeTheme} from './redux/actions/app';
import {types} from './redux/types';

const Main = (props) => {
  console.log('Main');
  console.log(props);
  const checkThemeChange = useRef(false);
  const theme = props.app.theme;
  const [deviceTheme, setDeviceTheme] = useState('');
  const defaultTheme = 'light';

  // Switch Theme
  const paperTheme = (theme === defaultTheme) ? PaperDefaultTheme : PaperDarkTheme;
  const navigationTheme = (theme === defaultTheme) ? NavigationDefaultTheme : NavigationDarkTheme;
  const barTheme = (theme === defaultTheme) ? 'dark-content' : 'light-content';
  const [barStyle, setBarStyle] = useState(barTheme);

  // BlockUI settings
  const bgColor = (theme === defaultTheme) ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';
  const txtColor = (theme === defaultTheme) ? 'black' : 'white';

  useEffect(() => {
    console.log('theme observer');
    console.log(theme, 'app');
    console.log(deviceTheme, 'device');
    console.log(props.app.manageTheme, 'manage');
    if (checkThemeChange.current && !props.app.manageTheme && theme !== deviceTheme) {
      console.log('new value');
      props.dispatch(changeTheme({theme: deviceTheme}));
    }
    // props.dispatch({type: types.RESET_APP});
  }, [deviceTheme]);

  useEffect(() => {
    console.log('only initial');
    themeChangeListener();
    Appearance.addChangeListener(themeChangeListener);
    return (() => {
      console.log('remove');
      Appearance.removeChangeListener(themeChangeListener);
    });
  }, []);

  const themeChangeListener = () => {
    const currentTheme = Appearance.getColorScheme();
    checkThemeChange.current = true;
    setDeviceTheme(currentTheme);
  };

  return (
    <PaperProvider theme={paperTheme}>
      <StatusBar barStyle={barStyle} />
      <NavigationContainer
        linking={linking}
        theme={navigationTheme}
        onStateChange={state => {
          const route = state.routes[state.index];
          if (defaultTheme === 'light') {
            if (route.name === 'Welcome' && barStyle !== 'dark-content') {
              setBarStyle('dark-content');
            }
            if (route.name !== 'Welcome' && barStyle !== 'light-content') {
              setBarStyle('light-content');
            }
          }
        }}
        ref={navigationRef}
      >
        <UIProvider bgColor={bgColor} txtColor={txtColor}>
          <AppNavigator />
        </UIProvider>
      </NavigationContainer>
    </PaperProvider>
  )
};

const mapStateToProps = (state) => {
  return {
    app: state.app,
  };
};
export default connect(mapStateToProps)(Main);
