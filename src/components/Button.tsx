import React from 'react';
import { TouchableOpacity, Text, StyleProp, ViewStyle, StyleSheet } from 'react-native';

interface Props {
  title: string
  onPress: ()=>void;
  style?: StyleProp<ViewStyle>

}

export const ButtonText = ({title, onPress, style}: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        ...style as any,
        ... styles.button,
      }}
    >
      <Text style={{color: 'white', textAlign: 'center'}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    width: 150,
    height:50,
    borderRadius: 50,
    justifyContent: 'center',
  },
});
