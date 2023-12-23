import {
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import {useRef, useState, useEffect} from 'react';
import styles from './styles';

// import OtpAutoFillViewManager from 'react-native-otp-auto-fill';

const IOSOtpScreen = ({
  style,
  sendOtp = () => {},
  enableButton = () => {},
  onChangeTextProp,
  navigation,
}) => {
  const [otp, setOtp] = useState([]);
  let hiddenTextInputRef = useRef(null);

  const CELL_DATA = [1, 2, 3, 4, 5, 6];

  const handleComplete = e => {
    const code = e.nativeEvent.code;
    setOtp(code.split(''));
  };

  useEffect(() => {
    if (otp?.length === 6) {
      sendOtp(otp);
      enableButton(true);
      hiddenTextInputRef.current.focus();
    } else {
      enableButton(false);
    }
  }, [otp]);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('blur', () => {
  //     setTimeout(() => {
  //       setOtp([]);
  //     }, 3000);
  //   });
  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    hiddenTextInputRef.current.focus();
  }, []);
  return (
    <View style={[styles.container, style]}>
      <TouchableWithoutFeedback
        onPress={() => hiddenTextInputRef.current.focus()}>
        <View style={styles.inputBoxMainContainer}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => hiddenTextInputRef.current.focus()}
            style={styles.cellsContainer}>
            {CELL_DATA.map((_, index) => {
              return (
                <View key={index} style={styles.textInput}>
                  <Text style={styles.cellText}>{otp[index]}</Text>
                </View>
              );
            })}
          </TouchableOpacity>
          <TextInput
            maxLength={6}
            autoFocus={true}
            autoComplete={'off'}
            value={otp?.join('')}
            ref={hiddenTextInputRef}
            keyboardType="number-pad"
            onChangeText={text => {
              if (typeof text !== 'undefined' && text !== null) {
                // onChangeTextProp(text);
                setOtp(text.split(''));
                if (text?.length === 6) {
                  hiddenTextInputRef.current.focus();
                }
              }
            }}
            style={styles.hiddenTextInput}
          />
        </View>
      </TouchableWithoutFeedback>
      {/* <OtpAutoFillViewManager length={6} onComplete={handleComplete} /> */}
    </View>
  );
};

export default IOSOtpScreen;
