import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Animated,
  Dimensions,
  Platform,
  Easing,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { CustomPicker } from "react-native-custom-picker";
import styles, { Colors } from "../assets/ts/styles";

type Props = React.ComponentProps & {
  optionValue?: any;
  uidOptionValue?: string | number;
  selectedValue: string | any;
  data: any;
  label: string;
  labelValue: string;
  widthInput?: number | string;
  value?: any;
  editable?: boolean;
  errorText?: string | null;
  keyboardType?: string;
  stylesContainer?: string | {};
  stylesLabel?: string | {};
  stylesInput?: string | {};
  refPicker?: React.MutableRefObject;
  onValueChange: () => void;
  onBlur?: () => void;
  onFocus?: () => void;
  onSubmitEditing?: () => void;
  onPress: () => void;
  onPressIn: () => void;
  onPressOut: () => void;
};
const { width, height } = Dimensions.get("window");
const SelectMaterialUI: React.FC<Props> = (props) => {
  const {
    uidOptionValue,
    optionValue,
    widthInput,
    editable,
    data,
    labelValue,
    value,
    refPicker,
    stylesContainer,
    stylesLabel,
    stylesInput,
    label,
    onBlur,
    selectedValue,
    onFocus,
    onValueChange,
    errorText,
    onPress,
    onPressIn,
    onPressOut,
    ...restOfProps
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [getSelectedItem, setGetSelectedItem] = useState("");
  const [getSavedData, setGetSavedData] = useState("");

  const focusAnim = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TouchableOpacity>(null);

  let color = isFocused ? Colors.dark2 : Colors.dark2;

  if (errorText) {
    color = Colors.red;
  }

  const disabled = editable === undefined ? true : false;
  useEffect(() => {
    getSendedValue();
  }, [data, labelValue]);

  useEffect(() => {}, [disabled]);

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || !getSavedData ? (!getSelectedItem ? 0 : 1) : 1,
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }, [focusAnim, isFocused, getSavedData, getSelectedItem]);

  //Filtra y busca el valor enviado o seleccionado desde el array
  const getSendedValue = () => {
    if (labelValue) {
      const findElement = data.find((element) => {
        if (element[uidOptionValue] === labelValue) {
          setGetSavedData(element[optionValue]);
          return element[optionValue];
        }
      });
      return findElement;
    }
  };
  //! renderiza los campos enviado desde un array
  const renderField = (settings: any) => {
    const { selectedItem, getLabel } = settings;
    setGetSelectedItem(selectedItem);
    //!VERIFICA SI EL CAMPO ESTA HABILITADO
    return (
      <View
        style={{
          // flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          // backgroundColor: Colors.lightBlue1,
          width: "100%",
        }}
      >
        <View
          style={{
            // flex: 1,
            flexDirection: "row",
            justifyContent: "flex-start",
            // backgroundColor: Colors.blue2,
            width: "90%",
          }}
        >
          {selectedItem ? (
            <Text
              numberOfLines={1}
              ellipsizeMode="clip"
              maxFontSizeMultiplier={1}
              style={{
                ...stylesSelect.textSelected,
                marginStart: "2%",
                color: isFocused ? Colors.dark2 : Colors.gray4,
              }}
            >
              {getLabel(selectedItem) ?? getSavedData ?? label}
            </Text>
          ) : (
            <Text
              numberOfLines={2}
              ellipsizeMode="clip"
              maxFontSizeMultiplier={1}
              style={[
                stylesSelect.textSelected,
                {
                  color: isFocused ? Colors.dark2 : Colors.gray4,
                  overFlow: "hidden",
                  whiteSpace: "nowrap",
                  marginStart: "1%",
                },
              ]}
            >
              {getSelectedItem ?? getSavedData ?? label}
            </Text>
          )}
        </View>
        <View
          style={{
            // flex: 1,
            justifyContent: "flex-start",
            // marginEnd: "5%",
            flexDirection: "row",
            width: "10%",
            // backgroundColor: Colors.yellow,
          }}
        >
          <MaterialCommunityIcons
            name="chevron-down"
            color={
              getSavedData || getSelectedItem ? Colors.dark2 : Colors.gray4
            }
            size={25}
          />
        </View>
      </View>
    );
  };

  // ! RENDERIZA LAS OPCIONES QUE DA EL PICKER EN EL MODAL UNA VEZ ENTREGADO LOS VALORES
  const renderOption = (settings: any) => {
    const { item, getLabel, selectedItem } = settings;
    return (
      <View style={stylesSelect.optionContainer}>
        <View
          style={[
            stylesSelect.innerContainer,
            { backgroundColor: selectedItem ? Colors.gray4 : null },
          ]}
        >
          <Text style={stylesSelect.title}>{getLabel(item)}</Text>
        </View>
      </View>
    );
  };

  return disabled ? (
    <View
      style={
        stylesInput
          ? stylesInput
          : [
              stylesSelect.input,
              {
                flex: 1,
                width: "100%",
                height: 51,
                borderWidth: 1,
                borderColor: color,
                justifyContent: "flex-start",
                // backgroundColor: Colors.red2,
              },
            ]
      }
      onFocus={(event) => {
        setIsFocused(true);
        onFocus?.(event);
      }}
      onBlur={(event) => {
        setIsFocused(false);
        onBlur?.(event);
      }}
    >
      {/* VALORES A RECIBIR POR  EN EL CUSTOMPICKER */}
      <CustomPicker
        selectedValue={selectedValue}
        options={data}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
        }}
        getLabel={(item) => item[optionValue ?? getSavedData]}
        value={value}
        backdropStyle={stylesSelect.modalContentItem}
        modalAnimationType="fade"
        modalStyle={stylesSelect.modalContent}
        style={{
          // backgroundColor: Colors.green,
          width: "100%",
        }}
        fieldTemplate={renderField}
        optionTemplate={renderOption}
        placeholder={label}
        onValueChange={onValueChange}
        {...restOfProps}
      />
      <TouchableWithoutFeedback
        disabled={disabled}
        onPress={() => {
          inputRef.current?.focus();
        }}
      >
        {/* Cuando esté tiene focus realiza la animación tipica de materialUI */}
        <Animated.View
          style={
            stylesLabel
              ? stylesLabel
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
                          outputRange: [2, 0],
                        }),
                      },
                    ],
                    backgroundColor: isFocused
                      ? Colors.transparent
                      : Colors.white,
                    bottom: 42,
                    // marginLeft: "2%",
                    // marginRight: "8%",
                    marginStart: "2%",
                    paddingRight: "3%",
                    marginEnd: "5%",
                    // paddingRight:
                    //   (isFocused && label.length <= 3) || label.length <= 5
                    //     ? 20
                    //     : (!isFocused && label.length <= 3) || label.length <= 5
                    //     ? 20
                    //     : 10,
                  },
                ]
          }
        >
          {/* MUESTRA EL LABEL en su Animación */}
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
      {!!errorText && <Text style={stylesSelect.error}>{errorText}</Text>}
    </View>
  ) : (
    <View
      style={
        stylesInput
          ? stylesInput
          : [
              stylesSelect.input,
              {
                width: widthInput,
                height: 50,
                borderWidth: 1,
                borderColor: Colors.dark2,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              },
            ]
      }
      onFocus={(event) => {
        setIsFocused(true);
        onFocus?.(event);
      }}
      onBlur={(event) => {
        setIsFocused(false);
        onBlur?.(event);
      }}
    >
      <Text
        numberOfLines={20}
        ellipsizeMode="clip"
        maxFontSizeMultiplier={1}
        style={{
          ...stylesSelect.textSelected,
          color: disabled ? Colors.dark2 : Colors.gray4,
          paddingLeft: "1%",
          overFlow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {getSavedData}
      </Text>
      <View
        style={{
          alignItems: "flex-end",
          justifyContent: "flex-end",
          width: getSavedData ? "10%" : "100%",
          marginEnd: "3%",
        }}
      >
        <MaterialCommunityIcons
          name="chevron-down"
          color={Colors.gray4}
          size={25}
        />
      </View>
      <Animated.View
        style={
          stylesLabel
            ? stylesLabel
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
                  backgroundColor: isFocused ? Colors.white : Colors.white,
                  marginEnd: "8%",
                  marginStart: "2%",
                  // marginStart:
                  //   (isFocused && label.length <= 3) || label.length <= 5
                  //     ? 20
                  //     : (!isFocused && label.length <= 3) || label.length <= 5
                  //     ? 20
                  //     : 10,
                  // bottom: 42,
                  // marginLeft:
                  //   (isFocused && label.length <= 3) || label.length <= 5
                  //     ? 20
                  //     : (!isFocused && label.length <= 3) || label.length <= 5
                  //     ? 20
                  //     : 10,
                },
              ]
        }
      >
        {/* MUESTRA EL LABEL en su Animación */}
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
    </View>
  );
};

const stylesSelect = StyleSheet.create({
  input: {
    color: Colors.dark2,
    borderColor: Colors.dark2,
    borderWidth: 1,
    borderRadius: 10,
    fontFamily: "Poppins-SemiBold",
    flexDirection: "row",
    alignItems: "center",
    fontSize: 16,
    backgroundColor: Colors.white,
    height: 51,
  },
  labelContainer: {
    position: "absolute",
    zIndex: 1,
    elevation: 1,
    borderRadius: 4,
    maxHeight: 20,
  },
  label: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: Colors.dark2,
  },
  error: {
    marginTop: "5%",
    marginLeft: "6%",
    fontSize: 12,
    color: Colors.red,
    fontFamily: "Poppins-Medium",
  },
  item: {
    width: "100%",
    alignSelf: "flex-start",
    height: "13%",
    borderWidth: 0.6,
  },
  title: {
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
    color: Colors.gray4,
    textAlign: "left",
  },
  modalContent: {
    borderRadius: 10,
    borderWidth: 1,
    paddingLeft: 16,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  modalContentItem: {
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  box: {},
  optionContainer: {
    paddingVertical: 10,
    paddingHorizontal: "3%",
    borderRadius: 10,
    boderWidth: 1,
    backgroundColor: Colors.white,
  },
  optionInnerContainer: {
    backgroundColor: Colors.red,
  },
  textSelected: {
    fontFamily: "Poppins-Medium",
    lineHeight: 23.85,
    fontSize: 14,
    textAlign: "left",
  },
});

export default SelectMaterialUI;
