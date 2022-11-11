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
import { View, TouchableHighlight, Modal, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import SearchInput from '@components/SearchInput';
import Empty from '@components/Empty';
import Registros from '@components/Estoque/Registros';

interface Product extends IProducts {
  entrada: number
  saida: number
}

export default function Estoque() {
  const navigation = useNavigation();
  const [products, setProdutos] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);

  const loadData = async () => {
    if (products.length > 0) return;

    try {
      const response = await api.get('estoque');
      const { results } = response.data;
      setProdutos(results);
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

  const toogleModal = (product?: Product) => {
    setSelectedProduct(product);
    setShow(!show)
  }

  const Product = (product: Product, index: number) => {
    return (
      <TouchableHighlight
        style={{ marginTop: 1, marginBottom: 1 }}
        activeOpacity={0.9}
        underlayColor="#000"
        key={index}
        onPress={() => { toogleModal(product) }}
      >
        <Card>
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

      <Modal
        visible={show}
        onRequestClose={toogleModal}
        transparent={true}
        statusBarTranslucent={true}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            {selectedProduct && <Registros product={selectedProduct} toogleModal={toogleModal} />}
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    </Container>
  )
}