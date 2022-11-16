import Button from '@components/Button';
import MoneyInput from '@components/MoneyInput';
import { IProducts } from '@interfaces/main';
import api from '@services/api';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Keyboard } from 'react-native';

import {
  Background,
  Card,
  Column,
  Container,
  ErrorMessage,
  Row,
  SubTitle,
  Title
} from './styles'

interface Product extends IProducts {
  entrada: number
  saida: number
}

interface Props {
  product: Product
  toogleModal: () => void
  setProducts: Dispatch<SetStateAction<Product[]>>
}

export default function AddForm({ product, setProducts, toogleModal }: Props) {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [quantity, setQuantity] = useState<number>(0);
  const [precoCusto, setPrecoCusto] = useState<number>(0);
  const [errors, setErrors] = useState({
    quantity: "",
    preco: ""
  });

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

  const handleSubmit = async () => {
    let _errors = {
      quantity: "",
      preco: ""
    }

    if (quantity == 0) _errors.quantity = "Por favor, insira uma quantidade"
    else if (!Number(quantity)) _errors.quantity = "Quantidade não é um número"
    else if (quantity < 0) _errors.quantity = "Quantidade não pode ser negativo"

    if (precoCusto == 0) _errors.preco = "Por favor, insira um preço de custo"
    else if (!Number(precoCusto)) _errors.preco = "Preço de custo não é um número"
    else if (precoCusto < 0) _errors.preco = "Preço de custo não pode ser negativo"
    else if (precoCusto >= product.valor_tabela) _errors.preco = `Preço de custo não pode ser maior ou igual ao atual valor de venda (R$${product.valor_tabela.toFixed(2)})`

    let hasError = false;

    Object.keys(_errors).forEach(function (key) {
      if (_errors[key as keyof typeof _errors] != "")
        hasError = true;
    })

    setErrors(_errors)

    if (!hasError) {

      let validatedData = {
        preco_custo: precoCusto,
        quantidade: quantity,
        produtoID: product.id
      }

      await api.post('estoque', {
        data: validatedData
      }).then(response => {
        setProducts(products => {
          return products.map(item => {
            if (item.id === product.id) {
              return { 
                ...item, 
                entrada: item.entrada + quantity, 
                preco_minimo: precoCusto > (item.preco_minimo || 0) ? precoCusto : item.preco_minimo }
            } else {
              return item
            }
          })
        })
        toogleModal();
      })
    }

  }

  return (
    <Container>
      <Background activeOpacity={1} onPress={
        keyboardVisible ? Keyboard.dismiss : toogleModal
      }
      />
      <Card>
        <Title>Adicionar ao estoque</Title>
        <SubTitle>{product.nome}</SubTitle>
        <Row>
          <Column>
            <MoneyInput
              value={quantity}
              onChangeValue={(text: number) => setQuantity(text)}
              delimiter="."
              precision={0}
              placeholder="Quantidade"
              label="Quantidade"
            />
          </Column>
          <Column>
            <MoneyInput
              value={precoCusto}
              onChangeValue={(text: number) => setPrecoCusto(text)}
              prefix="R$ "
              delimiter="."
              separator=","
              precision={2}
              placeholder="Preço custo"
              label="Preço custo"
            />
          </Column>
        </Row>
        {errors.preco ? <ErrorMessage>{errors.preco}</ErrorMessage> : null}
        {errors.quantity ? <ErrorMessage>{errors.quantity}</ErrorMessage> : null}
        <Button
          title="Finalizar"
          onPress={handleSubmit}
        />
      </Card>
    </Container>
  )
}