import React, {createRef, useState, forwardRef, useImperativeHandle} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {View} from 'react-native';
import {Button, Text, TextInput, HelperText, Paragraph, Dialog, Portal} from 'react-native-paper';
import {MainHelper} from '@codepso/rn-helper';
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
      .required('Please enter a password.')
      .min(8, 'Password is too short, should be 8 chars minimum.'),
    passwordConfirmation: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password.')
      .min(8, 'Password is too short, should be 8 chars minimum.')
  });

  const initialValues = {...formState.resetPassword};
  const dialogTokenExpired = createRef();
  const authService = new AuthService();

  const onSend = async (values) => {
    blockUI.current.open(true);

    try {
      values.token = at;
      const formData = MainHelper.toSnakeCase(values);
      await authService.resetPassword(formData);
      blockUI.current.open(false);
      dialogUI.current.open(
        'Reset Password',
        'Your passworda has been updated, click OK to continue',
        {navigation, screen: 'SignIn'},
      );
    } catch (error) {
      blockUI.current.open(false);
      let message = MainHelper.getError(error);
      if (message === 'token_invalid') {
        message = 'The token has expired, request a new link again to recover your password';
        dialogTokenExpired.current.open(true, message);
      } else {
        dialogUI.current.open('Snap!', message);
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
          <Dialog.Title>Reset Password</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{message}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => {
              setOpen(false);
              navigation.navigate('RecoverPassword');
            }}>Send new email</Button>
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
          <Text style={[appStyle.txtTitle, appStyle.setCenter]}>Reset Password</Text>
          <Text style={[appStyle.setCenter, appStyle.mrg20B]}>
            Please enter a new password
          </Text>
          <View style={formStyle.panForm}>
            <TextInput
              mode={'outlined'}
              placeholder={'Password'}
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
              placeholder={'Confirm Password'}
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
              Reset
            </Button>
          </View>
        </>
      )}
    </Formik>
  );
};

export default ResetPasswordForm;
