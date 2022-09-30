import React, { useEffect, useState } from "react";

import { Ionicons  } from '@expo/vector-icons';

import { 
  Container, 
  TitleContainer, 
  Title, 
  Menu 
} from "./styles";

import Item from "../Item";
import { IProdutos } from "@interfaces/main";
import api from "@services/api";

export interface ListItem {
  name: string;
  price: number;
  qtd: number;
}

interface ListItemProps {
  cID: number;
  title: string;
}

export default function AccordionMenu({ title, cID }: ListItemProps) {
  const [open, setOpen] = useState(false);
  const [produtos, setProdutos] = useState<IProdutos[]>([])

  const loadData = async () => {
    const response = await api.get(`produtos/categoria_id=${cID}`)
    const { results } = response.data
    setProdutos(results)
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
        <Container>
          <TitleContainer activeOpacity={1} onPress={() => setOpen((prev) => !prev)} style={open == false ? {top: 4} : null}>
            <Title>{title}</Title>
            <Ionicons name={open ? "md-chevron-up-sharp" : "md-chevron-down-sharp"} size={24} color={'#fff'}/>
          </TitleContainer>
          {open && (
            <Menu>
              {produtos.map((item, index) => (
                <Item data={item} key={index} />
              ))}
            </Menu>
          )}
        </Container>
  );
}