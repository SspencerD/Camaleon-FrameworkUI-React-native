import React from "react";
import { View, Text, Platform, TouchableOpacity } from "react-native";
import styles from "../assets/ts/styles";

interface Props {
  text: string;
  opacity?: number;
  style?: any;
  styleContentText?: any;
  textProps?: any;
  width?: any;
  height?: any;
  fontColor?: string;
  disabled?: boolean;
  icon?: any;
  onPress: () => void;
}

export const ButtonSubmit = ({
  text,
  style,
  styleContentText,
  textProps,
  width,
  height,
  onPress,
  disabled,
  opacity,
  fontColor,
  icon,
}: Props) => {
  const ios = () => {
    return (
      <TouchableOpacity
        activeOpacity={opacity}
        onPress={onPress}
        style={{ ...style }}
        disabled={disabled}
      >
        <View style={styleContentText}>
          <View>{icon}</View>
          <Text style={{ ...textProps }}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const android = () => {
    return (
      <TouchableOpacity
        activeOpacity={opacity}
        onPress={onPress}
        style={{ ...style }}
        disabled={disabled}
      >
        <View style={styleContentText}>
          <View>{icon}</View>
          <Text style={{ ...textProps }}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return Platform.OS === "ios" ? ios() : android();
};
