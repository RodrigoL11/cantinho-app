import React, { useState } from 'react'
import api from '@services/api'

import Input from '@components/Input'
import Button from '@components/Button'
import { TouchableWithoutFeedback, Alert, KeyboardAvoidingView } from 'react-native';

import {
  Container, Content, Title
} from './styles'

interface Props {
  onPress: () => void;
  type: string;
  id?: number;
  user?: any;
  setUser: any;
}

export default function EditUser({ user, setUser, onPress, type, id }: Props) {
  const key = type === 'E-mail' ? 'email' : type.toLowerCase();
  const [text, setText] = useState(user[key])

  const updateUser = async () => {
    api.put(`users/${id}`, {
      column: key,
      value: text.trim(),
    }).then(() => {
      let newObj = user;
      newObj[key] = text;
      setUser(newObj);
      Alert.alert("Usuário atualizado com sucesso!");
      onPress();
    }).catch((err) => {
      console.log(err);
    })
  }

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Container>
        <Content>
          <Title>Editar o campo {type}</Title>
          <Input
            value={text}
            onChangeText={setText}
          />
          <Button title="Atualizar" onPress={updateUser} />
        </Content>
      </Container>
    </TouchableWithoutFeedback>
  )
}