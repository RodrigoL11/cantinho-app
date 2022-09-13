import React, { useEffect, useState } from 'react'

import Button from '@components/Button';

import {
    Container,
    Background,
    Card,
    Title,
    Label,
    Row,
    Column,
    Input,
    ButtonContainer,
    ButtonTitle
} from './styles'
import { Alert } from 'react-native';

//arrumar isso
interface Props {
    toogleVisibility: () => void;
    setComandas: (data: any) => void;
    comandas: any;
    index?: number;
}

export default function FormsComanda({ toogleVisibility, comandas, setComandas, index }: Props) {
    const [nome, setNome] = useState<string>(index != undefined? comandas[index].name : '');
    const [mesa, setMesa] = useState(index != undefined? comandas[index].mesa.toString() : '1');
    const [error, setError] = useState('');

    const editComanda = () => {
        if (nome === '') setError('Precisa inserir o nome')
        else if (mesa === '') setError('Precisa inserir o número da mesa')
        else if(index != undefined){
            let newArr = comandas;
            newArr[index].name = nome;
            newArr[index].mesa = Number(mesa);

            setComandas(newArr)
            toogleVisibility();
        }
    }

    const createComanda = () => {
        if (nome === '') setError('Precisa inserir o nome')
        else if (mesa === '') setError('Precisa inserir o número da mesa')
        else {
            setComandas([...comandas, {
                id: 1,
                name: nome,
                mesa: Number(mesa),
                total: 5.5,
                pedidos: 1,
                data: [
                    {
                        name: "Bebidas",
                        total: 0,
                        items: [
                            { name: "Skol", price: 2, qtd: 0 },
                            { name: "Amstel", price: 3, qtd: 0, },
                            { name: "Brahma", price: 2.50, qtd: 0 },
                            { name: "Jesus", price: 1.50, qtd: 0 },
                            { name: "Kayser", price: 1.50, qtd: 0 }
                        ]
                    },
                    {
                        name: "Porções",
                        total: 0,
                        items: [
                            { name: "Frios", price: 10, qtd: 0 },
                            { name: "Peixe", price: 14, qtd: 0 }
                        ]
                    }
                ]
            }]);
            toogleVisibility();
        }
    }

    if (error != '') Alert.alert("Erro", error);

    return (
        <Container >
            <Background onPress={toogleVisibility} activeOpacity={0.0} />
            <Card>
                <Title>{index != undefined ? 'Editar comanda' : 'Criar comanda'}</Title>
                <Row>
                    <Column size={80}>
                        <Label>Nome</Label>
                        <Input
                            value={nome}
                            onChangeText={e => setNome(e)}
                        />
                    </Column>
                    <Column size={11}>
                        <Label>Mesa</Label>
                        <Input
                            maxLength={4}
                            value={mesa}
                            onChangeText={e => setMesa(e)}
                            keyboardType="numeric"
                        />
                    </Column>
                </Row>
                <ButtonContainer
                    onPress={index != undefined ? () => {editComanda()} : () => {createComanda()}}
                >
                    <ButtonTitle>{index != undefined ? 'Editar' : 'Criar'}</ButtonTitle>
                </ButtonContainer>
            </Card>
        </Container>
    )
}