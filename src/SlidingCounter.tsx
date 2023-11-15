import {StyleSheet, View} from 'react-native';
import React from 'react';
import Sliding from './components/Sliding';

const SlidingCounter = () => {
  return (
    <View style={styles.container}>
      <Sliding />
    </View>
  );
};

export default SlidingCounter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
