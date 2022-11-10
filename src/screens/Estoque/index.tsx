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
  Label,
  StrongLabel,
} from './styles'
import api from '@services/api';
import { View, TouchableHighlight } from 'react-native';
import SearchInput from '@components/SearchInput';
import Empty from '@components/Empty';

interface Product extends IProducts {
  entrada: number
  saida: number
}

export default function Estoque() {
  const navigation = useNavigation();
  const [products, setProdutos] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    if (products.length > 0) return;

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

  const filteredProducts = search.length > 0
    ? products.filter(item => item.nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(search.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()))
    : products;

  const Product = (product: Product, index: number) => {
    return (
      <TouchableHighlight
        style={{ marginTop: 1, marginBottom: 1 }}
        activeOpacity={0.9}
        underlayColor="#000"
        key={index}
        onPress={() => { console.log('oi') }}
      >
        <Card key={index}>
          <View>
            <Name>{product.nome}</Name>
            <Row>
              <Label>Preço de custo: </Label>
              <StrongLabel>R${product.preco_minimo?.toFixed(2)}</StrongLabel>
            </Row>
            <Row style={{ marginTop: 5 }}>
              <Row>
                <Entypo name="triangle-up" size={17} color="#458f5aea" />
                <Amount type="E">{product.entrada}</Amount>
              </Row>
              <Row>
                <Entypo name="triangle-down" size={17} color="#EC4F3Cea" />
                <Amount type="S">{product.saida}</Amount>
              </Row>
            </Row>
          </View>
          <Entypo name="chevron-right" size={24} color="#c4c4c4" />
        </Card>
      </TouchableHighlight>
    )
  }

  return (
    <Container>
      <Header title="Estoque" onPress={() => navigation.goBack()} />
      <SearchInput
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar produto..."
      />
      {filteredProducts.length > 0 ?
        <Content
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
        >
          {filteredProducts.map(Product)}
        </Content>
        :
        <Empty
          title={search.length < 0
            ? "Não há nenhum produto\ncadastrado"
            : "Produto não encontrado"}
          subtitle={search.length < 0
            ? "Cadastre um produto primeiro"
            : `Não encontramos nenhum resultado na\nbusca por "${search}"`}
        />
      }

    </Container>
  )
}