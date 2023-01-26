import React, { FC, useContext } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google'
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

import { app } from "../../firebase/config"
import { RootStack } from "../../routes"
import { userContext } from "../../context/UserContext"
import { singUp } from "../../firebase/db/singUp"

// @ts-ignore
import { WEB_CLIENT_ID } from "@env"

WebBrowser.maybeCompleteAuthSession();

export const Login: FC<NativeStackScreenProps<RootStack, "Login">> = ({ navigation }) => {
  const { user, setUser } = useContext(userContext)

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
    {
      clientId: WEB_CLIENT_ID,
    },
  );


  React.useEffect(() => {
    if(response) {
      if (response.type === 'success') {
        const { id_token } = response.params;
        const auth = getAuth(app);
        const credential = GoogleAuthProvider.credential(id_token);
        signInWithCredential(auth, credential)
          .then(({ user }) => {
            singUp(user)
              .then(user => {
                user 
                && 
                setUser(user)
                navigation.push('Home')
              })
              .catch(err => console.log('error: ', err))
          })
          .catch(err => console.error("Erro na credential: ", err))
      } else {
        //TODO handle error
        console.log('should handle error')
      }
    }
  }, [response]);


  return (
    <View style={LoginStyle.wrapper} >
      <TouchableOpacity style={LoginStyle.loginButton}  accessibilityLabel="Login Google" onPress={() => promptAsync()} >
        <Text style={{ color: "#000" }} > Login </Text>
      </TouchableOpacity>
    </View>
  )
}

const LoginStyle = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center"
  },
  loginButton: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    width: 200,
    alignContent: "space-around",
    alignItems: "center"
  }
})