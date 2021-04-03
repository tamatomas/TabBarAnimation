import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View} from 'react-native';
import {TabBar} from './TabBar';
import {bckg} from './consts';

const Tab = createBottomTabNavigator();

const SomeComponent = () => <View style={{flex: 1, backgroundColor: bckg}} />;

export const Navigator = () => {
  return (
    <Tab.Navigator tabBar={TabBar}>
      <Tab.Screen name="Journal" component={SomeComponent} />
      <Tab.Screen name="Measure" component={SomeComponent} />
      <Tab.Screen name="Treatment" component={SomeComponent} />
      <Tab.Screen name="Profile" component={SomeComponent} />
    </Tab.Navigator>
  );
};
