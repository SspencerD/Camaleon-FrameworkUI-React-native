import React, { useRef, useState } from "react";
import { Platform, Text, View, Animated } from "react-native";
import styles, { Colors } from "../assets/ts/styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface Props {
  color?: string;
  icon?: string;
  size?: number;
  message: any;
}

export const ValidateErrorInput = ({ color, icon, size, message }: Props) => {
  return (
    <View
      style={{
        marginTop: "3%",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        // backgroundColor: Colors.yellow,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          //   backgroundColor: Colors.red2,
          paddingRight: "5%",
        }}
      >
        <MaterialCommunityIcons
          name={icon ?? "alert-circle"}
          color={color ?? Colors.red}
          size={size ?? 20}
        />
      </View>
      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flexDirection: "row",
          //   backgroundColor: Colors.blue2,
          width: "100%",
        }}
      >
        <Text
          style={{
            color: color ?? Colors.red,
            fontSize: 14,
            textAlign: "center",
            fontFamily: "Poppins-Medium",
            lineHeight: 21,
            letterSpacing: 0.46,
          }}
        >
          {message}
        </Text>
      </View>
    </View>
  );
};
