import React from 'react';
import {Appbar} from 'react-native-paper';
import * as navigation from '../../navigator/RootNavigation';

const Header = (props) => {
  const {content} = props;
  let withBack = false;

  // Check back
  if (props.hasOwnProperty('withBack')) {
    withBack = true;
  }

  // Check subtitle
  if (!content.hasOwnProperty('subtitle')) {
    content.subtitle = '';
  }

  const _openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <Appbar.Header>
      {withBack
        ? <Appbar.BackAction onPress={() => navigation.goBack()} />
        : <Appbar.Action icon="menu" onPress={_openDrawer} />
      }
      <Appbar.Content title={content.title} subtitle={content.subtitle} />
    </Appbar.Header>
  );
};

export default Header;
