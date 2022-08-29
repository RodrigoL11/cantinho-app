import React from "react";
import { Text } from "react-native";

import { useNavigation } from "@react-navigation/native";

import Button from "../../components/Button";

import { list2 } from "../../data";

import { Container, Comanda } from "./styles";

export default function Home() {
  const navigation = useNavigation();
  
  return (
    <Container>
      <Text>Comandas</Text>

      {list2.map((item, index) => (
        <Comanda
        key={index}
        onPress={() => {navigation.navigate("Comanda", {
          id: item.id
        })}}>
          <Text>#{item.id}</Text>
          <Text>{item.name}</Text>
          <Text>Nº Mesa: {item.mesa}</Text>
          <Text>{item.total}</Text>
        </Comanda>
      ))}

      <Button onPress={() => navigation.navigate("Home")} title="Go to Home" />
    </Container>
  );
}