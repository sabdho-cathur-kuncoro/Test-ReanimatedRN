/* eslint-disable react-native/no-inline-styles */
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import ListItemSwipe from './components/ListItemSwipe';
import {ScrollView} from 'react-native-gesture-handler';

const TITLES: string[] = [
  'Record the dismissible tutorial',
  'Leave 👍🏻 to the tutorial',
  'Check youtube comments',
  'Subscribe to the channel 🚀',
  'Leave a ⭐️ on the Github Repo',
];

export interface TaskInterface {
  title: string;
  index: number;
}

const TASKS: TaskInterface[] = TITLES.map((title, index) => ({title, index}));

const BACKGROUND_COLOR = '#FAFBFF';

const SwipetoDelete = () => {
  const [tasks, setTasks] = useState(TASKS);

  const scrollRef = useRef(null);

  const onDismiss = useCallback((task: TaskInterface) => {
    setTasks(taskss => taskss.filter(item => item.index !== task.index));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Tasks</Text>
      <ScrollView ref={scrollRef} style={{flex: 1}}>
        {tasks.map(task => (
          <ListItemSwipe
            simultaneousHandlers={scrollRef}
            key={task.index}
            task={task}
            onDismiss={onDismiss}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SwipetoDelete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  title: {
    fontSize: 50,
    marginVertical: 20,
    paddingLeft: '6%',
  },
});
