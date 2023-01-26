import React, { FC } from "react";
import { View } from 'react-native'

import { style } from "./style"

interface IWireFrame {
  children: React.ReactNode
}

export const WireFrame: FC<IWireFrame> = ({ children }) => {
  return (
    <View style={style.container} >
      { children }
    </View>
  )
}