import React from 'react';
// import {useStore} from 'react-redux'
import {useTheme} from 'react-native-paper';

const items = [
  {
    message: 'Lorem ipsum dolor sit amet consectetur adipiscing',
    bg: ''
  },
  {
    message: 'Justo dis dignissim varius fermentum convallis cursus',
    bg: ''
  },
  {
    message: 'Sollicitudin odio tortor aliquam vestibulum mauris',
    bg: ''
  }
]

export function messages() {
  // const store = useStore();
  const {dark} = useTheme();
  const theme = dark ? 'dark' : 'default';
  const bgs = {
    'default': ['#f6f6f6', '#e6e6e6', '#cccccc'],
    'dark': ['#000000', '#121212', '#1a1a1a']
  }
  items.map(function(item, index) {
    item.bg = bgs[theme][index];
    return item;
  });
  return items;
}
