import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {View} from 'react-native';
import {Button, Text, TextInput, HelperText} from 'react-native-paper';
import {MainHelper} from '@codepso/rn-helper';
import i18n from 'i18n-js';
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
      .email(i18n.t('app.form.email.rules.type'))
      .required(i18n.t('app.form.email.rules.required'))
  });

  const initialValues = {...formState.recoverPassword};
  const authService = new AuthService();

  const onSend = async values => {
    blockUI.current.open(true);

    try {
      await authService.recoverPassword(values);
      blockUI.current.open(false);
      dialogUI.current.open(
        i18n.t('recoverPassword.txt.dlgTitle'),
        i18n.t('recoverPassword.txt.dlgMessage'),
        {navigation, screen: 'Welcome'},
      );
    } catch (error) {
      blockUI.current.open(false);
      let message = MainHelper.getError(error);
      dialogUI.current.open(i18n.t('app.txt.snap'), message);
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
          <Text style={[appStyle.txtTitle, appStyle.setCenter]}>{i18n.t('recoverPassword.txt.title')}</Text>
          <View style={formStyle.panForm}>
            <Text style={[appStyle.setCenter, appStyle.mrg20B]}>
              {i18n.t('recoverPassword.txt.subtitle')}
            </Text>
            <TextInput
              mode={'outlined'}
              placeholder={i18n.t('app.form.email.label')}
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
              {i18n.t('recoverPassword.btn.recover')}
            </Button>
          </View>
        </>
      )}
    </Formik>
  );
};

export default RecoverPasswordForm;
