import React from "react";
import { useNavigation } from "@react-navigation/native";

import BackButton from "../../components/BackButton";
import AccordionMenu from "../../components/AccordionMenu";

import { 
  Container,
  TotalContainer,
  TotalText,
  TotalValue
} from "./styles";

import { list2 } from "../../data";

export default function Comanda({ route }: any) {
  const navigation = useNavigation();
  const { id } = route.params;

  // list2[id].data.map((item) => {
  //   console.log(item.name,item.total)
  //   list2[id].total += item.total 
  // })

  return (
    <Container>
      <TotalContainer>
        {/* <TotalText>Total: </TotalText>
        <TotalValue>R$ {list2[id].total?.toFixed(2)}</TotalValue> */}
      </TotalContainer>

      {list2[id].data.map((item, index) => (
        <AccordionMenu 
          title={item.name}
          total={item.total} 
          items={item.items} 
          key={index} />
      ))}
      <BackButton
        onPress={() => navigation.navigate("Comandas")}
        title="Go to comandas"
      />
    </Container>
  );
}