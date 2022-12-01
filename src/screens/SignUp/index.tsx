import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import { isValidCPF } from "@services/AuthService";
import Button from "@components/Button";
import Input from "@components/Input";

import {
  Container,
  Title,
  Column,
  ErrorMessage
} from "./styles";
import api from "@services/api";
import { IUser } from "@interfaces/main";

export default function SignUp() {
  const navigation = useNavigation();

  const [login, setLogin] = useState<string>("");
  const [CPF, setCPF] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [confirmEmail, setConfirmEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [secureText, setSecureText] = useState<boolean>(true);

  const [errors, setErrors] = useState({
    login: "",
    cpf: "",
    name: "",
    email: "",
    confirmEmail: "",
    password: "",
    confirmPassword: "",
  })

  async function handleSubmit() {
    let newErrors = {
      login: "",
      cpf: "",
      name: "",
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
    }

    if (CPF.length === 0) newErrors.cpf = "Por favor, insira o CPF"
    else if (CPF.length != 11) newErrors.cpf = "CPF precisa ter 11 digítos"
    else if (!isValidCPF(CPF)) newErrors.cpf = "CPF inválido!"

    if (email.length === 0) newErrors.email = "Por favor, insira o email"
    else if (email.length < 8) newErrors.email = "E-mail muito curto. O e-mail pode ter no mínimo 8 caracteres"
    else if (email.length > 50) newErrors.email = "E-mail muito longo. O e-mail pode ter no máximo 50 caracteres"
    else if (!email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) newErrors.email = "Formato de E-mail inválido";

    if (name.length === 0) newErrors.name = "Por favor, insira o nome"
    else if (name.length < 3) newErrors.name = "Nome muito curto. O nome pode ter no mínimo 3 caracteres"
    else if (name.length > 50) newErrors.name = "Nome muito longo. O nome pode ter no máximo 50 caracteres"
    else if (!/^[A-Za-z\s]*$/.test(name)) newErrors.name = "Nome pode conter apenas letras"

    if (login.length === 0) newErrors.login = "Por favor, insira o login"
    else if (login.length < 3) newErrors.login = "Login muito curto. O login pode ter no mínimo 3 caracteres"
    else if (login.length > 50) newErrors.login = "Login muito longo. O login pode ter no máximo 50 caracteres"

    if (password.trim() === "") newErrors.password = "Por favor, insira uma senha"
    else if (password.trim().length < 8) newErrors.password = "Senha precisa ter 8 digítos no mínimo"
    else if (password.length < 8) newErrors.password = "Senha precisa ter 8 digítos no mínimo."
    else if (password.length > 15) newErrors.password = "Senha pode ter 15 digítos no máximo.";
    else if (!password.match(/[0-9]/)) newErrors.password = "Senha precisa de um número no mínimo.";
    else if (!password.match(/[A-Z]/)) newErrors.password = "Senha precisa de uma letra em caixa alta no mínimo.";
    else if (!password.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) newErrors.password = "Senha precisa de um caractere especial no mínimo.";

    if (confirmPassword.trim() === "") newErrors.confirmPassword = "Por favor, insira a confirmação da senha"
    else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Senhas não coincidem"
      newErrors.password = "Senhas não coincidem"
    }

    if (confirmEmail.trim() === "") newErrors.confirmEmail = "Por favor, insira a confirmação do e-mail"
    else if (confirmEmail.trim().toLowerCase() !== email.trim().toLowerCase()) {
      newErrors.confirmEmail = "E-mails não coincidem"
      newErrors.email = "E-mails não coincidem"
    }

    if (newErrors.email === "" || newErrors.login === "" || newErrors.cpf === "") {
      const response = await api.get('users');
      const { results } = response.data;

      results.forEach((doc: IUser) => {
        if (email.trim().toLowerCase() === doc.email.trim().toLowerCase()) newErrors.email = "E-mail já cadastrado"
        if (login.trim().toLowerCase() === doc.login.trim().toLowerCase()) newErrors.login = "Login já cadastrado"
        if (CPF === doc.cpf.trim()) newErrors.cpf = "Já existe um usuário com este CPF!"
      });
    }

    let hasError = false;

    Object.keys(newErrors).forEach(function (key, index) {
      if (newErrors[key as keyof typeof newErrors] != "")
        hasError = true;
    })

    if (!hasError) {
      setErrors(newErrors);

      const validatedData = {
        nome: name.trim(),
        senha: password.trim(),
        login: login.trim().toLowerCase(),
        email: email.trim().toLowerCase(),
        token: "user",
        cpf: CPF.trim(),
      }

      Alert.alert(
        "Criar usuário",
        `Tem certeza que deseja cadastrar um novo usuário?`,
        [
          {
            text: "Sim",
            onPress: async () => {
              await api.post('users', {
                data: validatedData
              })
                .then(response => {
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
          },
          {
            text: "Cancelar",
            onPress: () => { return null }
          }
        ]
      )
    } else
      setErrors(newErrors)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container keyboardShouldPersistTaps="always">
        <Title>
          Criar novo{'\n'}usuário
        </Title>
        <Input
          icon="user"
          value={name}
          placeholder="Nome"
          onChangeText={text => {
            setName(text)
            if (errors.name) setErrors({
              ...errors,
              name: ''
            })
          }}
        />
        {errors.name ? (
          <ErrorMessage>{errors.name}</ErrorMessage>
        ) : null}

        <Input
          icon="users"
          value={CPF}
          placeholder="CPF"
          keyboardType="numeric"
          onChangeText={(masked, unmasked) => {
            setCPF(unmasked)
            if (errors.cpf) setErrors({
              ...errors,
              cpf: ''
            })
          }}
          mask={[/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]}
        />
        {errors.cpf ? (
          <ErrorMessage>{errors.cpf}</ErrorMessage>
        ) : null}

        <Input
          icon="mail"
          value={email}
          placeholder="E-mail"
          onChangeText={text => {
            setEmail(text.replace(/\s/g, ''))
            if (errors.confirmEmail || errors.email) setErrors({
              ...errors,
              confirmEmail: '',
              email: ''
            })
          }}
        />
        {errors.email ? (
          <ErrorMessage>{errors.email}</ErrorMessage>
        ) : null}

        <Input
          icon="mail"
          value={confirmEmail}
          placeholder="Confirme o e-mail"
          onChangeText={text => {
            setConfirmEmail(text.replace(/\s/g, ''))
            if (errors.confirmEmail || errors.email) setErrors({
              ...errors,
              confirmEmail: '',
              email: ''
            })
          }}
        />
        {errors.confirmEmail ? (
          <ErrorMessage>{errors.confirmEmail}</ErrorMessage>
        ) : null}

        <Input
          icon="user"
          value={login}
          onChangeText={text => {
            setLogin(text.replace(/\s/g, ''))
            if (errors.login) setErrors({
              ...errors,
              login: ''
            })
          }}
          placeholder="Login"
        />
        {errors.login ? (
          <ErrorMessage>{errors.login}</ErrorMessage>
        ) : null}

        <Input
          icon="lock"
          value={password}
          placeholder="Senha"
          type="password"
          onChangeText={text => {
            setPassword(text.replace(/\s/g, ''))
            if (errors.password || errors.confirmPassword) setErrors({
              ...errors,
              confirmPassword: '',
              password: ''
            })
          }}
          secureTextEntry={secureText}
          isVisible={secureText}
          setVisible={setSecureText}
        />
        {errors.password ? (
          <ErrorMessage>{errors.password}</ErrorMessage>
        ) : null}

        <Input
          icon="lock"
          value={confirmPassword}
          placeholder="Confirme a senha"
          onChangeText={text => {
            setConfirmPassword(text.replace(/\s/g, ''))
            if (errors.password || errors.confirmPassword) setErrors({
              ...errors,
              confirmPassword: '',
              password: ''
            })
          }}
          isVisible={secureText}
        />
        {errors.confirmPassword ? (
          <ErrorMessage>{errors.confirmPassword}</ErrorMessage>
        ) : null}

        <Column style={{ marginTop: 20 }}>
          <Button onPress={handleSubmit} title="Cadastrar" />
        </Column>
      </Container>
    </TouchableWithoutFeedback>
  );
}
