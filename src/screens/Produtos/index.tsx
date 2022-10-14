import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'

import CreateProduct from '@components/EditProduct/CreateProduct'
import EditProduct from '@components/EditProduct/EditProduct'

import {
  Card,
  Column,
  Container,
  Content,
  Label,
  Name,
  Row
} from './styles'
import { IProducts } from '@interfaces/main';
import api from '@services/api';
import SearchInput from '@components/SearchInput';
import { Keyboard, Modal, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import ActionButton from '@components/ActionButton';

export default function Produtos() {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);

  const navigation = useNavigation();

  const loadData = async () => {
    try {
      const reponse = await api.get(`produtos`);
      const { results } = reponse.data;
      setProducts(results);
      navigation.setOptions({
        title: `Produtos (${results.length})`
      })
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadData();
  }, [])

  const filteredProducts = search.length > 0
    ? products.filter(item => item.nome.toLowerCase().includes(search.toLowerCase()))
    : products;

  return (
    <Container>
      <SearchInput
        value={search}
        onChangeText={setSearch}
        placeholder={"Buscar produto..."}
      />
      <Content>
        {filteredProducts.map((item, index) => {
          return item.status === 'ativo' && (
            <TouchableHighlight
              style={{ marginTop: 1, marginBottom: 1 }}
              activeOpacity={0.8}
              underlayColor="#000"
              key={index}
              onPress={() => { console.log('oi') }}
            >
              <Card >
                <Column>
                  <Row>
                    <Label>#{item.id} </Label>
                    <Name>{item.nome} - </Name>
                    <Label>{item.categoria_nome}</Label>
                  </Row>
                  <Label>R$ {item.valor_tabela.toFixed(2)}</Label>
                  <Label>Em estoque: {item.quantidade_estoque}</Label>
                </Column>
                <Column>
                  <Feather name="chevron-right" size={30} color="#999" />
                </Column>
              </Card>
            </TouchableHighlight>
          )
        })}
      </Content>

      <ActionButton name="add" size={40} onPress={() => setShow(true)} />
      <Modal
        visible={show}
        onRequestClose={() => setShow(false)}
        statusBarTranslucent={true}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <CreateProduct />
        </TouchableWithoutFeedback>

      </Modal>
    </Container>
  )
}