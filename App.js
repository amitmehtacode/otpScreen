import {Platform, StyleSheet, View} from 'react-native';
import React, {useRef, useState} from 'react';
import IOSOtpScreen from './src/components/iOSOtpScreen';
import AndroidOtpScreen from './src/components/androidOtpScreen';

const App = () => {
  const [autoOtp, setAutoOtp] = useState([]);
  const [hashCode, setHashCode] = useState('');
  let otpRef = useRef([]);

  const handleComplete = e => {
    if (e) {
      // setIsApiInProgress(true);
    }
    const code = e.nativeEvent.code;
    otpRef.current = code?.split('');
    setAutoOtp(code?.split(''));
    // setButtonDisable(false);
  };

  const handleOnAndroidSignature = ({nativeEvent: {code}}) => {
    setHashCode(code);
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      {Platform.OS === 'android' ? (
        <AndroidOtpScreen
          length={6}
          inputStyle={styles.inputStyle}
          style={styles.inputContainer}
          // navigation={navigation}
          // callback={e => {
          //   if (e) {
          //     onOptTextInputChange(e);
          //     otpRef.current = Object.values(e || {});
          //   }
          // }}
          // onChangeTextProp={() => {
          //   renderRefAlt.current = true;
          // }}
          // autoOtp={autoOtp}
          // onSubmitEditing={() => {
          //   otpRef.current?.length === 6 && onVerifyPress();
          // }}
        />
      ) : (
        <IOSOtpScreen />
      )}
      {/* <OtpAutoFillViewManager
        length={6}
        onComplete={handleComplete}
        onAndroidSignature={handleOnAndroidSignature}
      /> */}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  inputStyle: {
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    color: '#333333',

    borderColor: '#D6D6D6',
    fontSize: 14,
    width: 47,
    height: 48,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 35,
    paddingHorizontal: Platform.OS === 'android' ? 24 : null,
  },
});
