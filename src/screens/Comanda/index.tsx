import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import AccordionMenu from "@components/AccordionMenu";
import Header from "@components/Header";

import {
  Container,
  Content
} from "./styles";

import api from "@services/api";
import { ICategories } from "@interfaces/main";
import ActionButton from "@components/ActionButton";

export default function Comanda({ route }: any) {
  const navigation = useNavigation();
  const { id } = route.params;

  const [categories, setCategories] = useState<ICategories[]>([]);

  const loadData = async () => {
    const response = await api.get(`categorias`)
    const { results } = response.data;
    setCategories(results);    
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
        {categories.map((item, index) => (
          <AccordionMenu
            title={item.nome}
            cID={item.id}
            key={index} 
          />
        ))}
      </Content>
      <ActionButton 
        name="save"
        size={26}
        onPress={() => {return null}}
      />
    </Container>
  );
}