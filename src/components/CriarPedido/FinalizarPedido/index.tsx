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
    
    let hasError = false;
    //objeto com referencias da tabela de estoque vão ser utilizados no pedido
    let stockRef: { id: number, qty: number, produto_id: number }[] = [];

    try {
      await Promise.all(_cartItems.map(async (item, index) => {
        const response = await api.get(`estoque/${item.product.id}`)
        const { results } = await response.data        
        var sum = results.reduce((prev: number, obj: { quantidade_atual: number }) => prev + obj.quantidade_atual, 0)
        if (item.quantity > sum) {
          Alert.alert("Atenção", `Quantidade do produto ${item.product.nome} maior do que a em estoque.`)
          hasError = true;
        } else {          
          let qty = item.quantity;
          let idx = 0;          
          
          while (qty > 0) {     
            //registro do estoque
            let stock = results[idx]
      
            //se a quantidade do pedido for menor que a atual, ele entende que não irá procurar no proximo registro de estoque
            //então ia atribuir a quantidiade do pedido e o id do estoque
            if (qty <= stock.quantidade_atual) {
              stockRef.push({
                id: stock.id,
                qty: qty,
                produto_id: item.product.id
              })
            //se a quantidade for maior que a do estoque, ele vai referenciar a quantidade atual em estoque, e vai dar a entender
            //que irá para o próximo registro de estoque para assimiliar de onde tem que tirar o restante da quantidade para
            //finalizar o pedido
            } else {
              stockRef.push({
                id: stock.id,
                qty: stock.quantidade_atual,
                produto_id: item.product.id
              })
            }
            //subtraindo a quantidade atual do pedido da quantidade atual presente no estoque
            qty -= stock.quantidade_atual;
            //+1 para a navegar pelos registros de estoque
            idx++;
          }                    
        }
      }))
      if (hasError) return;

      let pedidoID = 0;

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

        const _stockRef = stockRef.filter(ref => ref.produto_id === product.id);

        for await (const ref of _stockRef){
          await api.post('pedidos_itens', {
            data: {
              quantidade: ref.qty,
              valor_tabela: product.valor_tabela,
              produtoID: product.id,
              pedidoID: pedidoID,
              estoqueID: ref.id,              
            }
          })
        }
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