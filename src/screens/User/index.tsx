import React, { useState } from 'react'
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
    SectionLabel
} from './styles'


export default function User({ route }: any) {
    const { id } = route.params;
    const navigation = useNavigation();

    const [user, setUser] = useState<IUser>();
    const [phones, setPhones] = useState<IPhone[]>([]);
    const [address, setAddress] = useState<IAddress[]>([]);

    const loadData = async () => {
        const userResponse = await api.get(`/users/${id}`);
        const userResult = userResponse.data.results
    }

    console.log(id)

    return (
        <Container>
            <Header title="Configurações da conta" onPress={() => navigation.navigate('Users')} />
            


            <SectionLabel>Endereço</SectionLabel>
            <Section>
                {address.length == 0 ? (
                    <>
                        <Emoji>⚠️</Emoji>
                        <EmptyNotification>
                            {'\n'} Não há nenhum endereço{'\n'}cadastrado nesse usuário
                        </EmptyNotification>
                    </>
                ) : null}
            </Section>
            <AddButtonContainer>
                <AddButton>
                    <Feather name="plus" color="#DC1637" size={18} />
                </AddButton>
                <AddButtonLabel>Adicionar um Novo Telefone</AddButtonLabel>
            </AddButtonContainer>
            <SectionLabel>Telefone</SectionLabel>
            <Section>
                {phones.length == 0 ? (
                    <>
                        <Emoji>⚠️</Emoji>
                        <EmptyNotification>
                            {'\n'} Não há nenhum telefone{'\n'}cadastrado nesse usuário
                        </EmptyNotification>
                    </>
                ) : null}
            </Section>
            <AddButtonContainer>
                <AddButton>
                    <Feather name="plus" color="#DC1637" size={18} />
                </AddButton>
                <AddButtonLabel>Adicionar um Novo Endereço</AddButtonLabel>
            </AddButtonContainer>

        </Container>
    )
}