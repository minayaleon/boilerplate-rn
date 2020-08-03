import React, {useState, useEffect, useRef} from 'react';
import {connect} from "react-redux";
import {StatusBar, Appearance, Platform} from "react-native";
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
import {useLocalization} from './i18n/localization';

const Main = (props) => {
  const {localizationConfigured} = useLocalization();
  const theme = props.app.theme;
  const defaultTheme = 'light';
  const checkThemeChange = useRef(false);
  const [deviceTheme, setDeviceTheme] = useState('');

  // Switch Theme
  const paperTheme = (theme === defaultTheme) ? PaperDefaultTheme : PaperDarkTheme;
  const navigationTheme = (theme === defaultTheme) ? NavigationDefaultTheme : NavigationDarkTheme;
  const barTheme = (theme === defaultTheme && Platform.OS === 'ios') ? 'dark-content' : 'light-content';
  const [barStyle, setBarStyle] = useState(barTheme);

  // Android Only
  const barBgTheme = (theme === defaultTheme) ? paperTheme.colors.primary : paperTheme.colors.background;
  const [barBgStyle, setBarBgStyle] = useState(barBgTheme);

  // BlockUI settings
  const bgColor = (theme === defaultTheme) ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.8)';
  const txtColor = (theme === defaultTheme) ? 'black' : 'white';

  useEffect(() => {
    if (checkThemeChange.current && !props.app.manageTheme && theme !== deviceTheme) {
      props.dispatch(changeTheme({theme: deviceTheme}));
    }
  }, [deviceTheme]);

  useEffect(() => {
    if (checkThemeChange.current && Platform.OS === 'android') {
      const screen = navigationRef.current.getCurrentRoute().name;
      setBarBgStyle(barBgTheme);
      checkStatusBar(screen);
    }
  }, [theme]);

  useEffect(() => {
    themeChangeListener();
    Appearance.addChangeListener(themeChangeListener);
    return (() => {
      Appearance.removeChangeListener(themeChangeListener);
    });
  }, []);

  const themeChangeListener = () => {
    const currentTheme = Appearance.getColorScheme();
    checkThemeChange.current = true;
    setDeviceTheme(currentTheme);
  };

  const checkStatusBar = (screen) => {
    if (Platform.OS === 'ios') {
      if (screen === 'Welcome' && barStyle !== 'dark-content') {
        setBarStyle('dark-content');
      }
      if (screen !== 'Welcome' && barStyle !== 'light-content') {
        setBarStyle('light-content');
      }
    } else {
      if (screen === 'Welcome' && theme === defaultTheme && barBgStyle !== paperTheme.colors.background) {
        setBarBgStyle(paperTheme.colors.background);
      }
      if (screen !== 'Welcome' && theme === defaultTheme && barBgStyle !== paperTheme.colors.primary) {
        setBarBgStyle(paperTheme.colors.primary);
      }
    }
  };

  return (
    <PaperProvider theme={paperTheme}>
      <StatusBar barStyle={barStyle} backgroundColor={barBgStyle} />
      <NavigationContainer
        linking={linking}
        theme={navigationTheme}
        onStateChange={state => {
          const route = state.routes[state.index];
          checkStatusBar(route.name);
        }}
        ref={navigationRef}
      >
        <UIProvider bgColor={bgColor} txtColor={txtColor}>
          <AppNavigator localizationConfigured={localizationConfigured} />
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
