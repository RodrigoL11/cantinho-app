import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@hooks/auth';

import Button from '@components/Button'

import {
  Container,
} from './styles'

export default function Home() {
  const navigator = useNavigation();
  const { signOut } = useAuth();
  const { authData } = useAuth();

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
        onPress={signOut}
        title="Sair"
      />
    </Container>
  );
}