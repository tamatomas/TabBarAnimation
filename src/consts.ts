import {Dimensions} from 'react-native';

//Measures
export const {width, height} = Dimensions.get('window');
export const itemWidth = 62;
export const childItemWidth = 36;

//Colors
export const primary = '#7f66ff';
export const bckg = '#151a27';

//Icons
export const iconsName = ['brush', 'edit', 'erase'];

//Consts
export const arr = Array.apply(null, Array(3)).map((val, idx) => idx);
