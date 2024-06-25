import {Dimensions as RNDimensions, PixelRatio, Platform} from 'react-native';
// @ts-ignore

export const headerHeight = Platform.OS === 'android' ? 250 : 210;
export const windowHeight = RNDimensions.get('window').height;
export const windowWidth = RNDimensions.get('window').width;

export const Dimensions = {
  headerHeight,
  windowHeight,
  windowWidth,
};
