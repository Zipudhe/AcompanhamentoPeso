import React, { FC, useState, useRef } from "react";
import { TouchableOpacity, View, Image, StyleSheet, Animated, Easing } from 'react-native'

import Icon from "react-native-vector-icons/FontAwesome"

interface IAnimatedView {
  isOpen: boolean
}

const menuStyle = StyleSheet.create({
  IconWrapper: {
    height: 45,
    widht: 45,
    flex: 1,
    justifyContent: 'center'
  },
})

export const MeuButton: FC = () => {
  const [isOpen, setIsOpen] = useState(false)


  // TODO --- Fazer essa porra de animação funcionar
  let rotateValue = new Animated.Value(0)
  const rotateLeft = () => {
    rotateValue.setValue(0);
    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false
    }).start(() => rotateLeft())
  }

  const rotateRight = () => {
    rotateValue.setValue(1);
    Animated.timing(rotateValue, {
      toValue: 0,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false
    }).start(() => rotateLeft())
  }

  const handleRotate = () => {
    if(isOpen) {
      rotateRight()
    } else {
      rotateLeft()
    }
  }


  const RotateView = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg']
  })

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={() => {
      handleRotate()
      setIsOpen(current => !current)
    }} >
      <Animated.View style={[
        menuStyle.IconWrapper,
        { transform: [{ rotate: RotateView }] }
      ]} > 
        <Icon name="gear" size={30} />
      </Animated.View>
    </TouchableOpacity>
  )
}