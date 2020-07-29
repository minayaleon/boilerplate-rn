import React from 'react';
import {Text, View} from 'react-native';
import {Divider, Subheading, Title} from 'react-native-paper';
import {appStyle} from '../assets/styles/app';
import {environment} from '../environments';

const ProfileHeader = props => {
  const {title, fields} = props;

  return (
    <View style={appStyle.mrg30B}>
      <Title>{title}</Title>
      <Divider style={appStyle.mrg10TB} />
      <Subheading>Changes to your {fields} will be reflected across your
        <Text style={{fontWeight: 'bold'}}> {environment.appName}</Text> account.
      </Subheading>
    </View>
  );
};

export default ProfileHeader;
