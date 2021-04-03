import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  arr,
  childItemWidth,
  iconsName,
  itemWidth,
  primary,
  width,
} from './consts';
import Animated, {
  Easing,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface tProps {
  i: number;
  name: string;
  active: Animated.SharedValue<number>;
}

const TinyBtn = ({i, name, active}: tProps) => {
  const even = (i: number) => i % 2 === 0;
  const translationX = even(i)
    ? i === 2
      ? 70 - childItemWidth
      : -70
    : -childItemWidth / 2;
  const translationY = even(i) ? 0 : -32;
  const derived = useDerivedValue(() => {
    return withTiming(active.value, {
      duration: 50 * (2 - i),
      easing: Easing.bezier(0.35, 0.23, 0.75, 0.61),
    });
  }, [active]);
  const style = useAnimatedStyle(() => {
    const translateY = Animated.interpolate(
      derived.value,
      [0, 1],
      [childItemWidth, translationY],
    );
    const translateX = Animated.interpolate(
      derived.value,
      [0, 1],
      [childItemWidth / -2, translationX],
    );
    return {transform: [{translateY}, {translateX}]};
  });
  return (
    <Animated.View style={[styles.item, style]}>
      <Entypo name={name} color={'white'} size={18} />
    </Animated.View>
  );
};

export const AddBtn = () => {
  const active = useSharedValue(0);
  const pressed = useSharedValue(0);
  const style = useAnimatedStyle(() => {
    const scale = Animated.interpolate(pressed.value, [0, 1], [1, 0.8]);
    return {transform: [{scale}]};
  });
  const shadowScale = useAnimatedStyle(() => {
    const scale = Animated.interpolate(pressed.value, [0, 1], [1, 0.8]);
    return {transform: [{scale}]};
  });
  const shadowHidden = useAnimatedStyle(() => {
    const scale = Animated.interpolate(active.value, [0, 1], [0, 1]);
    return {transform: [{scale}]};
  });
  const iconstyle = useAnimatedStyle(() => {
    const rotate = Animated.interpolate(active.value, [0, 1], [0, 45]);
    return {transform: [{rotate: `${rotate}deg`}]};
  });
  const onPress = () => {
    active.value = active.value === 1 ? withTiming(0) : withTiming(1);
  };
  return (
    <View style={styles.container}>
      <Pressable
        style={{
          position: 'absolute',
          top: -itemWidth / 2,
          left: -itemWidth / 2,
          zIndex: 1000,
        }}
        onPressIn={() => {
          pressed.value = withTiming(1, {duration: 200});
        }}
        onPress={onPress}
        onPressOut={() => {
          pressed.value = withTiming(0, {duration: 200});
        }}>
        <Animated.View style={[styles.view, style]}>
          <Animated.View style={iconstyle}>
            <IonIcons name={'add'} color={'white'} size={32} />
          </Animated.View>
        </Animated.View>
      </Pressable>
      <Animated.View style={[styles.shadowCont, shadowHidden]}>
        <Animated.View style={[styles.shadow, shadowScale]} />
      </Animated.View>
      {arr.map(i => (
        <TinyBtn i={i} key={i} name={iconsName[i]} active={active} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    width: itemWidth,
    height: itemWidth,
    borderRadius: itemWidth / 2,
    backgroundColor: primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'white',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  shadow: {
    backgroundColor: '#7f66ff3b',
    width: itemWidth + 16,
    height: itemWidth + 16,
    borderRadius: (itemWidth + 16) / 2,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
  },
  shadowCont: {
    width: itemWidth + 16,
    height: (itemWidth + 16) / 2,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    top: -(itemWidth + 16) / 2,
    left: -(itemWidth + 16) / 2,
  },
  container: {
    position: 'absolute',
    left: width / 2,
    bottom: 60,
  },
  item: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: primary,
    width: childItemWidth,
    height: childItemWidth,
    borderRadius: childItemWidth,
    top: -itemWidth,
    zIndex: 999,
  },
});
