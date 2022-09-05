import React, { useState } from "react";

import { Ionicons  } from '@expo/vector-icons';

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
}

export default function AccordionMenu({ title, items }: ListItemProps) {
  const [open, setOpen] = useState(false);
  
  return (
        <Container>
          <TitleContainer activeOpacity={1} onPress={() => setOpen((prev) => !prev)} style={open == false ? {top: 4} : null}>
            <Title>{title}</Title>
            <Ionicons name={open ? "md-chevron-up-sharp" : "md-chevron-down-sharp"} size={24} color={'#fff'}/>
          </TitleContainer>
          {open && (
            <Menu>
              {items.map((item, index) => (
                <Item data={item} key={index} />
              ))}
            </Menu>
          )}
        </Container>
  );
}