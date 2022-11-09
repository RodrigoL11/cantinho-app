import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons'
import api from '@services/api'
import { IUser } from '@interfaces/main'

import Header from '@components/Header'
import ActionButton from '@components/ActionButton'

import {
  Card,
  Container,
  Content,
  Label,
  Row,
  Nome,
  Admin,
  AdminLabel,
  Options,
  ContentFooter
} from './styles'

interface User extends IUser {
  id: number;
}

export default function Users() {
  const navigation = useNavigation();
  const [users, setUsers] = useState<User[]>([])

  const loadData = async () => {
    try {
      const response = await api.get('users');

      const { results } = response.data;
      setUsers(results)
    } catch (err) {

    }
  };

  useEffect(() => {
    navigation.addListener(
      'focus',
      payload => {
        loadData();
      }
    );
  }, []);

  const deleteUser = (id: number) => {
    const delUser = users[id]
    const uID = delUser.id

    Alert.alert(
      "Deletar usuário",
      `Tem certeza que deseja excluir o usuário ${delUser.nome}?`,
      [
        {
          text: "Sim",
          onPress: async () => {
            await api.delete(`users/${uID}`)
              .then(response => {
                setUsers(users.filter(user => user !== delUser))
              })
          }
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
      <Content>
        {users.map((user, index) => (
          user.status === 'A' &&
          <Card key={index}>
            <Row>
              <Nome>{user.nome}</Nome>
              <Label style={{ color: '#ccc' }}> | </Label>
              <Label>{user.login}</Label>
              <Options>
                <Feather onPress={() => navigation.navigate('User', { id: user.id })} name="edit-2" size={20} />
                <Feather onPress={() => deleteUser(index)} name="trash-2" size={20} />
              </Options>
            </Row>
            <Label>{user.email}</Label>
            <Label>{user.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</Label>
            {user.token == "admin" ? (
              <Admin>
                <AdminLabel>Admin</AdminLabel>
              </Admin>) : null}
          </Card>
        ))}
        {users.length > 6 ? (
          <ContentFooter />
        ) : null}
      </Content>

      <ActionButton onPress={() => navigation.navigate("SignUp")} size={32} name='add' />
    </Container>
  )
}