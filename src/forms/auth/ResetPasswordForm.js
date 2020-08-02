import React, {createRef, useState, forwardRef, useImperativeHandle} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {View} from 'react-native';
import {Button, Text, TextInput, HelperText, Paragraph, Dialog, Portal} from 'react-native-paper';
import {MainHelper} from '@codepso/rn-helper';
import i18n from 'i18n-js';
import {formState} from '../state';
import {appStyle} from '../../assets/styles/app';
import {formStyle} from '../../assets/styles/form';
import AuthService from '../../services/AuthService';
import {useGlobalUI} from '../../app/context/ui';

const ResetPasswordForm = props => {
  const {at, navigation} = props;
  const {dialogUI, blockUI} = useGlobalUI();

  const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .required(i18n.t('app.form.password.rules.required'))
      .min(8, i18n.t('app.form.password.rules.min')),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], i18n.t('app.form.passwordConfirmation.rules.oneOf'))
      .required(i18n.t('app.form.passwordConfirmation.rules.required'))
      .min(8, i18n.t('app.form.passwordConfirmation.rules.min'))
  });

  const initialValues = {...formState.resetPassword};
  const dialogTokenExpired = createRef();
  const authService = new AuthService();

  const onSend = async (formData) => {
    blockUI.current.open(true);

    try {
      formData.token = at;
      await authService.resetPassword(formData);
      blockUI.current.open(false);
      dialogUI.current.open(
        i18n.t('resetPassword.dlg.main.title'),
        i18n.t('resetPassword.dlg.main.content'),
        {navigation, screen: 'SignIn'},
      );
    } catch (error) {
      blockUI.current.open(false);
      let message = MainHelper.getError(error);
      if (message === 'token_invalid') {
        message = i18n.t('resetPassword.txt.expiredToken');
        dialogTokenExpired.current.open(true, message);
      } else {
        dialogUI.current.open(i18n.t('app.txt.snap'), message);
      }
    }
  };

  const DialogTokenExpired = forwardRef((props, ref) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    useImperativeHandle(ref, () => ({
      open: (visible, content = '') => {
        setOpen(visible);
        if (content !== '') {
          setMessage(content);
        }
      }
    }));

    return (
      <Portal>
        <Dialog
          visible={open}
          onDismiss={false}>
          <Dialog.Title>{i18n.t('resetPassword.txt.title')}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{message}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => {
              setOpen(false);
              navigation.navigate('RecoverPassword');
            }}>{i18n.t('resetPassword.txt.sendNewEmail')}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  });

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={ResetPasswordSchema}
      onSubmit={(values) => onSend(values)}>
      {(propsForm) => (
        <>
          <DialogTokenExpired ref={dialogTokenExpired} />
          <Text style={[appStyle.txtTitle, appStyle.setCenter]}>{i18n.t('resetPassword.txt.title')}</Text>
          <Text style={[appStyle.setCenter, appStyle.mrg20B]}>
            {i18n.t('resetPassword.txt.subtitle')}
          </Text>
          <View style={formStyle.panForm}>
            <TextInput
              mode={'outlined'}
              placeholder={i18n.t('app.form.password.label')}
              secureTextEntry={true}
              value={propsForm.values.password}
              onChangeText={propsForm.handleChange('password')}
              onBlur={propsForm.handleBlur('password')}
              autoFocus={true}
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
            <View style={{height: 10}} />
            <Button
              mode="contained"
              contentStyle={formStyle.btnMain}
              onPress={propsForm.handleSubmit}>
              {i18n.t('resetPassword.btn.reset')}
            </Button>
          </View>
        </>
      )}
    </Formik>
  );
};

export default ResetPasswordForm;
