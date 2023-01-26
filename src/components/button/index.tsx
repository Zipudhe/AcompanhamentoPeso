import React, { FC, ReactNode, useState } from 'react'
import { TouchableOpacity, StyleProp, ViewStyle, GestureResponderEvent } from 'react-native'

interface IButton {
  children: ReactNode,
  style: StyleProp<ViewStyle>,
  onPress: (e: GestureResponderEvent) => void
}

export const Button: FC<IButton> = ({ children, style, onPress }) => {

  return (
    <TouchableOpacity  onPress={onPress} activeOpacity={0.8} style={style} >
      { children }
    </TouchableOpacity>
  )
}

