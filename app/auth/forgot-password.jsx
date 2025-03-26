import React, { useState } from "react";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Fonts from "../../assets/fonts";
import SvgIcon from "../../assets/files/SvgIcon.js";

const ForgotPasswordScreen = ({ navigation }) => {
  const [inputType, setInputType] = useState("phone"); // Default to "phone"
  const [inputValue, setInputValue] = useState("");

  const handleToggle = (type) => {
    setInputType(type);
    setInputValue(""); // Reset the input field when switching
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.mainCon}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={{ padding: 20 }}>
          <Pressable onPress={() => navigation.goBack()}>
            <SvgIcon icon={"back"} width={30} height={30} />
          </Pressable>
        </View>

        <View style={{ position: "relative", bottom: 30 }}>
          <View style={styles.loginIcon}>
            <SvgIcon icon={"forgot"} width={320} height={320} />
          </View>

          <View style={styles.container}>
            <View style={styles.loginLblCon}>
              <Text style={styles.loginLbl}>Forgot Password?</Text>
            </View>

            <View style={styles.forgotDes}>
              <Text style={styles.forgotDesLbl}>
                Don't worry! It happens, please enter your {inputType === "email" ? "Email ID" : "Phone Number"} associated with your account.
              </Text>
            </View>

            {/* Toggle Between Phone and Email */}
            <View style={styles.toggleCon}>
              <Pressable
                style={[
                  styles.toggleBtn,
                  inputType === "phone" && styles.activeToggleBtn,
                ]}
                onPress={() => handleToggle("phone")}
              >
                <Text style={[styles.toggleText, inputType === "phone" && styles.activeToggleText]}>
                  Phone
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.toggleBtn,
                  inputType === "email" && styles.activeToggleBtn,
                ]}
                onPress={() => handleToggle("email")}
              >
                <Text style={[styles.toggleText, inputType === "email" && styles.activeToggleText]}>
                  Email
                </Text>
              </Pressable>
            </View>

            <View style={styles.formCon}>
              <View style={styles.textBoxCon}>
                <View style={styles.at}>
                  <SvgIcon icon={inputType === "email" ? "at" : "phone"} width={20} height={20} />
                </View>
                <View style={styles.textCon}>
                  <TextInput
                    style={styles.textInput}
                    placeholder={inputType === "email" ? "Email ID" : "Phone Number"}
                    placeholderTextColor={"#aaa"}
                    keyboardType={inputType === "email" ? "email-address" : "phone-pad"}
                    autoCapitalize="none"
                    value={inputValue}
                    onChangeText={setInputValue}
                  />
                </View>
              </View>
            </View>

            <View style={[styles.loginCon, { marginTop: 40 }]}>
              <Pressable
                style={styles.LoginBtn}
                onPress={() => navigation.navigate("EnterOTP", { inputType, inputValue })}
              >
                <Text style={styles.loginBtnLbl}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainCon: {
    backgroundColor: "#fff",
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingBottom: 40,
  },
  loginIcon: {
    alignSelf: "center",
  },
  formCon: {
    flexDirection: "column",
    justifyContent: "space-around",
  },
  container: {
    paddingHorizontal: 20,
  },
  loginLblCon: {
    position: "relative",
    bottom: 40,
  },
  loginLbl: {
    color: "#000",
    fontSize: 40,
    fontFamily: Fonts.type.NotoSansExtraBold,
  },
  at: {
    alignSelf: "center",
    width: "10%",
  },
  textBoxCon: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textCon: {
    width: "90%",
  },
  textInput: {
    borderBottomColor: "#aaa",
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    color: "#000",
    fontSize: 16,
    fontFamily: Fonts.type.NotoSansMedium,
    height: 40,
  },

  LoginBtn: {
    backgroundColor: "#0057ff",
    borderRadius: 20,
  },
  loginBtnLbl: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: Fonts.type.NotoSansBlack,
    color: "#fff",
    paddingVertical: 10,
  },

  forgotDes: {
    position: "relative",
    bottom: 35,
  },
  forgotDesLbl: {
    color: "#000",
    fontFamily: Fonts.type.NotoSansRegular,
  },

  // Toggle Styles
  toggleCon: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 15,
  },
  toggleBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 20,
  },
  toggleText: {
    fontSize: 16,
    fontFamily: Fonts.type.NotoSansMedium,
    color: "#aaa",
  },
  activeToggleBtn: {
    backgroundColor: "#0057ff",
  },
  activeToggleText: {
    color: "#fff",
  },
});

export default ForgotPasswordScreen;
