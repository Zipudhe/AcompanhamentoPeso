import React, { FC } from 'react'
import { Text, View, TextInput, StyleSheet, TextInputProps } from 'react-native'

interface IInputNumber extends TextInputProps {
  label: string,
  placeholder: string,
  value: string,
  disabled?: boolean
}

export const InputNumber: FC<IInputNumber> = ({ label, placeholder, value, disabled, ...props }) => {

  return (
    <View  style={inputStyle.container} >
      <Text style={inputStyle.label} > { label } </Text>
      <TextInput
        {...props}
        editable={!disabled}
        defaultValue={value} 
        style={inputStyle.input} 
        placeholder={placeholder} 
        keyboardType='numeric' 
      />
    </View>
  )
}

const inputStyle = StyleSheet.create({
  container: {
    height: 60,
    width: "80%",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    alignSelf: "flex-start"
  },
  input: {
    width: "100%",
    textAlign: "center",
    fontSize: 16,
    fontWeight: 'bold',
    borderRadius: 8,
    backgroundColor: "#fff"
  }
})