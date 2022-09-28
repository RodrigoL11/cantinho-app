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

export default function EditName({ user, setUser, toogleForm, uID }: Props) {
  const [text, setText] = useState(user?.nome || "");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    let errorMsg = ""

    if (text.length === 0) errorMsg = "Por favor, insira o nome"
    else if (text.length < 3) errorMsg = "Nome muito curto. O nome pode ter no mínimo 3 caracteres"
    else if (text.length > 50) errorMsg = "Nome muito longo. O nome pode ter no máximo 50 caracteres"
    else if (!/^[A-Za-z\s]*$/.test(text)) errorMsg = "Nome pode conter apenas letras"

    if (errorMsg === "" && user) {
      setError("")
      Alert.alert(
        "Editar nome",
        "Tem certeza que deseja editar o nome?",
        [
          {
            text: "Sim",
            onPress: async () => {
              await api.put(`users/${uID}`, {
                column: 'nome',
                value: text.trim()
              }).then(response => {
                let newObj = user;
                newObj.nome = text.trim();
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
        <Title>Editar Nome</Title>
        <View>
          <Input
            value={text}
            placeholder="Insira o novo nome"            
            onChangeText={setText}           
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

