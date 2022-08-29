import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { useAuth } from '../../hooks/auth';
import { Entypo } from '@expo/vector-icons';

import Button from '../../components/Button'

import {
  Container,
  Input,
  InputPassword,
  Title,
  Footer,
  SubTitle,
  LinkText,
  InputContainer,
} from './styles'

export default function SignIn() {
  const { signIn } = useAuth();
  const navigator = useNavigation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [secureText, setSecureText] = useState<boolean>(true);

  return (
    <Container>
      <Title>Sign in to App</Title>
      <Input
        value={email}
        onChangeText={value => setEmail(value)}
        placeholder={"Email"}
      />
      <InputContainer>
        <InputPassword
          value={password}
          secureTextEntry={secureText}
          onChangeText={value => setPassword(value)}
          placeholder={"Password"}  
        />
        <Entypo onPress={() => setSecureText(!secureText)} style={{paddingRight: 10}} name={secureText ? 'eye-with-line' : 'eye'} size={20} color="#727272" />
      </InputContainer>
      <Button 
        onPress={() => signIn(email, password).catch((error) => {
          Alert.alert(error.message, 'Tente novamente')
        })}
        title="Sign In"
      />
      <Footer>
        <SubTitle>New to App? </SubTitle>
        <TouchableOpacity onPress={() => navigator.navigate("SignUp")}>
          <LinkText>Create an account.</LinkText>
        </TouchableOpacity>
      </Footer>
    </Container>
  );
}