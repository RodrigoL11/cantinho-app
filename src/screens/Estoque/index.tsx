import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

import Header from '@components/Header';
import { IProducts } from '@interfaces/main';

import {
  Amount,
  Card,
  Container,
  Content,
  Name,
  Row,
  Separator,
  Value,
  ValueLabel
} from './styles'
import api from '@services/api';

interface Product extends IProducts {
  entrada: number
  saida: number
}

export default function Estoque() {
  const navigation = useNavigation();
  const [produtos, setProdutos] = useState<Product[]>([]);

  const loadData = async () => {
    if (produtos.length > 0) return;

    try {
      const response = await api.get('produtos');
      const { results } = response.data;

      results.forEach(async (result: IProducts) => {
        const ES_response = await api.get(`estoque/entrada_saida/${result.id}`)
        const ES_results = ES_response.data.results;
        const { entrada, saida } = ES_results[0];

        setProdutos(arr => [...arr, {
          ...result,
          entrada: entrada,
          saida: saida
        }])

      })
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadData();
  }, [])

  const Product = (product: Product, index: number) => {
    return (
      <Card key={index}>
        <Name>{product.nome}</Name>
        <Row>
          <ValueLabel>Preço de custo: </ValueLabel>
          <Value>R${product.preco_minimo?.toFixed(2)}</Value>
        </Row>
        <Row>
          <ValueLabel>Valor de venda: </ValueLabel>
          <Value>R${product.valor_tabela.toFixed(2)}</Value>
        </Row>
        <Row style={{marginTop: 5}}>
          <Row>
            <Entypo name="triangle-up" size={20} color="#458f5aea" />
            <Amount type="E">{product.entrada}</Amount>
          </Row>
          <Row>
            <Entypo name="triangle-down" size={20} color="#EC4F3Cea" />
            <Amount type="S">{product.saida}</Amount>
          </Row>
        </Row>
        {product.id !== produtos[produtos.length - 1].id && <Separator />}
      </Card>
    )
  }

  return (
    <Container>
      <Header title="Estoque" onPress={() => navigation.goBack()} />
      <Content>
        {produtos.map(Product)}
      </Content>
    </Container>
  )
}