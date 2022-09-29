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

export default function EditEmail({ user, setUser, toogleForm, uID }: Props) {
  let oldEmail = user?.email || "";
  const [text, setText] = useState(user?.email || "");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    let errorMsg = ""

    if (text.length === 0) errorMsg = "Por favor, insira o email"
    else if (text.length < 8) errorMsg = "E-mail muito curto. O e-mail pode ter no mínimo 8 caracteres"
    else if (text.length > 50) errorMsg = "E-mail muito longo. O e-mail pode ter no máximo 50 caracteres"
    else if (!text.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)) errorMsg = "Formato de E-mail inválido";
    else if (text.trim().toLowerCase() != oldEmail.trim().toLowerCase()) {
      const response = await api.get('users');
      const { results } = response.data;

      results.forEach((doc: IUser) => {        
        if (text.trim().toLowerCase() === doc.email) errorMsg = "Já existe um usuário com este e-mail"
      });
    }

    if (errorMsg === "" && user) {
      setError("")
      Alert.alert(
        "Editar e-mail",
        "Tem certeza que deseja editar o e-mail?",
        [
          {
            text: "Sim",
            onPress: async () => {
              await api.put(`users/${uID}`, {
                column: 'email',
                value: text.trim().toLowerCase()
              }).then(response => {
                let newObj = user;
                newObj.email = text.trim().toLowerCase();
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
        <Title>Editar E-mail</Title>
        <View>
          <Input
            value={text}
            placeholder="Insira o novo e-mail"            
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

