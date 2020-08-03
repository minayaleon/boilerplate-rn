import React from 'react';
import {Button, HelperText, RadioButton} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {keys, pick} from 'lodash';
import {formStyle} from '../../assets/styles/form';
import {MainHelper} from '@codepso/rn-helper';
import {useGlobalUI} from '../../app/context/ui';
import MeService from '../../services/MeService';
import {coreState} from '../../redux/state';
import {setAuthUser} from '../../redux/actions/user';
import ProfileHeader from '../../components/ProfileHeader';
import * as navigation from '../../navigator/RootNavigation';
import i18n from "i18n-js";

const GenderForm = (props) => {
  const {user} = props;
  const {dialogUI, blockUI} = useGlobalUI();

  const schema = Yup.object().shape({
    gender: Yup.string().required(i18n.t('app.form.gender.rules.required')).nullable(),
  });

  const initialValues = pick(user, ['gender']);
  const meService = new MeService();
  meService.setAccessToken(user.accessToken);

  const onSend = async (formData) => {
    blockUI.current.open(true);

    try {
      const r = await meService.update(formData);
      blockUI.current.open(false);

      const temp = pick(r.data, keys(coreState.user));
      const payload = {...user, ...temp};
      props.dispatch(setAuthUser(payload));

      dialogUI.current.open(
        i18n.t('profile.dlg.update.title'),
        i18n.t('profile.dlg.update.content'),
        {navigation, screen: 'Profile'}
      );
    } catch (error) {
      blockUI.current.open(false);
      let message = MainHelper.getError(error);
      dialogUI.current.open(i18n.t('app.txt.snap'), message);
    }
  };

  const onCancel = () => {
    navigation.goBack();
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values) => onSend(values)}>
      {(propsForm) => (
        <View style={formStyle.panForm}>
          <ProfileHeader
            title={i18n.t('profileGender.header.form.title')}
            fields={i18n.t('profileGender.header.form.fields')} />
          <RadioButton.Group
            onValueChange={value => propsForm.setFieldValue('gender', value)}
            value={propsForm.values.gender}>
            <RadioButton.Item label={i18n.t('profileGender.options.male')} value="M" />
            <RadioButton.Item label={i18n.t('profileGender.options.female')} value="F" />
            <RadioButton.Item label={i18n.t('profileGender.options.other')} value="O" />
          </RadioButton.Group>
          <HelperText type="error">
            {propsForm.touched.gender && propsForm.errors.gender}
          </HelperText>
          <View style={{flexDirection: 'row', marginTop: 10}}>
            <View style={{width: '50%'}}>
              <Button
                mode="text"
                contentStyle={formStyle.btnMain}
                style={{marginRight: 10}}
                onPress={onCancel}>
                {i18n.t('app.btn.cancel')}
              </Button>
            </View>
            <View style={{width: '50%'}}>
              <Button
                mode="contained"
                contentStyle={formStyle.btnMain}
                style={{marginLeft: 10}}
                onPress={propsForm.handleSubmit}>
                {i18n.t('app.btn.update')}
              </Button>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default connect(null)(GenderForm);
