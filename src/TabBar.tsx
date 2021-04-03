import React from 'react';
import {
  BottomTabBarOptions,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {primary} from './consts';
import {AddBtn} from './FloatingBtn';

export const TabBar = ({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps<BottomTabBarOptions>) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <>
      <AddBtn />
      <View style={styles.view}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
          const half_length = Math.ceil(state.routes.length / 2);
          const midLeft = half_length - 1 === index;
          const midRight = half_length === index;
          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                styles.item,
                midLeft && styles.itemRight,
                midRight && styles.itemLeft,
              ]}>
              {index === 0 && (
                <IonIcons
                  name={'journal-outline'}
                  style={[styles.icon, isFocused && styles.focused]}
                  size={24}
                />
              )}
              {index === 1 && (
                <IonIcons
                  name={'ios-heart-outline'}
                  style={[styles.icon, isFocused && styles.focused]}
                  size={24}
                />
              )}
              {index === 2 && (
                <MaterialCommunityIcons
                  name={'pill'}
                  style={[styles.icon, isFocused && styles.focused]}
                  size={24}
                />
              )}
              {index === 3 && (
                <Feather
                  name={'user'}
                  style={[styles.icon, isFocused && styles.focused]}
                  size={24}
                />
              )}
              <Text style={[styles.icon, isFocused && styles.focused]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemLeft: {
    marginLeft: 32,
  },
  itemRight: {
    marginRight: 32,
  },
  text: {
    color: '#c7c7c7',
  },
  icon: {
    color: '#c7c7c7',
  },
  focused: {
    color: primary,
  },
});
