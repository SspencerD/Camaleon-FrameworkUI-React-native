import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Dimensions,
  Platform,
  Animated,
  Easing,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import styles, { Colors } from "../assets/ts/styles";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const { width, height } = Dimensions.get("window");

type Props = React.ComponentProps<typeof TextInput> & {
  label: string;
  value: string | number;
  errorText?: string | null;
  stylesContainer?: string | {};
  stylesLabel?: string | {};
  stylesInput?: string | {};
  onChange: () => void;
  onSubmitEditing?: () => void;
  onPress?: () => void;
  onPressIn?: () => void;
  onPressOut?: () => void;
};

const PickerMaterialUI: React.FC<Props> = (props) => {
  const {
    stylesContainer,
    stylesLabel,
    stylesInput,
    label,
    onBlur,
    value,
    onFocus,
    errorText,
    onPress,
    onPressIn,
    onPressOut,
    ...restOfProps
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  const focusAnim = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<View>(null);

  let color = isFocused ? Colors.dark1 : Colors.dark2;

  if (errorText) {
    color = Colors.red;
  }

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || !!value ? 1 : 0,
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }, [focusAnim, isFocused, value]);

  return (
    <View style={stylesContainer ? stylesContainer : styles}>
      <TouchableOpacity
        accessibilityRole="button"
        {...restOfProps}
        onPressOut={onPressOut}
        onPress={onPress}
        onPressIn={() => {
          setIsFocused(true);
        }}
        style={{
          ...styles.MaterialUI_InputStyle,
          borderWidth: 1,
          borderColor: color,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          ...stylesInput,
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            // backgroundColor: Colors.red2,
            marginHorizontal: "5%",
          }}
        >
          <Text
            style={{
              ...styles.MaterialUI_Label,
              color: Colors.dark2,
              fontFamily: "Poppins-SemiBold",
              fontSize: 16,
              left: value.length >= 5 ? "10%" : "20%",
            }}
          >
            {value}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            // backgroundColor: Colors.blue,
            paddingRight: "5%",
          }}
        >
          <MaterialCommunityIcons
            name="calendar"
            size={20}
            // color={isFocused ? Colors.dark2 : Colors.dark1}
            style={styles.MaterialUI_IputIcon}
          />
        </View>
      </TouchableOpacity>
      <TouchableWithoutFeedback
        onPress={() => {
          inputRef.current?.focus();
        }}
      >
        <Animated.View
          style={
            stylesLabel
              ? [
                  {
                    transform: [
                      {
                        scale: focusAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1.11, 0.8],
                        }),
                      },
                      {
                        translateY: focusAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [23, -12],
                        }),
                      },
                      {
                        translateX: focusAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [16, 12],
                        }),
                      },
                    ],
                    backgroundColor: Colors.transparent,
                    marginStart:
                      (isFocused && label.length <= 3) || label.length <= 5
                        ? 10
                        : (!isFocused && label.length <= 3) || label.length <= 5
                        ? 20
                        : 10,
                    bottom: isFocused ? 42 : 42,
                    marginLeft:
                      (isFocused && label.length <= 3) || label.length <= 5
                        ? 20
                        : (!isFocused && label.length <= 3) || label.length <= 5
                        ? 20
                        : 10,
                    ...stylesLabel,
                  },
                ]
              : [
                  styles.MaterialUI_LabelContainer,
                  {
                    transform: [
                      {
                        scale: focusAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1.11, 0.8],
                        }),
                      },
                      {
                        translateY: focusAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [26, 4],
                        }),
                      },
                      {
                        translateX: focusAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [2, -6],
                        }),
                      },
                    ],
                    backgroundColor: isFocused ? Colors.white : Colors.white,
                    marginStart: "2%",
                    paddingRight: "3%",
                    marginEnd: "3%",
                    // paddingLeft: isFocused ? "2%" : null,
                    bottom: 42,
                  },
                ]
          }
        >
          <Text
            style={[
              styles.MaterialUI_Label,
              {
                color: isFocused ? Colors.dark2 : Colors.gray4,
                left: label.length >= 5 || label.length >= 3 ? 10 : null,
              },
            ]}
          >
            {label}
            {errorText ? "*" : ""}
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      {!!errorText && <Text style={styles.MaterialUI_Errors}>{errorText}</Text>}
    </View>
  );
};

export default PickerMaterialUI;
