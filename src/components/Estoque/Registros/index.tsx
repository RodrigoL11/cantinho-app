import React, { useEffect, useState } from 'react';
import { IProducts } from '@interfaces/main';
import { Feather } from '@expo/vector-icons'

import {
  Card,
  Container, 
  Content,
  Title, 
  DateLabel,
  QuantityLabel,
  ValueLabel,
  IconContainer
} from './styles'
import Header from '@components/Header';
import api from '@services/api';
import Empty from '@components/Empty';
import { View } from 'react-native';

interface Props {
  toogleModal: () => void
  product: IProducts
}

interface Registro {
  id: number
  tipo: string
  created_at: Date
  quantidade: number
  valor: number
  produtoID: number
}

const pad = (n: number) => {
  return n < 10 ? '0' + n : n;
}

const months = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro'
]

const formatHour = (date: Date) => {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

const formatDate = (date: Date) => {
  return `${pad(date.getDate())} de ${months[date.getMonth()]}`
}

export default function Registros({ toogleModal, product }: Props) {
  const [registros, setRegistros] = useState<Registro[]>([]);

  const loadData = async () => {
    const response = await api.get(`estoque/registros/${product.id}`);
    const { results } = response.data;
    setRegistros(results);
  }

  useEffect(() => {
    loadData();
  }, [])

  const filteredResults = registros

  const Registro = (registro: Registro, index: number) => {
    return (
      <Card tipo={registro.tipo} key={index}>
        <IconContainer>
        <Feather 
        name={registro.tipo === 'E' 
        ? 'arrow-up' 
        : 'arrow-down'} 
        size={14}
        color={registro.tipo === 'E' 
        ? '#00C853' 
        : '#D50000'}
        />
        </IconContainer>
        <DateLabel>{formatHour(new Date(registro.created_at))} </DateLabel>
        <QuantityLabel style={{color: '#EF5350'}}>{registro.quantidade} </QuantityLabel>        
        <ValueLabel>R$ {registro.valor.toFixed(2)}</ValueLabel>
      </Card>
    )
  }

  return (
    <Container>
      <Header
        title="Registros"
        onPress={toogleModal}
      />
      {filteredResults.length > 0 ?
        <View>
          <Title>{product.nome}</Title>
          <Content>
            {filteredResults.map(Registro)}
          </Content>
        </View>
        :
        <Empty
          title={0 <= 0
            ? `Não há nenhum registro de entrada ou saída para\n${product.nome}`
            : "Registro não encontrado"}
          subtitle={0 <= 0
            ? "Crie um registro de estoque"
            : `Não encontramos nenhum resultado na\nbusca por "${'< :) >'}"`}
        />
      }
      <ActionButton 
        
      />
    </Container>
  )
}