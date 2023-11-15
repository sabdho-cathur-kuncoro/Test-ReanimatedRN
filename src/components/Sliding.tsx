/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

const clamp = (value: number, min: number, max: number) => {
  'worklet';
  return Math.min(Math.max(value, min), max);
};

const BUTTON_WIDTH = 170;
const TapComponent = Animated.createAnimatedComponent(TouchableOpacity);

const Sliding = () => {
  const [count, setCount] = useState(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const MAX_SLIDE_OFFSET = BUTTON_WIDTH * 0.3;

  // wrapper function
  const incrementCount = useCallback(() => {
    // external library function
    setCount(currCount => currCount + 1);
  }, []);
  // wrapper function
  const decrementCount = useCallback(() => {
    // external library function
    setCount(currCount => (currCount < 1 ? 0 : currCount - 1));
  }, []);
  // wrapper function
  const resetCount = useCallback(() => {
    // external library function
    setCount(0);
  }, []);

  const onPangestureHandler =
    useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
      onActive: event => {
        translateX.value = clamp(
          event.translationX,
          -MAX_SLIDE_OFFSET,
          MAX_SLIDE_OFFSET,
        );
        translateY.value = clamp(event.translationY, 0, MAX_SLIDE_OFFSET);
      },
      onEnd: () => {
        if (translateY.value === MAX_SLIDE_OFFSET) {
          runOnJS(resetCount)();
        } else if (translateX.value === MAX_SLIDE_OFFSET) {
          // Increment
          runOnJS(incrementCount)();
        } else if (translateX.value === -MAX_SLIDE_OFFSET) {
          // Decrement
          runOnJS(decrementCount)();
        }
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      },
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  }, []);

  const rPlusMinusStyle = useAnimatedStyle(() => {
    const opacityX = interpolate(
      translateX.value,
      [-MAX_SLIDE_OFFSET, 0, MAX_SLIDE_OFFSET],
      [0.4, 0.8, 0.4],
    );
    const opacityY = interpolate(
      translateY.value,
      [0, MAX_SLIDE_OFFSET],
      [1, 0],
    );
    return {
      opacity: opacityX * opacityY,
    };
  }, []);

  const rCloseStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, MAX_SLIDE_OFFSET],
      [0, 0.8],
    );
    return {
      opacity,
    };
  }, []);
  const rButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value * 0.1},
        {translateY: translateY.value * 0.1},
      ],
    };
  }, []);
  return (
    <Animated.View style={[styles.button, rButtonStyle]}>
      <TapComponent style={[rPlusMinusStyle]}>
        <Text style={{fontSize: 40, color: 'white'}}>-</Text>
      </TapComponent>
      <TapComponent style={[rCloseStyle]}>
        <Text style={{fontSize: 32, color: 'white'}}>x</Text>
      </TapComponent>
      <TapComponent style={[rPlusMinusStyle]}>
        <Text style={{fontSize: 40, color: 'white'}}>+</Text>
      </TapComponent>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <PanGestureHandler onGestureEvent={onPangestureHandler}>
          <Animated.View style={[styles.circle, rStyle]}>
            <Text style={[styles.countText]}>{count}</Text>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </Animated.View>
  );
};

export default Sliding;

const styles = StyleSheet.create({
  button: {
    width: BUTTON_WIDTH,
    height: 70,
    backgroundColor: '#111111',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  countText: {
    fontSize: 25,
    color: 'white',
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#232323',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
