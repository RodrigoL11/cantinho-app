import React, { useState } from "react";

import {
  Name,
  Container,
  Value,
  QuantityContainer,
  RemoveButton,
  AddButton,
  Quantity,
} from "./style";

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

  let counter = 90

  function handlePressIn() {
    console.log('oi')
    
    let intervalId = setInterval(() => {
      counter = counter - 1;
      console.log(counter)
      if(counter === 0) clearInterval(intervalId)
    }, 1000)
  }

  function handlePressOut() {
    console.log('sai')
  }

  return (
    <Container>
      <Name>{name}</Name>
      <Value>{price}</Value>
      <QuantityContainer removeClippedSubviews={true}>
        <RemoveButton
          name="remove-circle"
          color="red"
          size={24}
          onPress={() => qtd > 0 ? handleUpdateCount(-1) : 0}
          // onPressIn={handlePressIn}
          // onPressOut={handlePressOut}
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
