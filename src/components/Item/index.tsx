import React, { useState } from "react";

import {
  Name,
  Container,
  Value,
  QuantityContainer,
  RemoveButton,
  AddButton,
  Quantity,
} from "./styles";

import { ListItem } from '../AccordionMenu'

interface DataProps {
  data: ListItem
}

export default function Item({ data }: DataProps) {
  const [listData, setListData] = useState(data);

  const {name, price} = listData
  let { qtd } = listData

  function handleUpdateCount(aux: number){
    setListData(state => ({
      ...state,
      qtd: qtd + aux,
    }));

    data.qtd += aux    
  }

  return (
    <Container>
      <Name>{name}</Name>
      <Value>R$ {price.toFixed(2)}</Value>
      <QuantityContainer removeClippedSubviews={true}>
        <RemoveButton
          name="remove-circle"
          color="red"
          size={24}
          onPress={() => qtd > 0 ? handleUpdateCount(-1) : 0}
        />
        <Quantity
          contextMenuHidden={true}
          value={qtd.toString()}
          keyboardType="numeric"
        />
        <AddButton
          color="green"
          name="add-circle"
          size={24}
          onPress={() => handleUpdateCount(1)}
        />
      </QuantityContainer>
    </Container>
  );
}
