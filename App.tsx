import React, { useState } from "react";
import { SafeAreaView, Platform, Text, BackHandler, Alert, StyleSheet, TouchableOpacity } from "react-native";
import RNExitApp from "react-native-exit-app";
import ReactNativeBiometrics, { BiometryTypes } from "react-native-biometrics";
const rnBiometrics = new ReactNativeBiometrics({
  allowDeviceCredentials: true,
});

const App = () => {
  const [fingerStatus, setFingerStatus] = useState(false);

  const scanFingerPrint = () => {
    rnBiometrics.isSensorAvailable().then(async (resultObject: any) => {

      const { available, biometryType } = resultObject;
      setFingerStatus(available);


      if (available && biometryType === BiometryTypes.TouchID) {
        rnBiometrics
          .simplePrompt({
            promptMessage: "Sign in with Touch ID",
          })
          .then((result: any) => {
            if (result?.success) {
              Alert.alert("Success", "TouchId verified")
            }
            if (result?.error) {
              Platform.OS === "ios"
                ? RNExitApp.exitApp()
                : BackHandler.exitApp();
            }
          })
          .catch((err: any) => Alert.alert("Error", err));
      } else if (available && biometryType === BiometryTypes.FaceID) {
        rnBiometrics
          .simplePrompt({
            promptMessage: "Sign in with Face ID",
          })
          .then((result: any) => {
            if (result?.success) {
              Alert.alert("Success", "Face id verified")
            }
            if (result?.error) {
              Platform.OS === "ios"
                ? RNExitApp.exitApp()
                : BackHandler.exitApp();
            }
          })
          .catch((err: any) => Alert.alert("Error", err));
      } else if (available && biometryType === BiometryTypes.Biometrics) {
        rnBiometrics
          .simplePrompt({
            promptMessage: "Sign in with Biometrics",
          })
          .then(async (result: any) => {
            if (result?.success) {
              Alert.alert("Success", "Biometrics verified")
            }
            if (result?.error) {
              Platform.OS === "ios"
                ? RNExitApp.exitApp()
                : BackHandler.exitApp();
            }
          })
          .catch((err: any) => Alert.alert("Error", err));
      };
    })
  }


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textFingerStatus}>Finger status is {String(fingerStatus)}</Text>
      <TouchableOpacity style={styles.touchLogin} onPress={() => scanFingerPrint()}>
        <Text style={styles.textLogin}>Login </Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}


export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
  textFingerStatus: {
    fontSize: 16,
    color: 'black',
    alignSelf: 'center'
  },
  touchLogin: {
    height: 60,
    width: 220,
    borderRadius: 10,
    backgroundColor: 'blue',
    justifyContent: 'center',
    marginTop: 10,
    alignSelf: 'center'
  },
  textLogin: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center'
  }
})