import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {View} from 'react-native';
import {Button, Text, TextInput, HelperText} from 'react-native-paper';
import {MainHelper} from '@codepso/rn-helper';
import {has, keys, pick} from 'lodash';
import {connect} from 'react-redux';
import {formState} from '../state';
import {appStyle} from '../../assets/styles/app';
import {formStyle} from '../../assets/styles/form';
import {signInStyle} from '../../assets/styles/sign-in';
import AuthService from '../../services/AuthService';
import UserService from '../../services/UserService';
import {setAuthUser} from '../../redux/actions/user';
import {coreState} from '../../redux/state';
import {useGlobalUI} from '../../app/context/ui';

const SignInForm = (props) => {

  const {dialogUI, blockUI} = useGlobalUI();

  const SignInSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email.')
      .required('Please enter your email address.'),
    password: Yup.string()
      .required('Please enter a password.')
      .min(8, 'Password is too short, should be 8 chars minimum.'),
  });

  const initialValues = {...formState.signIn};
  const authService = new AuthService();
  const userService = new UserService();

  const onSend = async (values) => {
    blockUI.current.open(true);

    try {
      const responseA = await authService.signIn(values);
      const accessToken = responseA.data['accessToken'];
      userService.setAccessToken(accessToken);

      const responseB = await userService.me();
      if (!responseB || !has(responseB, 'data')) {
        MainHelper.sendError({message: 'Can not update user info'});
      }
      blockUI.current.open(false);

      let user = responseB.data;
      user = pick(user, keys(coreState.user));
      const payload = {...user, accessToken};
      props.dispatch(setAuthUser(payload));
    } catch (error) {
      blockUI.current.open(false);
      let message = MainHelper.getError(error);
      dialogUI.current.open('Snap!', message);
    }
  };

  const goToSignUp = () => {
    props.navigation.navigate('SignUp');
  };

  const goToRecoverPassword = () => {
    props.navigation.navigate('RecoverPassword');
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={SignInSchema}
      onSubmit={(values) => onSend(values)}>
      {(propsForm) => (
        <>
          <Text style={[appStyle.txtTitle, appStyle.setCenter]}>Sign In</Text>
          <View style={formStyle.panForm}>
            <TextInput
              mode={'outlined'}
              placeholder={'Email'}
              value={propsForm.values.email}
              autoCapitalize={'none'}
              onChangeText={propsForm.handleChange('email')}
              onBlur={propsForm.handleBlur('email')}
              autoFocus={true}
              keyboardType={'email-address'}
            />
            <HelperText type="error">
              {propsForm.touched.email && propsForm.errors.email}
            </HelperText>
            <TextInput
              mode={'outlined'}
              secureTextEntry={true}
              placeholder={'Password'}
              value={propsForm.values.password}
              onChangeText={propsForm.handleChange('password')}
              onBlur={propsForm.handleBlur('password')}
            />
            <View style={signInStyle.cntPassword}>
              <View style={signInStyle.cntPasswordItem}>
                <HelperText type="error">
                  {propsForm.touched.password && propsForm.errors.password}
                </HelperText>
              </View>
              <View style={[signInStyle.cntPasswordItem, appStyle.setRight]}>
                <Text onPress={goToRecoverPassword}>
                  Forgot your password?
                </Text>
              </View>
            </View>
            <Button
              mode="contained"
              contentStyle={formStyle.btnMain}
              onPress={propsForm.handleSubmit}>
              Log In
            </Button>
            <Text style={[appStyle.setCenter, signInStyle.cntSignUp]}>
              Don't have an account?{'  '}
              <Text style={appStyle.txtTitle} onPress={goToSignUp}>
                Sign Up
              </Text>
            </Text>
          </View>
        </>
      )}
    </Formik>
  );
};

export default connect(null)(SignInForm);
