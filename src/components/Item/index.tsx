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


interface DataProps {
  data: ListItem
}

export default function Item({ data }: DataProps) {
  const { name, price, qtd } = data
  const [quantity, setQuantity] = useState<number>(qtd);

  return (
    <Container>
      <Column>
        <Name>{name}</Name>
        <Value>R$ {price.toFixed(2)}</Value>
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
