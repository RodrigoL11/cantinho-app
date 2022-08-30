import React from "react";
import { useNavigation } from "@react-navigation/native";

import AccordionMenu from "../../components/AccordionMenu";

import { 
  Container,
} from "./styles";

import { list2 } from "../../data";
import Header from "../../components/Header";

export default function Comanda({ route }: any) {
  const navigation = useNavigation();
  const { id } = route.params;

  return (
    <>
      <Header 
        title={`Comanda nº ${id}`}
        onPress={navigation.goBack}
      />
      <Container>
        {list2[id].data.map((item, index) => (
          <AccordionMenu 
            title={item.name}
            total={item.total} 
            items={item.items} 
            key={index} />
        ))}
      </Container>
    </>
  );
}