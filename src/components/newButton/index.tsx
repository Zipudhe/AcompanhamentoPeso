import React, { FC, ReactNode, useState } from 'react'
import { TouchableOpacity, GestureResponderEvent, StyleSheet } from 'react-native'

import Icon from "react-native-vector-icons/Feather"

interface IButton {
  onPress: (e: GestureResponderEvent) => void
}

export const NewButton: FC<IButton> = ({ onPress }) => {

  return (
    <TouchableOpacity  onPress={onPress} activeOpacity={0.8} style={ButtonStyle.container} >
      <Icon name="plus" size={30} />
    </TouchableOpacity>
  )
}


const ButtonStyle = StyleSheet.create({
  container: {
    height: 70,
    width: 70,
    borderRadius: 100,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    position: 'absolute',
    bottom: 100,
    right: 30
  }
})
