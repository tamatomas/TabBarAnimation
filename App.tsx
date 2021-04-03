import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Navigator} from './src';

const App = () => {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.view}>
        <Navigator />
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#151a27',
  },
});

export default App;
