/* eslint-disable react-native/no-inline-styles */
import {FlatList, StyleSheet, View, ViewToken} from 'react-native';
import React from 'react';
import ListItemFlatlist from './components/ListItemFlatlist';
import {useSharedValue} from 'react-native-reanimated';

const data = new Array(50).fill(0).map((_, index) => ({id: index}));

const AnimatedFlatlist = () => {
  const viewableItems = useSharedValue<ViewToken[]>([]);
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        contentContainerStyle={{paddingTop: 50}}
        onViewableItemsChanged={({viewableItems: vItems}) => {
          viewableItems.value = vItems;
        }}
        renderItem={({item}) => {
          return <ListItemFlatlist item={item} viewableItems={viewableItems} />;
        }}
      />
    </View>
  );
};

export default AnimatedFlatlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
