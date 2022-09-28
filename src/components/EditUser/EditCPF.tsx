import React, { Dispatch, SetStateAction, useState } from 'react'
import { Alert, TouchableOpacity, View } from 'react-native';

import api from '@services/api'
import { isValidCPF } from '@services/AuthService';

import Input from '@components/Input'
import Button from '@components/Button'

import {
  Container,
  Content,
  Title,
  ErrorMessage
} from './styles'
import { IUser } from '@interfaces/main';

interface Props {
  toogleForm: () => void;
  uID: number;
  user: IUser | undefined;
  setUser: Dispatch<SetStateAction<IUser | undefined>>,
}

export default function EditCPF({ user, setUser, toogleForm, uID }: Props) {
  const [text, setText] = useState(user?.cpf || "");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    let errorMsg = ""

    if (text.length === 0) errorMsg = "Por favor, insira um CPF"
    else if (text.length != 11) errorMsg = "CPF precisa ter 11 dígitos"
    else if (!isValidCPF(text)) errorMsg = "CPF inválido"

    if (errorMsg === "" && user) {
      setError("");
      Alert.alert(
        "Editar CPF",
        "Tem certeza que deseja editar o CPF?",
        [
          {
            text: "Sim",
            onPress: async () => {
              await api.put(`users/${uID}`, {
                column: 'cpf',
                value: text
              }).then(response => {
                let newObj = user;
                newObj.cpf = text;
                setUser(newObj);
                toogleForm();
              })
            }
          },
          {
            text: "Cancelar",
            onPress: () => { return null }
          }
        ]
      )
    } else {
      setError(errorMsg)
    }
  }

  return (
    <Container>
      <TouchableOpacity style={{ flex: 1 }} onPress={toogleForm} />
      <Content>
        <Title>Editar CPF</Title>
        <View>
          <Input
            value={text}
            placeholder="Insira seu novo CPF"
            keyboardType="numeric"
            onChangeText={(masked, unmasked) => setText(unmasked)}
            mask={[/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/]}
          />
          {error ? (
            <ErrorMessage>{error}</ErrorMessage>
          ) : null}
        </View>
        <Button
          title="Salvar"
          onPress={handleSubmit}
        />
      </Content>
    </Container>

  )
}

