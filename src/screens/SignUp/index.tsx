import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

import { useAuth } from "@hooks/auth";
import { useNavigation } from "@react-navigation/native";

import Button from "@components/Button";
import Input from "@components/Input";

import {
  Container,
  Title,
  Column
} from "./styles";

export default function SignUp() {
  const { signUp } = useAuth();
  const [login, setLogin] = useState<string>("");
  const [CPF, setCPF] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [secureText, setSecureText] = useState<boolean>(true);
  const navigation = useNavigation();

  async function handleRegistration() {
    if (password != confirmPassword)
      Alert.alert("Senhas não coincidem", "Tente novamente");
    else {
      const data = {
        nome: name,
        password: password,
        login: login,
        email: email.trim(),
        token: "user",
        cpf: CPF,
      };

      signUp(data)
      .then(() => {
        Alert.alert(
          "Sucesso",
          "Usuário criado com sucesso!"
        )
        navigation.goBack();
      })
      .catch((error) => {
        Alert.alert(error.message, "Tente novamente");
      });
    }
  }

  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior='position' enabled>
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
            icon="users"
            value={CPF}
            placeholder="CPF"
            keyboardType="numeric"
            onChangeText={(masked, unmasked) => setCPF(unmasked)}
            mask={[/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]}
          />
          <Input
            icon="mail"
            value={email}
            placeholder="E-mail"
            onChangeText={setEmail}
          />
          <Input
            icon="user"
            value={login}
            onChangeText={setLogin}
            placeholder="Login"
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
          <Column style={{ marginTop: 20}}>
            <Button onPress={handleRegistration} title="Cadastrar" />
          </Column>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Container>
  );
}
