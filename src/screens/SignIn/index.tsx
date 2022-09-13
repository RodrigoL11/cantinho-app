import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { useAuth } from '@hooks/auth';
import { useNavigation } from '@react-navigation/native';

import Button from '@components/Button'
import Input from '@components/Input'

import {
  Container,
  Title,
} from './styles'

export default function SignIn() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [secureText, setSecureText] = useState<boolean>(true);

  return (
    <Container>
      <Title>Acessar conta</Title>
      <Input
        icon="mail"
        value={email}
        onChangeText={value => setEmail(value)}
        placeholder={"Email"}
      />
      <Input
        icon="lock"
        value={password}
        placeholder="Senha"
        type="password"
        onChangeText={setPassword}
        secureTextEntry={secureText}
        isVisible={secureText}
        setVisible={setSecureText}
      />
      <View style={{marginTop: 16}}>
        <Button
          onPress={() => signIn(email, password).catch((error) => {
            Alert.alert(error.message, 'Tente novamente')
          })}
          title="Entrar"
        />
      </View>
    </Container>
  );
}