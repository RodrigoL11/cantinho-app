import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';

import Home from '@screens/Home';
import SignUp from '@screens/SignUp';
import Comandas from '@screens/Comandas';
import Comanda from '@screens/Comanda';
import Users from '@screens/Users';
import User from '@screens/User';
import Produtos from '@screens/Produtos';
import Pedidos from '@screens/Pedidos';
import Relatorios from '@screens/Relatorios';
import Estoque from '@screens/Estoque';
import Categorias from '@screens/Categorias';
import Header from '@components/Header';
import CriarPedido from '@screens/CriarPedido';

const { Navigator, Screen } = createNativeStackNavigator();

const Tab = createMaterialTopTabNavigator();

function ProdutosTabs() {
  const navigation = useNavigation();

  return (
    <>
      <Header title='Produtos' onPress={navigation.goBack} />
      <Tab.Navigator>
        <Tab.Screen name="ProdutosTab" component={Produtos} />
        <Tab.Screen name="CategoriasTab" component={Categorias} />
      </Tab.Navigator>
    </>
  )
}

export function App() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="Home" component={Home} />
      <Screen name="SignUp" component={SignUp} />
      <Screen name="Comandas" component={Comandas} />
      <Screen name="Comanda" component={Comanda} />
      <Screen name="Users" component={Users} />
      <Screen name="User" component={User} />
      <Screen name="Produtos" component={ProdutosTabs} />
      <Screen name="Pedidos" component={Pedidos} />
      <Screen name="Relatorios" component={Relatorios} />
      <Screen name="Estoque" component={Estoque} />
      <Screen name="CriarPedido" component={CriarPedido} />
    </Navigator>
  );
}