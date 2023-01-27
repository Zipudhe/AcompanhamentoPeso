import React, { FC, useContext } from "react";
import { TouchableOpacity, View, Image, StyleSheet } from 'react-native'

const icon = require("../../../assets/icon.png")

import { userContext } from "../../context/UserContext"

const profileStyle = StyleSheet.create({
  IconWrapper: {
    height: 45,
    widht: 45,
    borderRadius: 1000
  },
  icon: {
    height: 45,
    width: 45,
    borderRadius: 1000
  }
})

export const ProfileButton: FC = () => {

  const { user } = useContext(userContext)

  return (
    <TouchableOpacity activeOpacity={0.9} >
      <View style={profileStyle.IconWrapper} > 
        <Image 
          style={profileStyle.icon} 
          source={ user ? {
            uri: user.photoURL
          } : icon} 
          />
      </View>
    </TouchableOpacity>
  )
}