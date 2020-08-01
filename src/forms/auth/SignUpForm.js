import React from 'react';
import {Button, HelperText, Text, TextInput} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {View} from 'react-native';
import i18n from 'i18n-js';
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
    firstName: Yup.string().required(i18n.t('app.form.firstName.rules.required')),
    lastName: Yup.string().required(i18n.t('app.form.lastName.rules.required')),
    email: Yup.string()
      .email(i18n.t('app.form.email.rules.type'))
      .required(i18n.t('app.form.email.rules.required')),
    password: Yup.string()
      .required(i18n.t('app.form.password.rules.required'))
      .min(8, i18n.t('app.form.password.rules.min')),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], i18n.t('app.form.passwordConfirmation.rules.oneOf'))
      .required(i18n.t('app.form.passwordConfirmation.rules.required'))
      .min(8, i18n.t('app.form.passwordConfirmation.rules.min'))
  });

  const initialValues = {...formState.signUp};
  const authService = new AuthService();
  // const sleep = (m) => new Promise((r) => setTimeout(r, m));

  const onSend = async (formData) => {
    blockUI.current.open(true);

    try {
      // await sleep(500);
      await authService.signUp(formData);
      blockUI.current.open(false);
      dialogUI.current.open(
        i18n.t('signUp.txt.dlgTitle'),
        i18n.t('signUp.txt.dlgMessage'),
        {navigation, screen: 'Welcome'},
      );
    } catch (error) {
      blockUI.current.open(false);
      let message = MainHelper.getLaravelError(error, 'email');
      dialogUI.current.open(i18n.t('app.txt.snap'), message);
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
          <Text style={[appStyle.txtTitle, appStyle.setCenter]}>{i18n.t('signUp.txt.title')}</Text>
          <View style={formStyle.panForm}>
            <TextInput
              mode={'outlined'}
              placeholder={i18n.t('app.form.firstName.label')}
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
              placeholder={i18n.t('app.form.lastName.label')}
              value={propsForm.values.lastName}
              onChangeText={propsForm.handleChange('lastName')}
              onBlur={propsForm.handleBlur('lastName')}
            />
            <HelperText type="error">
              {propsForm.touched.lastName && propsForm.errors.lastName}
            </HelperText>
            <TextInput
              mode={'outlined'}
              placeholder={i18n.t('app.form.email.label')}
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
              placeholder={i18n.t('app.form.password.label')}
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
              placeholder={i18n.t('app.form.passwordConfirmation.label')}
              value={propsForm.values.passwordConfirmation}
              onChangeText={propsForm.handleChange('passwordConfirmation')}
              onBlur={propsForm.handleBlur('passwordConfirmation')}
            />
            <HelperText type="error">
              {propsForm.touched.passwordConfirmation && propsForm.errors.passwordConfirmation}
            </HelperText>
            <Text style={[appStyle.setCenter, appStyle.mrg20TB]}>
              {i18n.t('signUp.txt.footer1')}{'  '}
              <Text style={appStyle.txtBold} onPress={goToTerms}>{i18n.t('app.txt.terms')}</Text>
              {'  '}{i18n.t('signUp.txt.footer2')}{'  '}
              <Text style={appStyle.txtBold} onPress={goToTerms}>{i18n.t('app.txt.policy')}</Text>
            </Text>
            <Button
              mode="contained"
              contentStyle={formStyle.btnMain}
              onPress={propsForm.handleSubmit}>
              {i18n.t('signUp.btn.join')}
            </Button>
            <Text style={[appStyle.setCenter, appStyle.mrg10T]}>
              {i18n.t('signUp.txt.alreadyAccount')}{'  '}
              <Text style={appStyle.txtTitle} onPress={goToSignIn}>{i18n.t('app.btn.signIn')}</Text>
            </Text>
          </View>
        </>
      )}
    </Formik>
  );
};

export default SignUpForm;
