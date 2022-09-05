import React from "react";
import { useNavigation } from "@react-navigation/native";

import AccordionMenu from "@components/AccordionMenu";
import Header from "@components/Header";

import {
  Container,
  Content
} from "./styles";

import { list2 } from "../../data";

export default function Comanda({ route }: any) {
  const navigation = useNavigation();
  const { id } = route.params;

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