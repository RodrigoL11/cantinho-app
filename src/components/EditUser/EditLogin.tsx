import React, { Dispatch, SetStateAction, useState } from 'react'
import { Alert, TouchableOpacity, View } from 'react-native';

import api from '@services/api'

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

export default function EditLogin({ user, setUser, toogleForm, uID }: Props) {
  const [text, setText] = useState(user?.login || "");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    let errorMsg = ""

    if (text.length === 0) errorMsg = "Por favor, insira o login"
    else if (text.length < 3) errorMsg = "Login muito curto. O login pode ter no mínimo 3 caracteres"
    else if (text.length > 50) errorMsg = "Login muito longo. O login pode ter no máximo 50 caracteres"

    if (errorMsg === "" && user) {
      setError("")
      Alert.alert(
        "Editar login",
        "Tem certeza que deseja editar o login?",
        [
          {
            text: "Sim",
            onPress: async () => {
              await api.put(`users/${uID}`, {
                column: 'login',
                value: text.trim().toLowerCase()
              }).then(response => {
                let newObj = user;
                newObj.login = text.trim().toLowerCase()
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
        <Title>Editar Login</Title>
        <View>
          <Input
            value={text}
            placeholder="Insira o novo login"            
            onChangeText={value => setText(value.replace(/\s/g, ''))}           
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

