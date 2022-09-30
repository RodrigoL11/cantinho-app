import React, { useState } from "react";
import { Ionicons } from '@expo/vector-icons';

import { ListItem } from '../AccordionMenu'

import {
  Name,
  Container,
  Column,
  Value,
  QuantityContainer,
  Quantity,
} from "./styles";
import { IProdutos } from "@interfaces/main";
interface Props {
  data: IProdutos
}

export default function Item({ data }: Props) {
  const { nome, valor_tabela } = data

  const [quantity, setQuantity] = useState<number>(0);

  return (
    <Container>
      <Column>
        <Name>{nome}</Name>
        <Value>R$ {valor_tabela.toFixed(2)}</Value>
      </Column>
      <QuantityContainer removeClippedSubviews={true}>
        <Ionicons
          name="remove-circle"
          color="red"
          size={26}
          onPress={() => quantity > 0 ? setQuantity(quantity - 1) : 0}
        />
        <Quantity
          contextMenuHidden={true}
          value={quantity.toString()}
          onChangeText={e => setQuantity(Number(e))}
          keyboardType="numeric"
          maxLength={2}
        />
        <Ionicons
          color="green"
          name="add-circle"
          size={26}
          onPress={() => quantity < 99 ? setQuantity(quantity + 1) : 0}
        />
      </QuantityContainer>
    </Container>
  );
}
