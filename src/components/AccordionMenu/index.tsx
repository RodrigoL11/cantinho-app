import React, { useState } from "react";
import { TouchableWithoutFeedback } from "react-native";

import { FontAwesome  } from '@expo/vector-icons';

import { 
  Container, 
  TitleContainer, 
  Title, 
  Menu 
} from "./styles";

import Item from "../Item";

export interface ListItem {
  name: string;
  price: number;
  qtd: number;
}

interface ListItemProps {
  items: ListItem[];
  title: string;
  total: number;
}

export default function AccordionMenu({ title, total, items }: ListItemProps) {
  const [open, setOpen] = useState(false);

  items.map((item) => {
    const { price, qtd } = item
    total += price * qtd
  })
  
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
        <Container>
          <TitleContainer>
            <Title>{title}</Title>
            <Title>R${total.toFixed(2)}</Title>
            <FontAwesome name={open ? "caret-up" : "caret-down"} size={24} color={'#fff'}/>
          </TitleContainer>
          {open && (
            <Menu>
              {items.map((item, index) => (
                <Item data={item} key={index} />
              ))}
            </Menu>
          )}
        </Container>
      </TouchableWithoutFeedback>
    </>
  );
}