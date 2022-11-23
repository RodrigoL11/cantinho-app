import React, { useEffect, useState } from 'react';
import { Keyboard, Modal, TouchableHighlight, TouchableWithoutFeedback, View } from 'react-native';
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
import Status from '@components/Filters/Status';
import ActiveProduct from '@components/FormsProduct/ActiveProduct';
import { formatCurrency, formatString } from '../../utils/main';
import { themes, useTheme } from '@hooks/theme';

export default function Produtos() {
  const [products, setProducts] = useState<IProducts[]>([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<IProducts | undefined>(undefined)
  const [status, setStatus] = useState("A");

  const navigation = useNavigation();
  const { theme } = useTheme();

  const loadData = async () => {
    try {
      const reponse = await api.get(`produtos/status=${status}`);
      const { results } = reponse.data;
      setProducts(results);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadData();
    const willFocusSubscription = navigation.addListener('focus', () => {
      loadData();
    });

    return willFocusSubscription;
  }, [status])

  useEffect(() => {
    navigation.setOptions({
      title: `Produtos (${filteredProducts.length})`
    })
  }, [products])

  const filteredProducts = search.length > 0
    ? products.filter(item => formatString(item.nome).includes(formatString(search)))
    : products;

  const inactiveProductColor = theme === 'dark' ? "#b71c1c" : "#ffc4c5"

  return (
    <Container>
      <SearchInput
        value={search}
        onChangeText={setSearch}
        placeholder={"Buscar produto..."}
      />
      <View style={{ paddingLeft: 15 }}>
        <Status
          status={status}
          setStatus={setStatus}
          options={
            {
              'A': 'Ativo',
              'I': 'Inativo',
              'T': 'Todos'
            }
          }
        />
      </View>
      {filteredProducts.length > 0 ?
        <Content>
          {filteredProducts.map((item, index) =>{
             if ((item.status !== status) && (status !== "T")) return;

             return ( 
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
                <Card style={item.status === "I" ? {backgroundColor: inactiveProductColor} : null}>
                  <Column>
                    <Row>
                      <Name style={theme === 'dark' && item.status === "I" ? {color: "#ffffff"} : null}>{item.nome}</Name>
                      <Category> ({item.categoria_nome})</Category>
                    </Row>
                    <Label>Valor de venda: {formatCurrency(item.valor_tabela)}</Label>
                    <Label>Em estoque: {item.quantidade}</Label>
                  </Column>
                  <Column>
                    <Feather name="chevron-right" size={22} color={themes[theme].colors.text_color[600]} />
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
            ?  selected.status === "I" ? <ActiveProduct status={status} toogleForm={() => setShow(false)} setProducts={setProducts} products={products} pID={selected.id}/> 
            : <EditProduct status={status} toogleForm={() => setShow(false)} setProducts={setProducts} products={products} pID={selected.id} />
            : <CreateProduct products={products} toogleForm={() => setShow(false)} setProducts={setProducts} />}
        </TouchableWithoutFeedback>

      </Modal>
    </Container>
  )
}