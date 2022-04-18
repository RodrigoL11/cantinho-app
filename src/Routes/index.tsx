import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import  Home  from '../screens/Home';
import  Comanda  from '../screens/Comanda';
import Comandas from '../screens/Comandas'

const { Navigator, Screen } = createNativeStackNavigator();

export function Routes() {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
      <Screen
          name="Comandas"
          component={Comandas}
        />
        <Screen
          name="Comanda"
          component={Comanda}
        />
        <Screen
          name="Home"
          component={Home}
        />
      </Navigator>
    </NavigationContainer>
  )
}