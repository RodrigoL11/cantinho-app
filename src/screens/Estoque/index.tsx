import React from 'react';
import { useNavigation } from '@react-navigation/native';

import Header from '@components/Header';

import {
    Container,
    Content
} from './styles'

export default function Estoque(){
    const navigation = useNavigation(); 

    return(
        <Container>
            <Header title="Estoque" onPress={() => navigation.goBack()}/>
            <Content>
                
            </Content>
        </Container>
    )
}