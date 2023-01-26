import React, { FC } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Login } from "../screens/login"
import { Home } from "../screens/home"

export type RootStack = {
  Home: undefined,
  Login: undefined
}

const { Navigator, Screen } = createNativeStackNavigator<RootStack>()

const Router: FC = () => (
  <NavigationContainer>
    <Navigator screenOptions={{ headerShown: false }} initialRouteName='Login' >
      <Screen name='Login' component={Login} />
      <Screen name="Home" component={Home} />
    </Navigator>
  </NavigationContainer>
)

export default Router