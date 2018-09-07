import { StyleSheet } from 'react-native';

const colors = {
  buttonBg: '#E9EBFF',
  buttonShadow: '#000',
  white: '#FFF'
}

const style = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  cardButton: {
    width: 45,
    height: 45,
    backgroundColor: colors.buttonBg,
    position: 'absolute',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowColor: colors.buttonShadow,
    shadowOpacity: 0.2
  },
  topLeft: {
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 10,
    top: 0,
    left: 0
  },
  topRight: {
    borderBottomLeftRadius: 40,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    top: 0,
    right: 0
  },
  bottomLeft: {
    borderTopRightRadius: 40,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 0,
    bottom: 0,
    left: 0
  },
  bottomRight: {
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 40,
    bottom: 0,
    right: 0
  },
  buttonIconTopleft: {
    top: 10,
    left: 10
  },
  buttonIconTopRight: {
    bottom: -10,
    right: -15
  },
  buttonIconBottomleft: {
    bottom: -15,
    left: 10
  },
  buttonIconBottomRight: {
    bottom: -15,
    right: -15
  }
});

export default style;
