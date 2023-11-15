/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, useWindowDimensions, View} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  SharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';

interface PageProps {
  title: string;
  index: number;
  translateX: SharedValue<number>;
}

const Page: React.FC<PageProps> = ({index, title, translateX}) => {
  const WIDTH = useWindowDimensions().width;
  const HEIGHT = useWindowDimensions().height;
  const SIZE = WIDTH * 0.7;

  const inputRange = [(index - 1) * WIDTH, index * WIDTH, (index + 1) * WIDTH];

  const rStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      inputRange,
      [0, 1, 0],
      Extrapolate.CLAMP,
    );

    const borderRadius = interpolate(
      translateX.value,
      inputRange,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP,
    );
    return {
      borderRadius,
      transform: [{scale}],
    };
  });

  const rTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      translateX.value,
      inputRange,
      [HEIGHT / 2, 0, -HEIGHT / 2],
      Extrapolate.CLAMP,
    );

    const opacity = interpolate(
      translateX.value,
      inputRange,
      [-2, 1, -2],
      Extrapolate.CLAMP,
    );
    return {
      opacity,
      transform: [{translateY}],
    };
  });

  return (
    <View
      style={[
        {
          height: HEIGHT,
          width: WIDTH,
          backgroundColor: `rgba(0,0,256, 0.${index + 2})`,
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}>
      <Animated.View
        style={[
          rStyle,
          {
            width: SIZE,
            height: SIZE,
            backgroundColor: 'rgba(0,0,256,0.4)',
          },
        ]}
      />
      <Animated.View style={[rTextStyle, {position: 'absolute'}]}>
        <Text style={styles.text}>{title}</Text>
      </Animated.View>
    </View>
  );
};

const WORDS = ["what's", 'up', 'mobile', 'dev?'];

const InterpolateScrollView = () => {
  const translateX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    translateX.value = event.contentOffset.x;
  });
  return (
    <Animated.ScrollView
      pagingEnabled
      onScroll={scrollHandler}
      scrollEventThrottle={16}
      horizontal
      style={styles.container}>
      {WORDS.map((title, index) => {
        return (
          <Page
            key={index.toString()}
            title={title}
            index={index}
            translateX={translateX}
          />
        );
      })}
    </Animated.ScrollView>
  );
};

export default InterpolateScrollView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 64,
    color: 'white',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
