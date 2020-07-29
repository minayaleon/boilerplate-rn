import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {View} from 'react-native';
import {Button, Text, TextInput, HelperText} from 'react-native-paper';
import {MainHelper} from '@codepso/rn-helper';
import {formState} from '../state';
import {appStyle} from '../../assets/styles/app';
import {formStyle} from '../../assets/styles/form';
import AuthService from '../../services/AuthService';
import {useGlobalUI} from '../../app/context/ui';
import * as navigation from '../../navigator/RootNavigation';

const RecoverPasswordForm = () => {

  const {dialogUI, blockUI} = useGlobalUI();

  const RecoverPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email.')
      .required('Please enter your email address.')
  });

  const initialValues = {...formState.recoverPassword};
  const authService = new AuthService();

  const onSend = async values => {
    blockUI.current.open(true);

    try {
      await authService.recoverPassword(values);
      blockUI.current.open(false);
      dialogUI.current.open(
        'Recover Password',
        'You will receive an email to change your password',
        {navigation, screen: 'Welcome'},
      );
    } catch (error) {
      blockUI.current.open(false);
      let message = MainHelper.getError(error);
      dialogUI.current.open('Snap!', message);
    }
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={RecoverPasswordSchema}
      onSubmit={(values) => onSend(values)}>
      {(propsForm) => (
        <>
          <View style={{height: 10}} />
          <Text style={[appStyle.txtTitle, appStyle.setCenter]}>Recover Password</Text>
          <View style={formStyle.panForm}>
            <Text style={[appStyle.setCenter, appStyle.mrg20B]}>
              Enter your email to receive instructions on how recover your password
            </Text>
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
            <View style={{height: 10}} />
            <Button
              mode="contained"
              contentStyle={formStyle.btnMain}
              onPress={propsForm.handleSubmit}>
              Recover
            </Button>
          </View>
        </>
      )}
    </Formik>
  );
};

export default RecoverPasswordForm;
