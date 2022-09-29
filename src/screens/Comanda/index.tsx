import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import AccordionMenu from "@components/AccordionMenu";
import Header from "@components/Header";

import {
  Container,
  Content
} from "./styles";

import { list2 } from "../../data";
import api from "@services/api";

export default function Comanda({ route }: any) {
  const navigation = useNavigation();
  const { id } = route.params;

  const loadData = async () => {
    const response = await api.get(`pedidos/${id}`)
    const { results } = response.data;

    console.log(results)
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <Container>
      <Header
        title={`Comanda nº ${id+1}`}
        onPress={navigation.goBack}
      />
      <Content>
        {list2[id].data.map((item, index) => (
          <AccordionMenu
            title={item.name}
            items={item.items}
            key={index} 
          />
        ))}
      </Content>
    </Container>
  );
}