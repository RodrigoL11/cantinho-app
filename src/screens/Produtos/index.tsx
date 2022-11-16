import React, { useEffect, useState } from 'react';
import { Keyboard, Modal, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'

import { IProducts } from '@interfaces/main';
import api from '@services/api';

import CreateProduct from '@components/FormsProduct/CreateProduct'
import EditProduct from '@components/FormsProduct/EditProduct'
import SearchInput from '@components/SearchInput';
import ActionButton from '@components/ActionButton';

import {
  Card,
  Category,
  Column,
  Container,
  Content,
  Label,
  Name,
  Row
} from './styles'
import Empty from '@components/Empty';

export default function Produtos() {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<IProducts | undefined>(undefined)

  const navigation = useNavigation();

  const loadData = async () => {
    try {
      const reponse = await api.get(`produtos`);
      const { results } = reponse.data;
      setProducts(results);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    navigation.addListener(
      'focus',
      payload => {
        loadData();
      }
    );
  }, [])

  useEffect(() => {
    navigation.setOptions({
      title: `Produtos (${products.filter(c => c.status != 'I').length})`
    })
  }, [products])

  const filteredProducts = search.length > 0
    ? products.filter(item => item.nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(search.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()))
    : products;

  return (
    <Container>
      <SearchInput
        value={search}
        onChangeText={setSearch}
        placeholder={"Buscar produto..."}
      />
      {filteredProducts.length > 0 ?
        <Content>
          {filteredProducts.map((item, index) => {
            return item.status === 'A' && (
              <TouchableHighlight
                style={{ marginTop: 1, marginBottom: 1 }}
                activeOpacity={0.8}
                underlayColor="#000"
                key={index}
                onPress={() => {
                  setSelected(item);
                  setShow(true);
                }}
              >
                <Card>
                  <Column>
                    <Row>
                      <Name>{item.nome}</Name>
                      <Category> ({item.categoria_nome})</Category>
                    </Row>
                    <Label>Valor de venda: R$ {item.valor_tabela.toFixed(2)}</Label>
                    <Label>Em estoque: {item.quantidade}</Label>
                  </Column>
                  <Column>
                    <Feather name="chevron-right" size={22} color="#b9b9b9" />
                  </Column>
                </Card>
              </TouchableHighlight>
            )
          })}
        </Content>
        :
        <Empty
          title={search.length === 0
            ? "Não há nenhum produto\ncadastrado"
            : "Produto não encontrado"}
          subtitle={search.length === 0
            ? "Cadastre um produto primeiro"
            : `Não encontramos nenhum resultado na\nbusca por "${search}"`}
        />
      }

      <ActionButton name="add" size={40} onPress={() => {
        setSelected(undefined);
        setShow(true)
      }
      } />
      <Modal
        visible={show}
        onRequestClose={() => setShow(false)}
        statusBarTranslucent={true}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {selected
            ? <EditProduct toogleForm={() => setShow(false)} setProducts={setProducts} products={products} pID={selected.id} />
            : <CreateProduct toogleForm={() => setShow(false)} setProducts={setProducts} />}
        </TouchableWithoutFeedback>

      </Modal>
    </Container>
  )
}