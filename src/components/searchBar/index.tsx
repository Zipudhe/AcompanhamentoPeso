import React, { FC } from 'react'
import { StyleSheet, SafeAreaView, TextInput } from 'react-native'

import Icon from "react-native-vector-icons/Entypo"

interface ISearchBar {
  inputHandler?: (e: string) => void,
}

const searchBarStyle = StyleSheet.create({
  input: {
    borderRadius: 8,
    backgroundColor: '#fff',
    height: "80%",
    width: 250,
    padding: 10,
    fontSize: 18
  },
  inputIcon: {
    position: "absolute",
    top: 9,
    right: 15,
    opacity: 0.4
  }
})


export const SearchBar: FC<ISearchBar> = ({ inputHandler }) => {

  return (
    <SafeAreaView>
      <TextInput
        style={searchBarStyle.input}
        onChangeText={inputHandler}
        placeholder='Procurar exercício'
      />
      <Icon style={searchBarStyle.inputIcon} name="magnifying-glass" size={30} />
    </SafeAreaView>
  )
}


