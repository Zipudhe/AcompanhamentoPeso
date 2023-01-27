import React, { FC, useContext, useState, useEffect, useRef } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Image, Animated } from 'react-native'
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google'
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

import { app } from "../../firebase/config"
import { RootStack } from "../../routes"
import { userContext } from "../../context/UserContext"
import { singUp } from "../../firebase/db/singUp"

import Icon from "react-native-vector-icons/FontAwesome"

// @ts-ignore
import { WEB_CLIENT_ID } from "@env"

const HdpIcons = require('../../../assets/hdp-icon-white.png')

WebBrowser.maybeCompleteAuthSession();

export const Login: FC<NativeStackScreenProps<RootStack, "Login">> = ({ navigation }) => {
  const { setUser } = useContext(userContext)
  const [isLoading, setIsLoading] = useState(false)
  const yAnimation = useRef(new Animated.Value(-250)).current
  const fadeAnimation = useRef(new Animated.Value(0)).current

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: WEB_CLIENT_ID,
    },
  );


  useEffect(() => {
    if(response) {
      if (response.type === 'success') {
        const { id_token } = response.params;
        const auth = getAuth(app);
        const credential = GoogleAuthProvider.credential(id_token);
        setIsLoading(true)
        signInWithCredential(auth, credential)
          .then(async ({ user }) => {
            await singUp(user)
              .then(user => {
                user 
                && 
                setUser(user)
                navigation.push('Home')
              })
              .catch(err => console.log('error: ', err))
          })
          .catch(err => console.error("Erro na credential: ", err))
          .finally(() => setIsLoading(false))
      } else {
        //TODO handle error
        console.log('should handle error')
      }
    }
  }, [response]);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(yAnimation, {
        toValue: 0,
        useNativeDriver: true,
        stiffness: 30,
        mass: 3
      }),
      Animated.timing(fadeAnimation, {
        toValue: 1,
        useNativeDriver: true,
        duration: 1
      })
    ]).start()
  }, [])

  return (
    <View style={LoginStyle.wrapper} >
      <Animated.Image 
        accessibilityHint='app logo'
        source={HdpIcons}
        style={{
          marginTop: 40,
          height: 300,
          width: 500,
          opacity: fadeAnimation,
          transform: [{
            translateY: yAnimation
          }],
        }}
      />
      <TouchableOpacity style={LoginStyle.loginButton} disabled={isLoading} accessibilityLabel="Login Google" onPress={() => promptAsync()} >
        <Icon name='google' size={24} />
        <Text style={LoginStyle.loginText} > Login Google </Text>
      </TouchableOpacity>
    </View>
  )
}

const LoginStyle = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  loginButton: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    width: 200,
    alignContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  loginText: {
    color: "#000",
    fontSize: 18,
    fontWeight: 'bold'
  }
})