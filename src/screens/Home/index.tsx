import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@hooks/auth';

import Button from '@components/Button'

import {
  Container,
} from './styles'
import { Alert, BackHandler } from 'react-native';

export default function Home() {
  const navigator = useNavigation();
  const { signOut } = useAuth();
  const { authData } = useAuth();

  const SignOut = () => {
    Alert.alert(
      "Adeus",
      "Deseja realmente sair da conta?",
      [
        {
          text: "Sim",
          onPress: () => signOut()
        },
        {
          text: "Cancelar",
          onPress: () => {return}
        }
      ]
    )

    return true;
  }

  return (
    <Container>
      {authData?.token === 'admin' ?
        (
          <>
            <Button onPress={() => navigator.navigate("SignUp")} title="Cadastrar Usuário" />
          </>
        ) :
        <>
        </>
      }
      <Button 
        onPress={() => navigator.navigate("Comandas")} 
        title="Comandas" 
      />

      <Button 
        onPress={() => navigator.navigate("Users")} 
        title="Usuários" 
      />

      <Button
        onPress={() => SignOut()}
        title="Sair"
      />
    </Container>
  );
}