import React, { useEffect, useState } from 'react'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { IAddress, IPhone, IUser } from '@interfaces/main'
import api from '@services/api'

import Header from '@components/Header'

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
    Row
} from './styles'
import EditUser from '@components/EditUser'

const NoDataText = () => {
    return (
        <>
            <Emoji>⚠️</Emoji>
            <EmptyNotification>
                {'\n'} Não há nenhum endereço{'\n'}cadastrado nesse usuário
            </EmptyNotification>
        </>
    )
}

interface User extends IUser {
    id: number;
}

export default function User({ route }: any) {
    const { id } = route.params;
    const navigation = useNavigation();

    const [user, setUser] = useState<User>();
    const [phones, setPhones] = useState<IPhone[]>([]);
    const [address, setAddress] = useState<IAddress[]>([]);
    const [showForm, setShowForm] = useState(false)
    const [type, setType] = useState<string>("")

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

    return (
        <Container>
            <Header title="Configurações da conta" onPress={() => navigation.navigate('Users')} />

            <Content>
                <ItemContainer
                    onPress={() => {
                        toogleEditForm();
                        setType("Nome")
                    }}
                    activeOpacity={1}
                    style={{ marginTop: 15 }}
                >
                    <ItemText>Nome</ItemText>
                    <ItemText>{user?.nome}</ItemText>
                    <IconContainer>
                        <Feather name="chevron-right" size={20} color="#777" />
                    </IconContainer>
                </ItemContainer>

                <ItemContainer
                    onPress={() => {
                        toogleEditForm();
                        setType("CPF")
                    }}
                    activeOpacity={1}
                >
                    <ItemText>CPF</ItemText>
                    <ItemText>{user?.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")}</ItemText>
                    <IconContainer>
                        <Feather name="chevron-right" size={20} color="#777" />
                    </IconContainer>
                </ItemContainer>

                <ItemContainer
                    onPress={() => {
                        toogleEditForm();
                        setType("Login")
                    }}
                    activeOpacity={1}
                >
                    <ItemText>Login</ItemText>
                    <ItemText>{user?.login}</ItemText>
                    <IconContainer>
                        <Feather name="chevron-right" size={20} color="#777" />
                    </IconContainer>
                </ItemContainer>

                <ItemContainer
                    onPress={() => {
                        toogleEditForm();
                        setType("E-mail")
                    }}
                    activeOpacity={1}
                >
                    <ItemText>E-mail</ItemText>
                    <ItemText>{user?.email}</ItemText>
                    <IconContainer>
                        <Feather name="chevron-right" size={20} color="#777" />
                    </IconContainer>
                </ItemContainer>

                <ItemContainer
                    onPress={() => {
                        toogleEditForm();
                        setType("Senha")
                    }}
                    activeOpacity={1}
                    style={{ borderColor: 'transparent' }}
                >
                    <ItemText>Trocar senha</ItemText>
                    <IconContainer>
                        <Feather name="chevron-right" size={20} color="#777" />
                    </IconContainer>
                </ItemContainer>

                <Label>Endereço</Label>
                <Section>
                    {address.length == 0 ? (
                        <NoDataText />
                    ) : address.map((item, index) => (
                        <DataContainer key={index}>
                            <Row>
                                <DataLabel>{item.logradouro}, </DataLabel>
                                <DataLabel>{item.num_endereco}, </DataLabel>
                                <DataLabel>{item.bairro}</DataLabel>
                            </Row>
                            <Row>
                                <DataLabel>{item.cidade}, </DataLabel>
                                <DataLabel>{item.estado}, </DataLabel>
                                <DataLabel>{item.cep}</DataLabel>
                            </Row>
                        </DataContainer>
                    ))}
                </Section>
                <AddButtonContainer>
                    <AddButton>
                        <Feather name="plus" color="#DC1637" size={18} />
                    </AddButton>
                    <AddButtonLabel>Adicionar um Novo Telefone</AddButtonLabel>
                </AddButtonContainer>

                <Label>Telefone</Label>
                <Section>
                    {phones.length == 0 ? (
                        <NoDataText />
                    ) : phones.map((item, index) => (
                        <DataContainer key={index}>
                            <DataLabel>+{item.DDI} ({item.DDD}) {item.num_telefone.replace(/(\d{5})/, "$1-")}</DataLabel>
                        </DataContainer>
                    ))}
                </Section>
                <AddButtonContainer>
                    <AddButton>
                        <Feather name="plus" color="#DC1637" size={18} />
                    </AddButton>
                    <AddButtonLabel>Adicionar um Novo Endereço</AddButtonLabel>
                </AddButtonContainer>

            </Content>
            {showForm ? (
                <EditUser user={user} setUser={setUser} id={user?.id} type={type} onPress={toogleEditForm} />
            ) : null}
        </Container>
    )
}