import React from "react";
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { Colors } from "../assets/ts/styles";

export const SnackBarInfo = (props) => {
  const {
    route,
    navigation,
    messageInfo,
    setHandleModal,
    setMessageInfo,
    setWarningModal,
    setMessageCardBlock,
    logOut,
    setHandleBackModal,
    setVerifyCloseApp,
    eliminarCuenta,
    setmodalVerifyInfo,
    setModalTimeOutCloseSession,
    setModalTimeOut,
    setSnackModalRechargePhone,
    setSteps,
    setWarningMessage,
    setSnackModal,
    value,
  } = props;
  const {
    title,
    message,
    message2,
    optionalMessage,
    valueProps,
    buttons,
    direction,
  } = messageInfo;

  const handleSuccess = () => {
    if (logOut) {
      setHandleModal(false);
      logOut();
    } else if (setHandleBackModal) {
      setHandleBackModal(false);
    } else if (setmodalVerifyInfo) {
      setmodalVerifyInfo(false);
      navigation.navigate("RecoveryPin");
    } else if (direction === "2fa") {
      setHandleModal(false);
      navigation.navigate("NewDoubleFactor");
    } else if (direction === "VerifyPhone") {
      setHandleModal(false);
      navigation.navigate("VerifyPhone");
    } else if (setHandleModal) {
      setHandleModal(false);
    } else if (setSnackModal) {
      setSnackModal(false);
      navigation.navigate("Initial");
    } else if (direction === "2fa") {
      setHandleModal(false);
      navigation.navigate("NewDoubleFactor");
    } else if (direction === "VerifyPhone") {
      setHandleModal(false);
      navigation.navigate("VerifyPhone");
    } else if (setWarningMessage) {
      setWarningMessage(false);
      navigation.navigate("2factor", {
        activeCard: true,
      });
    } else if (eliminarCuenta) {
      setWarningMessage(false);
      navigation.navigate("2factor", {
        activeCard: true,
      });
    } else if (setMessageCardBlock) {
      setMessageCardBlock(false);
      navigation.navigate("2factor", {
        renewCard: true,
      });
    } else if (setWarningModal) {
      setWarningModal(false);
      navigation.navigate("2factor", {
        unlockCard: true,
        Title: "Desbloqueo Temporal",
      });
    } else if (setSnackModalRechargePhone) {
      setSnackModalRechargePhone(false);
      setSteps(2);
    }
  };

  const handleCancel = () => {
    if (setHandleBackModal) {
      BackHandler.exitApp();
      setHandleBackModal(false);
    } else if (setVerifyCloseApp) {
      setVerifyCloseApp(true);
      setHandleModal(false);
    } else if (setmodalVerifyInfo) {
      BackHandler.exitApp();
      setmodalVerifyInfo(false);
    } else if (setHandleModal) {
      setHandleModal(false);
    } else if (logOut) {
      setHandleModal(false);
    } else if (setSnackModal) {
      setSnackModal(false);
    } else if (setWarningMessage) {
      setWarningMessage(false);
    } else if (setMessageCardBlock) {
      setMessageCardBlock(false);
    } else if (setWarningModal) {
      setWarningModal(false);
    } else if (setSnackModalRechargePhone) {
      setSnackModalRechargePhone(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: "9%",
      }}
    >
      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          paddingHorizontal: "5%",
          paddingVertical: "5%",
          height: valueProps || message?.length > 70 ? "40%" : "30%",
          maxHeight: "50%",
          backgroundColor: Colors.white,
          borderRadius: 5,
        }}
      >
        <Text
          style={{
            fontSize: 16,
            fontFamily: "Poppins-SemiBold",
            textAlign: "center",
            color: value ? value["thirdColorText"] : Colors.dark2,
            lineHeight: 25,
            paddingBottom: "5%",
          }}
        >
          {title}
        </Text>
        {valueProps ? (
          <Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Poppins-Regular",
                lineHeight: 20.08,
                letterSpacing: 0.46,
                color: value ? value["thirdColorText"] : Colors.dark2,
              }}
            >
              {message}
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins-Regular",
                  lineHeight: 20.08,
                  letterSpacing: 0.46,
                  color: value ? value["thirdColorText"] : Colors.dark2,
                }}
              >
                {valueProps}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins-Regular",
                  lineHeight: 20.08,
                  letterSpacing: 0.46,
                  color: value ? value["thirdColorText"] : Colors.dark2,
                }}
              >
                {message2}
              </Text>
              <Text>
                {"\n"}
                {"\n"}
              </Text>
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Poppins-Regular",
                lineHeight: 20.08,
                letterSpacing: 0.46,
                color: value ? value["thirdColorText"] : Colors.dark2,
                paddingBottom: "10%",
              }}
            >
              {optionalMessage}
            </Text>
          </Text>
        ) : eliminarCuenta ? (
          <Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins-Regular",
                lineHeight: 20.08,
                letterSpacing: 0.46,
                color: value ? value["thirdColorText"] : Colors.dark2,
              }}
            >
              {console.log("si")}
              {message}
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins-Regular",
                  lineHeight: 20.08,
                  letterSpacing: 0.46,
                  color: value ? value["thirdColorText"] : Colors.dark2,
                }}
              >
                {valueProps}
              </Text>
              <Text>
                {"\n"}
                {"\n"}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: "Poppins-Regular",
                  lineHeight: 21,
                  letterSpacing: 0.46,
                  color: value ? value["thirdColorText"] : Colors.dark2,
                }}
              >
                {message2}
              </Text>
              <Text>
                {"\n"}
                {"\n"}
              </Text>
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins-Regular",
                lineHeight: 20.08,
                letterSpacing: 0.46,
                color: value ? value["thirdColorText"] : Colors.dark2,
                paddingBottom: "10%",
              }}
            >
              {optionalMessage}
            </Text>
            <Text>
              {"\n"}
              {"\n"}
            </Text>
          </Text>
        ) : (
          <View>
            <Text
              style={{
                fontSize: 16,
                fontFamily: "Poppins-Regular",
                lineHeight: 20.08,
                letterSpacing: 0.46,
                color: value ? value["thirdColorText"] : Colors.dark2,
                paddingBottom: "10%",
              }}
            >
              {message}
            </Text>
          </View>
        )}
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "flex-start",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={handleCancel}
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-start",
              }}
            >
              <Text
                style={{
                  color: "#757575",
                  fontFamily: "Poppins-Medium",
                  fontSize: 16,
                  lineHeight: 24,
                  letterSpacing: 0.4,
                }}
              >
                {buttons["cancel"] ? buttons["cancel"] : null}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSuccess}
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <Text
                style={{
                  color: value ? value["primaryColorText"] : Colors.blue,
                  fontFamily: "Poppins-Medium",
                  fontSize: 16,
                  lineHeight: 24,
                  letterSpacing: 0.4,
                }}
              >
                {buttons["success"] ? buttons["success"] : null}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentModal: {
    backgroundColor: Colors.white,
    paddingVertical: Platform.OS === "ios" ? "3%" : "5%",
    paddingHorizontal: "5%",
    // marginTop: '90%',
    marginHorizontal: "10%",
    borderRadius: 5,
  },
  contentTitleModal: {
    alignItems: "flex-start",
  },
  titleModal: {
    fontSize: 18,
    fontFamily: "Poppins-Medium",
    textAlign: "center",
  },
  contentIcon: {
    alignSelf: "center",
  },
  messageBodyModal: {
    alignItems: "flex-start",
    marginTop: "5%",
  },
  spaceBetweenMessage: {},
  valueMessage: {
    fontSize: 14,
    color: "#6C6C6C",
    fontFamily: "Poppins-Medium",
  },
  messageModalText: {
    fontSize: 14,
    fontFamily: "Poppins-Medium",
    color: "#6C6C6C",
    textAlign: "left",
  },
  contentButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: "5%",
    width: "100%",
  },
  successButton: {
    color: Colors.lightBlue1,
    fontFamily: "Poppins-Medium",
    fontSize: 14,
  },
  cancelButton: {
    color: "#8E9397",
    fontFamily: "Poppins-Medium",
    fontSize: 14,
  },
});
