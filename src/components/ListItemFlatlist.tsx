/* eslint-disable react-native/no-inline-styles */
import {ViewToken} from 'react-native';
import React from 'react';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

type ListItemProps = {
  viewableItems: SharedValue<ViewToken[]>;
  item: {
    id: number;
  };
};

const ListItemFlatlist: React.FC<ListItemProps> = React.memo(
  ({item, viewableItems}) => {
    const rStyle = useAnimatedStyle(() => {
      const isVisible = Boolean(
        viewableItems.value
          .filter(items => items.isViewable)
          .find(vItems => vItems.item.id === item.id),
      );
      return {
        opacity: withTiming(isVisible ? 1 : 0),
        transform: [{scale: withTiming(isVisible ? 1 : 0.6)}],
      };
    }, []);
    return (
      <Animated.View
        style={[
          {
            width: '90%',
            height: 80,
            backgroundColor: 'salmon',
            marginVertical: 10,
            borderRadius: 16,
            alignSelf: 'center',
          },
          rStyle,
        ]}
      />
    );
  },
);

export default ListItemFlatlist;
