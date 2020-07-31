import React from 'react';
import {View} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import {appStyle} from '../assets/styles/app';
import {Divider, List, Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {isEmpty, keys, pick} from 'lodash';
import Header from '../components/app/Header';
import {formStyle} from "../assets/styles/form";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {profileStyle} from '../assets/styles/profile';
import {useGlobalUI} from '../app/context/ui';
import ImagePicker from 'react-native-image-picker';
import MeService from '../services/MeService';
import {coreState} from '../redux/state';
import {setAuthUser} from '../redux/actions/user';
import ProfileAvatar from "../components/ProfileAvatar";
import AppHelper from '../helpers/AppHelper';

const ProfileScreen = (props) => {
  const {navigation, user} = props;
  const {dialogUI, blockUI} = useGlobalUI();

  const gender = !isEmpty(user.gender) ? user.gender : '...';
  const birth = !isEmpty(user.birth) ? AppHelper.getBirth(user.birth) : '...';
  const country = !isEmpty(user.country.name) ? user.country.name : '...';
  const code = !isEmpty(user.country.code) ? ', ' + user.country.code : '';

  const meService = new MeService();
  meService.setAccessToken(user.accessToken);

  console.log('profile screen');

  const goToSignOut = () => {
    dialogUI.current.open(
      'Log Out',
      'Are you sure to log out?',
      {navigation, screen: 'SignOut'},
      true);
  };

  const selectPhoto = () => {
    const options = {
      title: 'Select Profile Photo',
      customButtons: [{ name: 'remove', title: 'Remove current photo' }],
      storageOptions: {
        skipBackup: true
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        // TODO
      } else if (response.error) {
        dialogUI.current.open('ImagePicker Error', response.error);
      } else if (response.customButton) {
        const formData = {photo: null};
        uploadPhoto(formData);
      } else {
        const formData = {photo: 'data:image/jpeg;base64,' + response.data};
        uploadPhoto(formData);
      }
    });
  };

  const uploadPhoto = (formData) => {
    blockUI.current.open(true);
    meService.update(formData).then(
      (r) => {
        blockUI.current.open(false);
        const temp = pick(r.data, keys(coreState.user));
        const payload = {...user, ...temp};
        props.dispatch(setAuthUser(payload));
        dialogUI.current.open(
          'Account',
          'Your photo profile has been updated'
        );
      },
      (e) => {
        blockUI.current.open(false);
        dialogUI.current.open('Snap!', e);
      }
    );
  };

  return (
    <SafeAreaView style={appStyle.panSafeArea} forceInset={{top: 'never'}}>
      <Header content={{title: 'Profile'}} navigation={navigation} />
      <ProfileAvatar user={user} selectPhoto={selectPhoto} section="profile" />
      <KeyboardAwareScrollView keyboardShouldPersistTaps="handled">
        <View style={formStyle.panContainer}>
          <List.Item
            title={user.name}
            description="Names"
            right={props => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={profileStyle.listItemTitle}
            descriptionStyle={profileStyle.listItemDescription}
            onPress={() => navigation.navigate('Name')}
          />
          <List.Item
            title={gender}
            description="Gender"
            right={props => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={profileStyle.listItemTitle}
            descriptionStyle={profileStyle.listItemDescription}
            onPress={() => navigation.navigate('Gender')}
          />
          <List.Item
            title={birth}
            description="Birthday"
            right={props => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={profileStyle.listItemTitle}
            descriptionStyle={profileStyle.listItemDescription}
            onPress={() => navigation.navigate('Birth')}
          />
          <List.Item
            title="*********"
            description="Password"
            right={props => <List.Icon {...props} icon="chevron-right" />}
            titleStyle={profileStyle.listItemTitle}
            descriptionStyle={profileStyle.listItemDescription}
            onPress={() => navigation.navigate('Password')}
          />
          <List.Item
            title={country + code}
            description="Country"
            titleStyle={profileStyle.listItemTitle}
            descriptionStyle={profileStyle.listItemDescription}
          />
          <Divider style={appStyle.mrg10TB} />
          <Button mode="text" onPress={goToSignOut}>
            Logout
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(ProfileScreen);
