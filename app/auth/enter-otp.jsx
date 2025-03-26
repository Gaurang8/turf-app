import React, { useState, useRef } from "react";
import {
  Text,
  View,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";
import SvgIcon from "../../assets/files/SvgIcon";

const OTPScreen = ({ navigation }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const handleOTPChange = (index, value) => {
    if (value.length > 1) return; // Allow only one character per box

    // setOtp((prevOtp) => {
    //   const newOtp = [...prevOtp];
    //   newOtp[index] = value;

    //   // If OTP is complete, navigate to the next screen
    //   if (newOtp.join("").length === 4) {
    //     navigation.navigate("ResetPassword");
    //   }

    //   return newOtp;
    // });

    let oldOtp = otp;
    oldOtp[index] = value;
    
    setOtp(oldOtp);

    // if (oldOtp.join("").length === 4) {
    //   navigation.navigate("ResetPassword");
    // }

    // Move to the next input field
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const resendOTP = () => {
    // Implement resend OTP functionality
  };

  return (
    <KeyboardAvoidingView behavior="position" style={styles.mainCon}>
      <View style={{ padding: 20 }}>
        <Pressable onPress={() => navigation.goBack()}>
          <SvgIcon icon={"back"} width={30} height={30} />
        </Pressable>
      </View>
      <View style={{ position: "relative", bottom: 30 }}>
        <View style={styles.loginIcon}>
          <SvgIcon icon={"enterOtp"} width={280} height={280} />
        </View>
        <View style={styles.container}>
          <View style={styles.loginLblCon}>
            <Text style={styles.loginLbl}>Enter OTP?</Text>
          </View>
          <View style={styles.forgotDes}>
            <Text style={styles.forgotDesLbl}>A 4-digit code has been sent to</Text>
            <Text style={styles.forgotDesLbl}>+91 1234567890</Text>
          </View>
          <View style={styles.formCon}>
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  style={styles.otpInput}
                  keyboardType="numeric"
                  maxLength={1}
                  value={digit}
                  onChangeText={(value) => handleOTPChange(index, value)}
                  autoFocus={index === 0}
                />
              ))}
            </View>
            <Pressable onPress={resendOTP}>
              <Text style={styles.registerLbl}>Resend OTP</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainCon: {
    backgroundColor: "#fff",
    flex: 1,
  },
  loginIcon: {
    alignSelf: "center",
  },
  formCon: {
    alignItems: "center",
  },
  container: {
    paddingHorizontal: 20,
    marginTop: 50,
  },
  loginLblCon: {
    position: "relative",
    bottom: 40,
  },
  loginLbl: {
    color: "#000",
    fontSize: 40,
  },
  forgotDes: {
    position: "relative",
    bottom: 35,
  },
  forgotDesLbl: {
    color: "#000",
  },
  registerLbl: {
    color: "#0057ff",
    fontSize: 16,
    fontWeight: "bold",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#000",
    textAlign: "center",
    fontSize: 20,
    marginHorizontal: 5,
    borderRadius: 10,
  },
});

export default OTPScreen;
