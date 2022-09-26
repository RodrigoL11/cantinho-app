import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Modal } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { IAddress, IPhone, IUser } from '@interfaces/main'
import api from '@services/api'
import Header from '@components/Header'
import EditUser from '@components/EditUser'
import CreateAddress from '@components/EditUser/CreateAddress'
import EditAddress from '@components/EditUser/EditAddress'
import CreatePhone from '@components/EditUser/CreatePhone'
import EditPhone from '@components/EditUser/EditPhone'

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
  Items
} from './styles'

interface INoDataText{
  text: string
}

const NoDataText = ({text}: INoDataText) => {
  return (
    <>
      <Emoji>⚠️</Emoji>
      <EmptyNotification>
        {'\n'} Não há nenhum {text}{'\n'}cadastrado nesse usuário
      </EmptyNotification>
    </>
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

export interface User extends IUser {
  id: number;
}

export default function User({ route }: any) {
  const { id } = route.params;
  const navigation = useNavigation();

  const [user, setUser] = useState<User>();
  const [phones, setPhones] = useState<IPhone[]>([]);
  const [address, setAddress] = useState<IAddress[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [type, setType] = useState<string>("");
  const [addressID, setAddressID] = useState<number>(0);
  const [phoneID, setPhoneID] = useState<number>(0);

  function toogleEditForm() {
    setShowForm(!showForm)
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

      console.error(error);
    }
  }

  useEffect(() => {
    loadData();
  }, [])

  const types = {
    'add-address': <CreateAddress address={address} setAddress={setAddress} toogleForm={toogleEditForm} id={id} />,
    'edit-address': <EditAddress address={address} setAddress={setAddress} toogleForm={toogleEditForm} id={addressID} />,
    'add-phone': <CreatePhone phones={phones} setPhones={setPhones} toogleForm={toogleEditForm} id={id} />,
    'edit-phone': <EditPhone phones={phones} setPhones={setPhones} toogleForm={toogleEditForm} id={phoneID} />,
  }

  return (
    <Container>
      <Header title="Configurações da conta" onPress={() => navigation.navigate('Users')} />
      <Content>
        <Items>
          <Item label="Nome" text={user?.nome}
            onPress={() => {
              toogleEditForm();
              setType("Nome")
            }}
          />
          <Item label="CPF" text={user?.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}
            onPress={() => {
              toogleEditForm();
              setType("CPF")
            }}
          />
          <Item label="Login" text={user?.login}
            onPress={() => {
              toogleEditForm();
              setType("Login")
            }}
          />
          <Item label="E-mail" text={user?.email}
            onPress={() => {
              toogleEditForm();
              setType("E-mail")
            }}
          />
          <Item label="Alterar senha" last={true}
            onPress={() => {
              toogleEditForm();
              setType("Senha")
            }}
          />
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
        <AddButtonContainer onPress={() => {
          setType("add-address")
          toogleEditForm();
        }}>
          <AddButton>
            <Feather name="plus" color="#DC1637" size={18} />
          </AddButton>
          <AddButtonLabel>Adicionar um Novo Endereço</AddButtonLabel>
        </AddButtonContainer>

        <Label>Telefone</Label>
        <Section>
          {phones.length == 0 ? (
            <NoDataText text="telefone"/>
          ) : phones.map((item, index) => (
            <DataContainer height={18} last={phones[phones.length - 1] === item} key={index}
            onPress={() => {              
              setPhoneID(item.id || 1);
              setType("edit-phone");
              toogleEditForm();
            }}>
              <DataLabel>+{item.DDI} ({item.DDD}) {item.num_telefone.replace(/(\d{5})/, "$1-")}</DataLabel>
            </DataContainer>
          ))}
        </Section>
        <AddButtonContainer onPress={() => {
          setType("add-phone");
          toogleEditForm();
        }} >
          <AddButton>
            <Feather name="plus" color="#DC1637" size={18} />
          </AddButton>
          <AddButtonLabel>Adicionar um Novo Telefone</AddButtonLabel>
        </AddButtonContainer>

      </Content>
      <Modal
        visible={showForm}
        transparent={true}
        onRequestClose={toogleEditForm}
        statusBarTranslucent={true}
      >
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          {type in types ? types[type as keyof typeof types] : (
            <EditUser user={user} setUser={setUser} id={user?.id} type={type} onPress={toogleEditForm} />
          )}
        </KeyboardAvoidingView>
      </Modal>
    </Container>
  )
}