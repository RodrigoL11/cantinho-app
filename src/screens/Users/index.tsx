import React, { useState } from 'react';

import { useNavigation } from "@react-navigation/native";
import { Feather } from '@expo/vector-icons'
import api from '@services/api'
import { IUser } from '@interfaces/main'

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

export default function Users() {
  const navigation = useNavigation();
  const [users, setUsers] = useState<IUser[]>([])

  const loadData = async () => {
    try {
        const response = await api.get('users/wholeData');

        const { results } = response.data;
        
        setUsers(results)
    } catch(err) {
        // adicionar tratamento da exceção
        console.error(err);
    }
};

  React.useEffect(() => {
    loadData();
  }, []);

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
              <Label>+{user.DDI} ({user.DDD}) {user.num_telefone}</Label>
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
              <Label>{user.logradouro}, </Label>
              <Label>{user.num_endereco}, </Label>
              <Label>{user.bairro}</Label>
            </Row>
            <Row>
              <Label>{user.cidade}, </Label>
              <Label>{user.estado}, </Label>
              <Label>{user.cep}</Label>
            </Row>
            {user.token == "admin" ? (
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