import React from 'react';
import {View} from 'react-native';
import {useTheme, Avatar, Title, Caption, TouchableRipple} from 'react-native-paper';
import {isEmpty} from 'lodash';
import {drawerStyle} from '../assets/styles/drawer';
import {profileStyle} from '../assets/styles/profile';

const ProfileAvatar = ({user, selectPhoto, section}) => {

  const {dark} = useTheme();
  const panUserInfo = section === 'profile'? profileStyle.panUserInfo : drawerStyle.panUserInfo;
  const txtTitle = section === 'profile'? profileStyle.txtTitle : drawerStyle.txtTitle;
  const txtSubtitle = section === 'profile'? profileStyle.txtSubtitle : drawerStyle.txtSubtitle;
  const avatarSize = section === 'profile'? 160 : 60;

  const defaultSource = !dark
    ? require('../assets/images/user/light/user.png')
    : require('../assets/images/user/dark/user.png');

  const source = !isEmpty(user.photoThumbnailUrl)
    ? {uri: user.photoThumbnailUrl}
    : defaultSource;

  return (
    <View style={panUserInfo}>
      <TouchableRipple
        onPress={selectPhoto}
        rippleColor="rgba(0, 0, 0, .32)">
        <Avatar.Image size={avatarSize} source={source} />
      </TouchableRipple>
      <Title style={txtTitle}>{user.shortName}</Title>
      <Caption style={txtSubtitle}>{user.email}</Caption>
      {section === 'profile' &&
      <Caption style={txtSubtitle}>{user.country.name}</Caption>
      }
    </View>
  );
};

export default ProfileAvatar;
