import React from 'react';
import {Button, HelperText} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {keys, pick} from 'lodash';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {formStyle} from '../../assets/styles/form';
import {MainHelper} from '@codepso/rn-helper';
import {useGlobalUI} from '../../app/context/ui';
import MeService from '../../services/MeService';
import {coreState} from '../../redux/state';
import {setAuthUser} from '../../redux/actions/user';
import ProfileHeader from '../../components/ProfileHeader';
import * as navigation from '../../navigator/RootNavigation';
import {useTheme} from 'react-native-paper';

const BirthForm = (props) => {
  const {user} = props;
  const {dialogUI, blockUI} = useGlobalUI();
  const {colors} = useTheme();
  const minAge = 16;
  const maxDate = moment().subtract(minAge, 'years').toDate();

  const validationSchema = Yup.object().shape({
    birth: Yup.date()
      .required('Please enter your birthday.')
      .max(maxDate, `Must be ${minAge} years or older`)
  });

  const initialValues = pick(user, ['birth']);
  console.log(initialValues);
  if (initialValues.birth === null) {
    initialValues.birth = moment().toDate();
  } else {
    initialValues.birth = moment(initialValues.birth).toDate();
  }

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
        'Account',
        'Your profile has been updated',
        {navigation, screen: 'Profile'}
      );
    } catch (error) {
      blockUI.current.open(false);
      let message = MainHelper.getError(error);
      dialogUI.current.open('Snap!', message);
    }
  };

  const onCancel = () => {
    navigation.goBack();
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => onSend(values)}>
      {(propsForm) => (
        <View style={formStyle.panForm}>
          <ProfileHeader title="Birthday" fields="birthday" />
          <DateTimePicker
            testID="dateTimePicker"
            value={propsForm.values.birth}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={(event, value) => propsForm.setFieldValue('birth', value)}
            textColor={colors.text}
          />
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
                Cancel
              </Button>
            </View>
            <View style={{width: '50%'}}>
              <Button
                mode="contained"
                contentStyle={formStyle.btnMain}
                style={{marginLeft: 10}}
                onPress={propsForm.handleSubmit}>
                Update
              </Button>
            </View>
          </View>
        </View>
      )}
    </Formik>
  );
};

export default connect(null)(BirthForm);
