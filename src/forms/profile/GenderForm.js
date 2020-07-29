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

const GenderForm = (props) => {
  const {user} = props;
  const {dialogUI, blockUI} = useGlobalUI();

  const schema = Yup.object().shape({
    gender: Yup.string().required('Please enter your gender.').nullable(),
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
      validationSchema={schema}
      onSubmit={(values) => onSend(values)}>
      {(propsForm) => (
        <View style={formStyle.panForm}>
          <ProfileHeader title="Gender" fields="gender" />
          <RadioButton.Group
            onValueChange={value => propsForm.setFieldValue('gender', value)}
            value={propsForm.values.gender}>
            <RadioButton.Item label="Male" value="M" />
            <RadioButton.Item label="Female" value="F" />
            <RadioButton.Item label="Other" value="O" />
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

export default connect(null)(GenderForm);
