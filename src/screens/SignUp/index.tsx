import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import { useAuth } from "@hooks/auth";

import Button from "@components/Button";
import Input from "@components/Input";

import {
  Container,
  Title,
  Section,
  Row,
  Column
} from "./styles";

export default function SignUp() {
  const { signUp } = useAuth();
  const [login, setLogin] = useState<string>("");
  const [CPF, setCPF] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [houseNumber, setHouseNumber] = useState<string>("");
  const [district, setDistrict] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [CEP, setCEP] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [secureText, setSecureText] = useState<boolean>(true);

  async function handleRegistration() {
    console.log(phone, CEP);

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
        DDI: '+55',
        DDD: '16',
        num_telefone: phone,
        logradouro: address,
        num_endereco: houseNumber,
        bairro: district,
        cep: CEP,
        cidade: city,
        estado: state,
      };

      signUp(data).catch((error) => {
        Alert.alert(error.message, "Tente novamente");
      });
    }
  }

  return (
    <Container>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Title>
            Criar novo{'\n'}usuário
          </Title>
          <Section>Dados pessoais</Section>
          <>
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
              icon="phone"
              value={phone}
              placeholder={"Telefone"}
              keyboardType="numeric"
              onChangeText={(masked, unmasked) => setPhone(unmasked)}
              mask={['(', /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
            />

            <Section>Endereço</Section>
            <Input
              icon="home"
              value={address}
              placeholder="Endereço"
              onChangeText={setAddress}
            />
            <Row>
              <Column size={81.5}>
                <Input
                  icon="home"
                  value={district}
                  placeholder="Bairro"
                  onChangeText={setDistrict}
                />
              </Column>
              <Column size={17.5}>
                <Input
                  value={houseNumber}
                  placeholder="Nº"
                  onChangeText={setHouseNumber}
                  maxLength={4}
                  keyboardType="numeric"
                />
              </Column>
            </Row>

            <Input
              icon="map-pin"
              value={CEP}
              placeholder="CEP"
              keyboardType="numeric"
              onChangeText={(masked, unmasked) => setCEP(unmasked)}
              mask={[/\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
            />
            <Input
              icon="map"
              value={city}
              placeholder="Cidade"
              onChangeText={setCity}
            />
            <Input
              icon="map"
              value={state}
              placeholder="Estado"
              onChangeText={setState}
            />

            <Section>Dados da conta</Section>
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
          </>
          <Column style={{ marginTop: 16, marginBottom: 40 }}>
            <Button onPress={handleRegistration} title="Cadastrar" />
          </Column>
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
}
