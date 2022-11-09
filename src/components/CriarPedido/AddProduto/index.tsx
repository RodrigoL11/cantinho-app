import { ICartItems, IProducts } from '@interfaces/main';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons'

import {
  AddButton,
  AddButtonLabel,
  Background,
  Card,
  Column,
  Container,
  Name,
  Price,
  Quantity,
  QuantityButton,
  QuantityContainer,
  Row,
  Stock,
  Title,
} from './styles'
import { Alert, Keyboard } from 'react-native';

interface Props {
  product: IProducts
  toogleModal: () => void
  setCartItems: Dispatch<SetStateAction<ICartItems[]>>;
  setProducts: Dispatch<SetStateAction<IProducts[]>>;
}

export default function AddProduto({ product, toogleModal, setCartItems, setProducts }: Props) {
  const [quantity, setQuantity] = useState(1);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const handleSubmit = () => {
    if (quantity === 0) return null;
    if (quantity > product.quantidade){
      Alert.alert("Atenção", "Quantidade inserida maior do que a em estoque!")

      return null;
    }

    setCartItems(currItems => {
      if (currItems.find(item => item.product.id === product.id) == null) {
        return [...currItems, { product, quantity: quantity}]
      } else {
        return currItems.map(item => {
          if (item.product.id === product.id) {
            return { ...item, quantity: item.quantity + quantity }
          } else {
            return item
          }
        })
      }
    })

    setProducts(products => {
      return products.map(item => {
        if (item.id === product.id) {
          return { ...item, quantidade: item.quantidade - quantity }
        } else {
          return item
        }
      })
    })

    toogleModal();
  }

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  
  return (
    <Container>
      <Background activeOpacity={1} onPress={
        isKeyboardVisible ? Keyboard.dismiss : toogleModal
        } />
      <Card>
        <Title>Adicionar ao pedido</Title>
        <Name>{product.nome}</Name>
        <Stock>Em estoque: {product.quantidade}</Stock>
        <Price>R$ {product.valor_tabela.toFixed(2)}</Price>
        <Row>
          <QuantityContainer removeClippedSubviews={true}>
            <QuantityButton activeOpacity={0.75} onPress={() => {
              if (quantity <= 1) return null;
              setQuantity(quantity - 1)
            }}>
              <Feather name="minus" size={22} color="#fff" />
            </QuantityButton>
            <Quantity 
              contextMenuHidden={true}
              value={quantity.toString()}
              keyboardType="numeric"
              onChangeText={value => {                
                setQuantity(Number(value));
              }}
              maxLength={2}              
            />
            <QuantityButton activeOpacity={0.75} onPress={() => {
              if (quantity >= 99) return null;
              setQuantity(quantity + 1)
            }}>
              <Feather name="plus" size={22} color="#fff" />
            </QuantityButton>
          </QuantityContainer>
          <Column>
            <AddButton activeOpacity={0.75} onPress={handleSubmit}>
              <AddButtonLabel>Adiciconar</AddButtonLabel>
              <AddButtonLabel>R$ {(quantity * product.valor_tabela).toFixed(2)}</AddButtonLabel>
            </AddButton>
          </Column>
        </Row>

      </Card>
    </Container>
  )
}