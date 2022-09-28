import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '@screens/Home';
import SignUp from '@screens/SignUp';
import Comandas from '@screens/Comandas';
import Comanda from '@screens/Comanda';
import Users from '@screens/Users';
import User from '@screens/User';
import Produtos from '@screens/Produtos';

const { Navigator, Screen } = createNativeStackNavigator();

export function App() {
  return (
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen
          name="Home"
          component={Home}
        />
        <Screen
          name="SignUp"
          component={SignUp}
        />
        <Screen
          name="Comandas"
          component={Comandas}
        />
        <Screen 
          name="Comanda"
          component={Comanda}
          initialParams={{ id: 0 }}
        />
        <Screen 
          name="Users"
          component={Users}
        />
        <Screen
          name="User"
          component={User}
        />
        <Screen 
          name="Produtos"
          component={Produtos}
        />
      </Navigator>
  );
}