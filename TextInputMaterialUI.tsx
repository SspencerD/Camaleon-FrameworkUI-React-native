import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  Dimensions,
  View,
  Text,
  Animated,
  Easing,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import styles, { Colors } from "../assets/ts/styles";

const { width, height } = Dimensions.get("window");

type Props = React.ComponentProps<typeof TextInput> & {
  label: string;
  editable?: boolean;
  value: string | number;
  focusable?: boolean;
  errorText?: string | null;
  onBlur?: any;
  keyboardType?: string;
  stylesContainer?: string | {};
  stylesLabel?: string | {};
  stylesInput?: string | {};
  onChangeText: () => void;
  onSubmitEditing?: () => void;
};

const TextInputMaterialUI: React.FC<Props> = (props) => {
  const {
    editable,
    refInput,
    focusable,
    stylesContainer,
    stylesLabel,
    stylesInput,
    label,
    onBlur,
    onEndEditing,
    value,
    onChangeText,
    onFocus,
    onSubmitEditing,
    errorText,
    keyboardType,
    ...restOfProps
  } = props;

  const [isFocused, setIsFocused] = useState(focusable);

  const focusAnim = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput>(null);

  let color = isFocused ? Colors.dark2 : Colors.dark2;

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
      <TextInput
        style={{
          ...styles.MaterialUI_InputStyle,
          borderWidth: 1,
          borderColor: color,
          color: editable ? Colors.dark2 : Colors.gray4,
          ...stylesInput,
        }}
        keyboardType={keyboardType}
        editable={editable}
        value={value}
        ref={inputRef}
        {...restOfProps}
        onSubmitEditing={onSubmitEditing}
        onBlur={(event) => {
          setIsFocused(false);
          onBlur?.(event);
        }}
        onEndEditing={onEndEditing}
        onChangeText={onChangeText}
        onFocus={(event) => {
          setIsFocused(true);
          onFocus?.(event);
        }}
      />
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
                          outputRange: [16, -12],
                        }),
                      },
                    ],
                    backgroundColor: isFocused
                      ? Colors.transparent
                      : Colors.transparent,
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
                    marginStart: "3%",
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

export default TextInputMaterialUI;
