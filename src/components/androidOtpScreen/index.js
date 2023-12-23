import {View, TextInput, Platform} from 'react-native';
import React, {useState, useEffect, memo} from 'react';

const AndroidOtpScreen = ({
  style,
  length,
  autoOtp,
  callback,
  resetFocus,
  focusTo2nd,
  inputStyle,
  selectionColor,
  onSubmitEditing,
  clearData = false,
  autoFocusDisabled,
  underlineColorAndroid,
  secureTextEntry = false,
  onChangeTextProp,
  navigation,
}) => {
  let inputRef = {};
  const [input, setInput] = useState({});
  const array = new Array(length).fill(0);

  const setFocus = index => {
    inputRef && inputRef[index]?.focus();
  };

  useEffect(() => {
    setTimeout(() => {
      !autoFocusDisabled && inputRef && inputRef[0]?.focus();
    }, 450);
  }, []);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('blur', () => {
  //     setTimeout(() => {
  //       setInput({});
  //     }, 3000);
  //   });
  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    if (clearData) {
      setTimeout(() => {
        setInput({});
        resetFocus && inputRef && inputRef[0]?.focus();
      }, 450);
    }
  }, [clearData]);

  useEffect(() => {
    // Hot Fix
    if (focusTo2nd) {
      inputRef && inputRef[0]?.focus();
    }
  }, [focusTo2nd]);

  useEffect(() => {
    if (autoOtp?.length === 6) {
      setFocus(5);
    }
  }, [autoOtp]);
  return (
    <View style={[style]}>
      {array.map((item, index) => {
        return (
          <TextInput
            maxLength={1}
            style={[inputStyle]}
            defaultValue={autoOtp?.length === 6 ? autoOtp[index] : input[index]}
            key={`${item}_${index}`}
            keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'phone-pad'}
            selectionColor={selectionColor}
            autoComplete={'off'}
            secureTextEntry={secureTextEntry}
            ref={ref => (inputRef[index] = ref)}
            onChangeText={text => {
              if (typeof text !== 'undefined' && text !== null) {
                // onChangeTextProp(text);
                if (text !== '' && index < length - 1) {
                  setFocus(index + 1);
                }
                let obj = {
                  ...input,
                };
                if (text === '') {
                  delete obj[index];
                } else {
                  obj[index] = text;
                }
                setInput(obj);
                callback && callback(obj);
              }
            }}
            onSubmitEditing={() => {
              index === length - 1 && onSubmitEditing && onSubmitEditing(input);
            }}
            onKeyPress={({nativeEvent: {key: keyValue}}) => {
              if (keyValue === 'Backspace' && !input[index] && index > 0) {
                setFocus(index - 1);
                let obj = {
                  ...input,
                };
                delete obj[index - 1];
                setInput(obj);
              }
            }}
          />
        );
      })}
    </View>
  );
};

export default AndroidOtpScreen;
