import React, { useEffect, useState } from 'react'
import { Alert, Keyboard, KeyboardAvoidingView, Modal, TouchableWithoutFeedback, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { IAddress, IPhone, IUser } from '@interfaces/main'
import api from '@services/api'
import Header from '@components/Header'

import CreateAddress from '@components/EditUser/CreateAddress'
import EditAddress from '@components/EditUser/EditAddress'
import CreatePhone from '@components/EditUser/CreatePhone'
import EditPhone from '@components/EditUser/EditPhone'
import EditPassword from '@components/EditUser/EditPassword'
import EditCPF from '@components/EditUser/EditCPF'
import EditEmail from '@components/EditUser/EditEmail'
import EditLogin from '@components/EditUser/EditLogin'
import EditName from '@components/EditUser/EditName'

import {
  AddButton,
  AddButtonContainer,
  AddButtonLabel,
  Container,
  Emoji,
  EmptyNotification,
  Section,
  Label,
  ItemContainer,
  ItemText,
  IconContainer,
  Content,
  DataContainer,
  DataLabel,
  Row,
  Items,
  SectionSeparator
} from './styles'
import { useAuth } from '@hooks/auth'

interface INoDataText {
  text: string
}

const NoDataText = ({ text }: INoDataText) => {
  return (
    <View>
      <Emoji>⚠️</Emoji>
      <EmptyNotification>
        {'\n'} Não há nenhum {text}{'\n'}cadastrado nesse usuário
      </EmptyNotification>
    </View>
  )
}

interface ItemProps {
  label: string,
  text?: string,
  last?: boolean,
  onPress: () => void;
}

const Item = ({ label, text, last, onPress }: ItemProps) => {
  return (
    <ItemContainer
      onPress={onPress}
      activeOpacity={1}
      style={last ? { borderColor: 'transparent' } : null}
    >
      <ItemText>{label}</ItemText>
      <ItemText>{text}</ItemText>
      <IconContainer>
        <Feather name="chevron-right" size={20} color="#777" />
      </IconContainer>
    </ItemContainer>
  )
}

export default function User({ route }: any) {
  const { id } = route.params;
  const { authData } = useAuth();
  const navigation = useNavigation();

  const [user, setUser] = useState<IUser>();
  const [phones, setPhones] = useState<IPhone[]>([]);
  const [address, setAddress] = useState<IAddress[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState<string>("");
  const [addressID, setAddressID] = useState<number>(0);
  const [phoneID, setPhoneID] = useState<number>(0);

  function toogleEditForm() {
    setShowForm(!showForm)
  }

  const toogleToken = () => {
    if (user?.token === 'admin') {
      Alert.alert(
        'Atenção',
        `Tem certeza que deseja remover o token de admin do usuário ${user.nome.split(' ')[0]}`,
        [
          {
            text: 'SIM',
            onPress: async () => {
              await api.put(`users/${user.id}`, {
                column: 'token',
                value: 'user'
              }).then(response => {
                setUser(
                  {
                    ...user,
                    token: 'user'
                  }
                )
              })
            }
          },
          {
            text: 'Cancelar',
            onPress: () => { return null },
            style: "cancel"
          }
        ]
      )
    } else if (user?.token === 'user') {
      Alert.alert(
        'Atenção',
        `Tem certeza que deseja adicionar o token de admin para o usuário ${user.nome.split(' ')[0]}`,
        [
          {
            text: 'SIM',
            onPress: async () => {
              await api.put(`users/${user.id}`, {
                column: 'token',
                value: 'admin'
              }).then(response => {
                setUser(
                  {
                    ...user,
                    token: 'admin'
                  }
                )
              })
            }
          },
          {
            text: 'Cancelar',
            onPress: () => { return null },
            style: "cancel"
          }
        ]
      )
    } else {
      Alert.alert(
        "Error",
        "Aconteceu um erro inesperado, recarregue a página por favor"
      )
    }
  }

  const loadData = async () => {
    try {
      const userResponse = await api.get(`users/${id}`);
      const userResult = userResponse.data.results;
      setUser(userResult[0]);

      const phoneResponse = await api.get(`phones/${id}`)
      const phoneResults = phoneResponse.data.results;
      setPhones(phoneResults);

      const addressResponse = await api.get(`address/${id}`)
      const addressResults = addressResponse.data.results;
      setAddress(addressResults);

    } catch (error) {
    }
  }

  useEffect(() => {
    loadData();
  }, [])

  const types = {
    'add-address': <CreateAddress address={address} setAddress={setAddress} toogleForm={toogleEditForm} uID={id} />,
    'edit-address': <EditAddress address={address} setAddress={setAddress} toogleForm={toogleEditForm} id={addressID} />,
    'add-phone': <CreatePhone phones={phones} setPhones={setPhones} toogleForm={toogleEditForm} uID={id} />,
    'edit-phone': <EditPhone phones={phones} setPhones={setPhones} toogleForm={toogleEditForm} id={phoneID} />,
    'edit-password': <EditPassword user={user} setUser={setUser} toogleForm={toogleEditForm} uID={id} />,
    'edit-cpf': <EditCPF user={user} setUser={setUser} toogleForm={toogleEditForm} uID={id} />,
    'edit-name': <EditName user={user} setUser={setUser} toogleForm={toogleEditForm} uID={id} />,
    'edit-email': <EditEmail user={user} setUser={setUser} toogleForm={toogleEditForm} uID={id} />,
    'edit-login': <EditLogin user={user} setUser={setUser} toogleForm={toogleEditForm} uID={id} />
  }

  return (
    <Container>
      <Header title="Configurações da conta" onPress={() => navigation.navigate('Users')} />
      <Content>
        <Items>
          <Item label="Nome" text={user?.nome}
            onPress={() => {
              toogleEditForm();
              setType("edit-name")
            }}
          />
          <Item label="CPF" text={user?.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}
            onPress={() => {
              toogleEditForm();
              setType("edit-cpf")
            }}
          />
          <Item label="Login" text={user?.login}
            onPress={() => {
              toogleEditForm();
              setType("edit-login")
            }}
          />
          <Item label="E-mail" text={user?.email}
            onPress={() => {
              toogleEditForm();
              setType("edit-email")
            }}
          />
          <Item label="Alterar senha" last={authData?.token === 'master' && user?.id !== authData.id ? false : true}
            onPress={() => {
              toogleEditForm();
              setType("edit-password")
            }}
          />
          {authData?.token === 'master' && user?.id !== authData.id ?
            <Item last={true} label={user?.token === 'admin' ? "Remover admin" : "Tornar admin"}
              onPress={toogleToken}
            />
            : null
          }

        </Items>
        <Label>Endereço</Label>
        <Section>
          {address.length == 0 ? (
            <NoDataText text="endereço" />
          ) : address.map((item, index) => (
            <DataContainer height={48} last={address[address.length - 1] === item} key={index}
              onPress={() => {
                setAddressID(item.id || 0);
                setType("edit-address");
                toogleEditForm();
              }}>
              <Row>
                <DataLabel>{item.logradouro}, </DataLabel>
                <DataLabel>{item.num_endereco}, </DataLabel>
                <DataLabel>{item.bairro}</DataLabel>
              </Row>
              <Row>
                <DataLabel>{item.cidade}, </DataLabel>
                <DataLabel>{item.estado}, </DataLabel>
                <DataLabel>{item.cep.replace(/(\d{5})/, "$1-")}</DataLabel>
              </Row>
            </DataContainer>
          ))}
        </Section>
        <SectionSeparator />
        <AddButtonContainer onPress={() => {
          setType("add-address")
          toogleEditForm();
        }}>
          <AddButton>
            <Feather name="plus" color="#DC1637" size={18} />
          </AddButton>
          <AddButtonLabel>Adicionar um novo endereço</AddButtonLabel>
        </AddButtonContainer>

        <Label>Telefone</Label>
        <Section>
          {phones.length == 0 ? (
            <NoDataText text="endereço" />
          ) : phones.map((item, index) =>
            <DataContainer height={37} last={phones[phones.length - 1] === item} key={index}
              onPress={() => {
                setPhoneID(item.id || 1);
                setType("edit-phone");
                toogleEditForm();
              }}>
              <DataLabel>+{item.DDI} {item.DDI == "55" ? `(${item.DDD || ""})` : item.DDD} {item.DDI !== "55" ? item.num_telefone : item.num_telefone.length === 9 ? item.num_telefone.replace(/(\d{5})/, "$1-") : item.num_telefone.replace(/(\d{4})/, "$1-")}</DataLabel>
            </DataContainer>
          )}
        </Section>
        <SectionSeparator />
        <AddButtonContainer onPress={() => {
          setType("add-phone");
          toogleEditForm();
        }} >
          <AddButton>
            <Feather name="plus" color="#DC1637" size={18} />
          </AddButton>
          <AddButtonLabel>Adicionar um novo telefone</AddButtonLabel>
        </AddButtonContainer>

      </Content>
      <Modal
        visible={showForm}
        transparent={true}
        onRequestClose={toogleEditForm}
        statusBarTranslucent={true}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            {types[type as keyof typeof types]}
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    </Container>
  )
}