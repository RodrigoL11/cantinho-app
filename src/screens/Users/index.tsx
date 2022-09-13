import React, { useState } from 'react';

import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons'

import Header from '@components/Header'
import ActionButton from '@components/ActionButton'

import {
  Card,
  Container,
  Label,
  Row,
  Nome,
  Admin,
  AdminLabel,
  Options,
} from './styles'
import { Alert } from 'react-native';

const data = [
  {
    admin: true,
    nome: 'Rodrigo Lemes',
    CPF: '43977171844',
    login: 'fp.rodrigo',
    telefone: '(16) 99197-7783',
    email: 'rodrigo@gmail.com',
    senha: '123',
    nascimento: '11/09/2001',
    endereco: {
      rua: 'Rua Laurindo Fernandes Balieiro',
      num: '299',
      bairro: 'Gumercindo 2',
      cidade: 'Pitangueiras',
      estado: 'São Paulo',
      CEP: '14750000'
    }
  },
  {
    admin: false,
    nome: 'Rodrigo Lemes',
    CPF: '43977171844',
    login: 'fp.rodrigo',
    telefone: '(16) 99197-7783',
    email: 'rodrigo@gmail.com',
    senha: '123',
    nascimento: '11/09/2001',
    endereco: {
      rua: 'Rua Laurindo Fernandes Balieiro',
      num: '299',
      bairro: 'Gumercindo 2',
      cidade: 'Pitangueiras',
      estado: 'São Paulo',
      CEP: '14750000'
    }
  },

]

export default function Users() {
  const navigation = useNavigation();
  const [users, setUsers] = useState(data)

  const deleteUser = (id: number) => {
    const delUser = users[id]
    
    Alert.alert(
      "Deletar usuário",
      `Tem certeza que deseja excluir o usuário ${delUser.nome}?`,
      [
        {
          text: "Sim",
          onPress: () => { setUsers(users.filter(user => user !== delUser)) }
        },
        {
          text: "Cancelar",
          onPress: () => { return }
        }
      ]
    )
  }

  return (
    <Container>
      <Header title="Usuários" onPress={navigation.goBack} />
      {users.map((user, index) => {
        return (
          <Card key={index}>
            <Row>
              <Nome>{user.nome}</Nome>
              <Label style={{ color: '#ccc' }}> | </Label>
              <Label>{user.telefone}</Label>
              <Options>
                <Feather name="edit-2" size={18} />
                <Feather onPress={() => deleteUser(index)} name="trash-2" size={18} />
              </Options>
            </Row>
            <Row>
              <Label>{user.login}</Label>
              <Label style={{ color: '#ccc' }}> | </Label>
              <Label>{user.email}</Label>
            </Row>
            <Row>
              <Label>{user.endereco.rua}, </Label>
              <Label>{user.endereco.num}, </Label>
              <Label>{user.endereco.bairro}</Label>
            </Row>
            <Row>
              <Label>{user.endereco.cidade}, </Label>
              <Label>{user.endereco.estado}, </Label>
              <Label>{user.endereco.CEP}</Label>
            </Row>
            {user.admin ? (
              <Admin>
                <AdminLabel>Admin</AdminLabel>
              </Admin>) : null}

          </Card>
        )
      })}

      <ActionButton onPress={() => navigation.navigate("SignUp")} size={32} name='add' />
    </Container>
  )
}