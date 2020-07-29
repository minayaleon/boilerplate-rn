import React, {createRef} from 'react';
import {Button, HelperText, Text, TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {View} from 'react-native';
import {formState} from "../state";
import {appStyle} from '../../assets/styles/app';
import {formStyle} from '../../assets/styles/form';
import {MainHelper} from '@codepso/rn-helper';
import AuthService from "../../services/AuthService";
import {useGlobalUI} from '../../app/context/ui';

const SignUpForm = props => {
  const {navigation} = props;
  const {dialogUI, blockUI} = useGlobalUI();

  const SignUpSchema = Yup.object().shape({
    firstName: Yup.string().required('Please enter your first name.'),
    lastName: Yup.string().required('Please enter your last name.'),
    email: Yup.string()
      .email('Invalid email.')
      .required('Please enter your email address.'),
    password: Yup.string()
      .required('Please enter a password.')
      .min(8, 'Password is too short, should be 8 chars minimum.'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password.')
      .min(8, 'Password is too short, should be 8 chars minimum.'),
  });

  const initialValues = {...formState.signUp};
  const authService = new AuthService();
  // const sleep = (m) => new Promise((r) => setTimeout(r, m));

  const onSend = async (values) => {
    blockUI.current.open(true);

    try {
      const formData = MainHelper.toSnakeCase(values);
      // await sleep(500);
      await authService.signUp(formData);
      blockUI.current.open(false);
      dialogUI.current.open(
        'Welcome',
        'You will receive an email to confirm your account',
        {navigation, screen: 'Welcome'},
      );
    } catch (error) {
      blockUI.current.open(false);
      let message = MainHelper.getLaravelError(error, 'email');
      dialogUI.current.open('Snap!', message);
    }
  };

  const goToSignIn = () => {
    props.navigation.navigate('SignIn');
  };

  const goToTerms = () => {
    // Terms
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={SignUpSchema}
      onSubmit={(values) => onSend(values)}>
      {(propsForm) => (
        <>
          <Text style={[appStyle.txtTitle, appStyle.setCenter]}>Sign Up</Text>
          <View style={formStyle.panForm}>
            <TextInput
              mode={'outlined'}
              placeholder={'First Name'}
              value={propsForm.values.firstName}
              onChangeText={propsForm.handleChange('firstName')}
              onBlur={propsForm.handleBlur('firstName')}
              autoFocus={true}
            />
            <HelperText type="error">
              {propsForm.touched.firstName && propsForm.errors.firstName}
            </HelperText>
            <TextInput
              mode={'outlined'}
              placeholder={'Last Name'}
              value={propsForm.values.lastName}
              onChangeText={propsForm.handleChange('lastName')}
              onBlur={propsForm.handleBlur('lastName')}
            />
            <HelperText type="error">
              {propsForm.touched.lastName && propsForm.errors.lastName}
            </HelperText>
            <TextInput
              mode={'outlined'}
              placeholder={'Email'}
              value={propsForm.values.email}
              autoCapitalize={'none'}
              onChangeText={propsForm.handleChange('email')}
              onBlur={propsForm.handleBlur('email')}
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
            <HelperText type="error">
              {propsForm.touched.password && propsForm.errors.password}
            </HelperText>
            <TextInput
              mode={'outlined'}
              secureTextEntry={true}
              placeholder={'Confirm Password'}
              value={propsForm.values.passwordConfirmation}
              onChangeText={propsForm.handleChange('passwordConfirmation')}
              onBlur={propsForm.handleBlur('passwordConfirmation')}
            />
            <HelperText type="error">
              {propsForm.touched.passwordConfirmation && propsForm.errors.passwordConfirmation}
            </HelperText>
            <Text style={[appStyle.setCenter, appStyle.mrg20TB]}>
              By signing up you accept our{'  '}
              <Text style={appStyle.txtBold} onPress={goToTerms}>Terms of Service</Text>
              {'  '}and{'  '}
              <Text style={appStyle.txtBold} onPress={goToTerms}>Privacy Policy</Text>
            </Text>
            <Button
              mode="contained"
              contentStyle={formStyle.btnMain}
              onPress={propsForm.handleSubmit}>
              Join
            </Button>
            <Text style={[appStyle.setCenter, appStyle.mrg10T]}>
              Don't have an account?{'  '}
              <Text style={appStyle.txtTitle} onPress={goToSignIn}>Sign In</Text>
            </Text>
          </View>
        </>
      )}
    </Formik>
  );
};

export default SignUpForm;
