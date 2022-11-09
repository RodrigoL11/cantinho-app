import React, { Dispatch, SetStateAction, useState } from 'react';
import Header from '@components/Header';
import { ICartItems, IProducts } from '@interfaces/main';
import { Ionicons } from '@expo/vector-icons'

import {
  AddButtonContainer,
  AddButtonTitle,
  ButtonContainer,
  ButtonTitle,
  Card,
  Column,
  Container,
  Content,
  Footer,
  Label,
  Row,
  Separator,
  Text,
  Total,
  TotalLabel
} from './styles'
import { Alert, ScrollView, View } from 'react-native';
import api from '@services/api';
import { useAuth } from '@hooks/auth';
import { useNavigation } from '@react-navigation/native';

interface Props {
  setCartItems: Dispatch<SetStateAction<ICartItems[]>>
  setProducts: Dispatch<SetStateAction<IProducts[]>>
  cartItems: ICartItems[]
  toogleModal: () => void
  comandaID: number
}

export default function FinalizarPedido({ toogleModal, cartItems, setCartItems, setProducts, comandaID }: Props) {
  const [_cartItems, _setCartItems] = useState<ICartItems[]>(cartItems);
  const { authData } = useAuth();
  const navigation = useNavigation();

  const sumCartTotal = () => {
    let total = 0;

    _cartItems.forEach(item => {
      total += item.product.valor_tabela * item.quantity
    })

    return `R$ ${total.toFixed(2)}`
  }

  const handleSubmit = async () => {
    if (!authData) return null;

    let pedidoID = 0;

    try {
      await api.post('pedidos', {
        data: {
          uID: authData.id,
          cID: comandaID
        }
      }).then(response => {
        let newID = response.data.result.insertId;
        pedidoID = newID;
      })

      _cartItems.forEach(async (item) => {
        const { product } = item;

        await api.post('pedidos_itens', {
          data: {
            quantidade: item.quantity,
            valor_tabela: product.valor_tabela,
            produtoID: product.id,
            pedidoID: pedidoID
          }
        })
      })

      Alert.alert("Sucesso", "Pedido criado com sucesso")
      navigation.goBack();
    } catch (err) {
      console.error(err)
    }
  }

  function handleRemove(id: number) {
    const removedProduct = _cartItems.find(item => item.product.id === id);
    const newArr = _cartItems.filter(i => i.product.id !== id);
    setCartItems(newArr);
    _setCartItems(newArr);

    setProducts(products => {
      return products.map(item => {
        if (item.id === id) {
          return { ...item, quantidade: item.quantidade + (removedProduct?.quantity || 0) }
        } else {
          return item
        }
      })
    })

    if (newArr.length === 0)
      toogleModal();
  }

  return (
    <Container>
      <Header onPress={toogleModal} title="Meu pedido" />
      <ScrollView>
        <Content>
          <Row style={{ marginBottom: 3 }}>
            <Label>Itens</Label>
            <Label style={{ marginRight: 22 }}>Preço</Label>
          </Row>
          {_cartItems.map((item, index) => (
            <View key={index}>
              <Card>
                <Text>{item.quantity}× {item.product.nome}</Text>
                <Column>
                  <Text style={{ marginRight: 5 }}>R$ {(item.quantity * item.product.valor_tabela).toFixed(2)}</Text>
                  <Ionicons name="trash-outline" onPress={() => handleRemove(item.product.id)} size={17} />
                </Column>
              </Card>
              {_cartItems[_cartItems.length - 1] !== item && <Separator />}
            </View>
          ))}
          <AddButtonContainer activeOpacity={0.85} onPress={toogleModal}>
            <AddButtonTitle>Adicionar mais itens</AddButtonTitle>
          </AddButtonContainer>
          <Row>
            <TotalLabel>Total</TotalLabel>
            <Total>{sumCartTotal()}</Total>
          </Row>
        </Content>
      </ScrollView>
      <Footer>
        <ButtonContainer onPress={handleSubmit}>
          <ButtonTitle>Finalizar pedido</ButtonTitle>
          <Ionicons name="ios-arrow-forward-outline" size={20} color="#fff" />
        </ButtonContainer>
      </Footer>
    </Container>
  )
}