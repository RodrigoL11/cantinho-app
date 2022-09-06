import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { useAuth } from "@hooks/auth";

import Button from "@components/Button";
import Input from "@components/Input";

import { Container, Title } from "./styles";

export default function SignUp() {
  const { signUp } = useAuth();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [secureText, setSecureText] = useState<boolean>(true);

  async function handleRegistration() {
    if (password != confirmPassword)
      Alert.alert("Senhas não coincidem", "Tente novamente");
    else {
      const data = {
        email: email.trim(),
        id: 0,
        name: name,
        password: password,
        token: "user",
      };

      signUp(data).catch((error) => {
        Alert.alert(error.message, "Tente novamente");
      });
    }
  }

  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior="position" enabled>
          <Title>
            Criar novo{'\n'}usuário
          </Title>
          <Input
            icon="user"
            value={name}
            placeholder="Nome"
            onChangeText={setName}
          />
          <Input
            icon="mail"
            value={email}
            placeholder="E-mail"
            onChangeText={setEmail}
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
          <Input
            icon="lock"
            value={confirmPassword}
            placeholder="Confirme a senha"
            onChangeText={setConfirmPassword}
            secureTextEntry={secureText}
          />
          <Button onPress={handleRegistration} title="Cadastrar" />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Container>
  );
}
