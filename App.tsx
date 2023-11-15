/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SlidingCounter from './src/SlidingCounter';
// import AnimatedFlatlist from './src/AnimatedFlatlist';
// import DrawerAnimation from './src/DrawerAnimation';
// import RippleEffect from './src/RippleEffect';
// import CircularProgressBar from './src/CircularProgressBar';
// import SwipetoDelete from './src/SwipetoDelete';
// import ColorPicker from './src/ColorPicker';
// import InterpolateScrollView from './src/InterpolateScrollView';
// import PinchGesture from './src/PinchGesture';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SlidingCounter />
    </GestureHandlerRootView>
  );
}

export default App;
