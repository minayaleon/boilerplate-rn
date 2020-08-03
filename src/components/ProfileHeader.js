import React from 'react';
import {Text, View} from 'react-native';
import {Divider, Subheading, Title} from 'react-native-paper';
import i18n from 'i18n-js';
import {appStyle} from '../assets/styles/app';

const ProfileHeader = props => {
  const {title, fields} = props;

  return (
    <View style={appStyle.mrg30B}>
      <Title>{title}</Title>
      <Divider style={appStyle.mrg10TB} />
      <Subheading>
        {i18n.t('profile.txt.changes1')} <Text style={{fontWeight: 'bold'}}>{fields}</Text> {i18n.t('profile.txt.changes2')} {i18n.t('profile.txt.account')}.
      </Subheading>
    </View>
  );
};

export default ProfileHeader;
