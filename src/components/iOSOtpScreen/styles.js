import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  cellsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    justifyContent: 'center',
    color: '#333333',
    borderColor: '#D6D6D6',
    fontSize: 14,
    width: 47,
    height: 48,
    marginRight: 12,
  },
  hiddenTextInput: {
    ...StyleSheet.absoluteFill,
    color: '#ffffff',
    opacity: 0,
  },
  cellText: {
    borderColor: '#D6D6D6',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default styles;
