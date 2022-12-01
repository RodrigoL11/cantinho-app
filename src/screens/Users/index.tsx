import React, { useEffect, useState } from 'react';
import { Alert, TouchableWithoutFeedback } from 'react-native';

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
import { formatString } from '../../utils/main';
import SearchInput from '@components/SearchInput';
import { useAuth } from '@hooks/auth';
import { themes, useTheme } from '@hooks/theme';

interface User extends IUser {
  id: number;
}

export default function Users() {
  const navigation = useNavigation();
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState("");
  const { theme } = useTheme();
  const color = themes[theme].colors.text_color[700];

  const { authData } = useAuth();

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

    if (authData?.id === uID) {
      Alert.alert("Atenção", "Não há permissão para inativar seu próprio usuário!")
      return;
    }

    if (delUser.token !== "user" && authData?.token !== "master") {
      Alert.alert("Atenção", "Não há permissão para inativar usuários master ou administradores!")
      return;
    }    

    Alert.alert(
      "Inativar usuário",
      `Tem certeza que deseja inativar o usuário ${delUser.nome}?`,
      [
        {
          text: "Sim",
          onPress: async () => {
            await api.delete(`users/${uID}`)
            .then(() => {
              setUsers(users => {
                return users.map(user => {
                  if(user.id === uID) {
                    return { ...user, status: "I"}
                  } else {
                    return user;
                  }
                })
              })
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

  const activeUser = (id: number) => {
    const delUser = users[id]
    const uID = delUser.id    

    Alert.alert(
      "Ativar usuário",
      `Tem certeza que reativar o usuário ${delUser.nome}?`,
      [
        {
          text: "Sim",
          onPress: async () => {
            await api.put(`users/${uID}`, {
              column: 'status',
              value: 'A'
            }).then(() => {
              setUsers(users => {
                return users.map(user => {
                  if(user.id === uID) {
                    return { ...user, status: "A"}
                  } else {
                    return user;
                  }
                })
              })
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

  const filteredUsers = search.length > 0 
  ? users.filter(item => formatString(item.nome).includes(formatString(search)))
  : users

  const inactiveUserColor = theme === 'dark' ? "#b71c1c" : "#ffc4c5"

  return (
    <Container>
      <Header title="Usuários" onPress={navigation.goBack} />
      <SearchInput 
        value={search}
        onChangeText={setSearch}
        placeholder="Busque por um usuário..."
      />
      <Content>
        {filteredUsers.map((user, index) =>
          <Card key={index} style={user.status === "I" ? { backgroundColor: inactiveUserColor } : null}>
            <Row>
              <Nome>{user.nome}</Nome>
              <Label> | </Label>
              <Label>{user.login}</Label>
              <Options>
                <TouchableWithoutFeedback
                  onPress={user.status !== "I"
                    ? () => navigation.navigate('User', { id: user.id })  
                    : () => Alert.alert("Atenção", "Usuário inativado, para editar reative o usuário.")}>
                  <Feather name="edit" size={18} color={color} />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback                  
                  onPress={user.status !== "I"
                    ? () => deleteUser(index)
                    : () => activeUser(index)}>
                  <Feather name={user.status !== "I" ? "trash-2" : "refresh-ccw"} size={18} color={color} />
                </TouchableWithoutFeedback>
              </Options>
            </Row>
            <Label>{user.email}</Label>
            <Label>{user.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</Label>
            {user.token !== "user" ? (
              <Admin>
                <AdminLabel>{user.token.charAt(0).toUpperCase() + user.token.slice(1)}</AdminLabel>
              </Admin>) : null}
          </Card>
        )}
        {users.length > 6 ? (
          <ContentFooter />
        ) : null}
      </Content>

      <ActionButton onPress={() => navigation.navigate("SignUp")} size={32} name='add' />
    </Container>
  )
}