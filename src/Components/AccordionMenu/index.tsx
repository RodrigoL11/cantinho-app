<<<<<<< HEAD
import React, { useState, useRef } from "react"
import { TouchableWithoutFeedback } from "react-native"

import {
    Container,
    TitleContainer,
    Title,
    Icon,
    Menu,
    Name,
    Item,
    Value,
    QuantityContainer,
    RemoveButton,
    AddButton,
    Quantity
} from './style'

interface ListItem {
    name: string;
    price: string;
    qtd: number;
}[];

interface ListItemProps {
    items: ListItem[];
    title: string;
}

export default function AccordionMenu({ title, items }: ListItemProps) {
    const [open, setOpen] = useState(false)

    //fazer funcionar
    const [listData, setListData] = useState(items)

    return (
        <>
            <TouchableWithoutFeedback onPress={() => setOpen(prev => !prev)}>
                <Container>
                    <TitleContainer>
                        <Title>{title}</Title>
                        <Icon name={open ? "caret-up" : "caret-down"} size={24} />
                    </TitleContainer>
                    {open && (<Menu>
                        {items.map((item, index) =>
                        (<Item key={index}>
                            <Name>{item.name}</Name>
                            <Value>{item.price}</Value>
                            <QuantityContainer removeClippedSubviews={true}>
                                <RemoveButton
                                    name="remove-circle"
                                    color="red"
                                    size={24}
                                    onPress={() => item.qtd > 0 ? item.qtd-- : 0}
                                />
                                <Quantity
                                    contextMenuHidden={true}
                                    value={item.qtd.toString()}
                                    //onChange={}
                                    keyboardType="numeric"
                                />
                                <AddButton
                                    color="green"
                                    name="add-circle"
                                    size={24}
                                    onPress={() => item.qtd++}
                                />
                            </QuantityContainer>
                        </Item>))}
                    </Menu>
                    )}
                </Container>
            </TouchableWithoutFeedback>
        </>
    )
}
=======
import React, { useState } from "react";
import { TouchableWithoutFeedback } from "react-native";

import { Container, TitleContainer, Title, Icon, Menu } from "./style";

import Item from "../Item";

export interface ListItem {
  name: string;
  price: string;
  qtd: number;
}

interface ListItemProps {
  items: ListItem[];
  title: string;
}

export default function AccordionMenu({ title, items }: ListItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setOpen((prev) => !prev)}>
        <Container>
          <TitleContainer>
            <Title>{title}</Title>
            <Icon name={open ? "caret-up" : "caret-down"} size={24} />
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
>>>>>>> 509d21e (Botões para add/remover funcionando)
