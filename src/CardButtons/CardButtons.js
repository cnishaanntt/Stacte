import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableHighlight } from 'react-native'
import FIcon from 'react-native-vector-icons/Feather'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import style from './style';

const CardButtons = props => {
  return (
    <View style={style.buttonContainer}>
      <TouchableHighlight style={[style.cardButton, style.bottomRight]}>
        <MCIcon
          name="chart-line-variant"
          size={18}
          style={style.buttonIconBottomRight}
          color={props.buttons.bottomRight.disabled ? '#9da4b4' : '#383b42'}
        />
      </TouchableHighlight>
      <TouchableHighlight style={[style.cardButton, style.topRight]}>
        <FIcon
          name="info"
          size={18}
          style={style.buttonIconTopRight}
          color={props.buttons.topRight.disabled ? '#9da4b4' : '#383b42'}
        />
      </TouchableHighlight>
      <TouchableHighlight style={[style.cardButton, style.bottomLeft]}>
        <FIcon
          name="link-2"
          size={18}
          style={style.buttonIconBottomleft}
          color={props.buttons.bottomLeft.disabled ? '#9da4b4' : '#383b42'}
        />
      </TouchableHighlight>
      <TouchableHighlight style={[style.cardButton, style.topLeft]} onPress={props.flip}>
        <FIcon
          name="refresh-ccw"
          size={18}
          style={style.buttonIconTopleft}
          color={props.buttons.topLeft.disabled ? '#9da4b4' : '#383b42'}
        />
      </TouchableHighlight>
    </View>
  )
}

CardButtons.defaultProps = {
  buttons: {
    topLeft: {
      disabled: false,
      action: null
    },
    topRight: {
      disabled: false,
      action: null
    },
    bottomLeft: {
      disabled: false,
      action: null
    },
    bottomRight: {
      disabled: false,
      action: null
    },
  }
};

CardButtons.propTypes = {
  flip: PropTypes.func,
  buttons: PropTypes.shape({
    topLeft: PropTypes.shape({
      disabled: PropTypes.bool,
      action: PropTypes.string
    }),
    topRight: PropTypes.shape({
      disabled: PropTypes.bool,
      action: PropTypes.string
    }),
    bottomLeft: PropTypes.shape({
      disabled: PropTypes.bool,
      action: PropTypes.string
    }),
    bottomRight: PropTypes.shape({
      disabled: PropTypes.bool,
      action: PropTypes.string
    })
  })
};

export default CardButtons;
