import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Ripple from './components/Ripple';

const RippleEffect = () => {
  return (
    <View style={styles.container}>
      <Ripple style={styles.ripple} onTap={() => console.log('tap')}>
        <Text style={styles.rippleText}>Tap</Text>
      </Ripple>
    </View>
  );
};

export default RippleEffect;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ripple: {
    width: 200,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 20,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rippleText: {
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 4,
  },
});
