import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {appStyle} from '../assets/styles/app';
import {Button} from 'react-native-paper';
import {connect} from 'react-redux';
import has from 'lodash/has';
import i18n from 'i18n-js';
import Logo from '../components/app/Logo';
import {messages} from "../components/welcome/messages";
import CarouselUI from "../components/welcome/CarouselUI";
import UserService from "../services/UserService";
import {MainHelper} from '@codepso/rn-helper';
import {setAuthUser} from '../redux/actions/user';
import {useGlobalUI} from '../app/context/ui';

const WelcomeScreen = (props) => {

  const {dialogUI} = useGlobalUI();
  const {route, navigation, dispatch} = props;
  const userService = new UserService();
  let items = messages();
  const [bg, setBg] = useState(items[0].bg);

  const signIn = async (accessToken) => {
    try {
      userService.setAccessToken(accessToken);
      const response = await userService.me();
      const user = MainHelper.toCamelCase(response.data);
      const payload = {...user, accessToken};
      dispatch(setAuthUser(payload));
    } catch (error) {
      let message = MainHelper.getLaravelError(error, 'email');
      dialogUI.current.open('Snap!', message);
    }
  };

  if (has(route.params, 'at')) {
    const {at} = route.params;
    signIn(at).then(() => {});
  }

  useEffect(() => {
    // TO-DO
    // let temp = messages();
    // setItems(temp);
    /*props.dispatch({
      type: 'LOGOUT',
    });*/
  }, []);

  return (
    <SafeAreaView style={[appStyle.panSafeArea]}>
      <View style={{flex: 1}}>
        <Logo />
      </View>
      <View style={{flex: 2, justifyContent:'center'}}>
        <CarouselUI setBg={setBg} messages={items} />
      </View>
      <View style={{height: 120, width:200, alignSelf: 'center'}}>
        <Button mode="contained" contentStyle={{height: 45}} onPress={() => navigation.navigate('SignIn')}>
          {i18n.t('app.signIn')}
        </Button>
        <View style={{height: 10}} />
        <Button mode="outlined" contentStyle={{height: 45}} onPress={() => navigation.navigate('SignUp')}>
          {i18n.t('app.signUp')}
        </Button>
      </View>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(WelcomeScreen);
