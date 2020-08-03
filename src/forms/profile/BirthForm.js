import React, {useState} from 'react';
import {Button, HelperText, Text, IconButton} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Platform, View} from 'react-native';
import {connect} from 'react-redux';
import {isEmpty, keys, pick} from 'lodash';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import i18n from 'i18n-js';
import {formStyle} from '../../assets/styles/form';
import {MainHelper} from '@codepso/rn-helper';
import {useGlobalUI} from '../../app/context/ui';
import MeService from '../../services/MeService';
import {coreState} from '../../redux/state';
import {setAuthUser} from '../../redux/actions/user';
import ProfileHeader from '../../components/ProfileHeader';
import * as navigation from '../../navigator/RootNavigation';
import {useTheme} from 'react-native-paper';
import AppHelper from '../../helpers/AppHelper';

const BirthForm = (props) => {
  const {user} = props;
  const {dialogUI, blockUI} = useGlobalUI();
  const {colors} = useTheme();
  const minAge = 16;
  const maxDate = moment().subtract(minAge, 'years').toDate();
  const locale = i18n.currentLocale();

  // Android Only
  const [show, setShow] = useState(false);
  const currentBirth = !isEmpty(user.birth) ? AppHelper.getBirth(user.birth) : '...';
  const [birth, setBirth] = useState(currentBirth);

  const validationSchema = Yup.object().shape({
    birth: Yup.date()
      .required('Please enter your birthday.')
      .max(maxDate, `Must be ${minAge} years or older`)
  });

  const initialValues = pick(user, ['birth']);
  if (initialValues.birth === null) {
    initialValues.birth = moment().toDate();
  } else {
    initialValues.birth = moment(initialValues.birth).toDate();
  }

  const meService = new MeService();
  meService.setAccessToken(user.accessToken);

  const onSend = async (formData) => {
    console.log(formData);
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

  const onChoose = () => {
    setShow(true);
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => onSend(values)}>
      {(propsForm) => (
        <View style={formStyle.panForm}>
          <ProfileHeader
            title={i18n.t('profileBirth.header.form.title')}
            fields={i18n.t('profileBirth.header.form.fields')} />
          {Platform.OS === 'android' &&
          <View style={{alignItems: 'center'}}>
            <View style={{flexDirection: 'row', width: 160}}>
              <View style={{width: 115}}>
                <Text style={{fontSize: 20, textAlign: 'right', marginTop: 10}}>{birth}</Text>
              </View>
              <View style={{width: 45}}>
                <IconButton
                  icon="calendar"
                  size={24}
                  onPress={onChoose}
                />
              </View>
            </View>
          </View>}
          {(Platform.OS === 'ios' || show) && (
          <DateTimePicker
            value={propsForm.values.birth}
            mode="date"
            display="calendar"
            locale={locale}
            onChange={(event, value) => {
              if (value !== undefined) {
                if (Platform.OS === 'android') {
                  setShow(false);
                  const newBirth = AppHelper.getBirth(value);
                  setBirth(newBirth);
                }
                propsForm.setFieldValue('birth', value);
              } else {
                if (Platform.OS === 'android') {
                  setShow(false);
                }
              }
            }}
            textColor={colors.text}
          />
          )}
          <HelperText type="error" style={{textAlign: 'center'}}>
            {propsForm.touched.birth && propsForm.errors.birth}
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

export default connect(null)(BirthForm);
