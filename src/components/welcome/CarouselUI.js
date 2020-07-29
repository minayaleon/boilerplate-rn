import React, {useState} from 'react';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Dimensions, View} from 'react-native';
import {Text, useTheme} from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;

const CarouselUI = props => {
  const [active, setActive] = useState(0);
  const {colors} = useTheme();

  const renderItem = ({item}) => {
    return (
      <View style={{padding: 30}}>
        <Text style={{fontSize: 20, textAlign: 'center'}}>{item.message}</Text>
      </View>
    );
  }

  return (
    <View>
      <Carousel
        data={props.messages}
        sliderWidth={windowWidth}
        sliderHeight={200}
        itemWidth={windowWidth}
        renderItem={renderItem}
        //autoplay={true}
        //loop={true}
        autoplayInterval={5000}
        inactiveSlideScale={1}
        onSnapToItem={(index) => {
          props.setBg(props.messages[index].bg);
          setActive(index);
        }}
      />
      <Pagination
        dotsLength={props.messages.length}
        activeDotIndex={active}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 1,
          backgroundColor: colors.text
        }}
      />
    </View>
  );
}

export default CarouselUI;
