import React from "react";

import { useNavigation } from "@react-navigation/native";
import { FlatGrid } from 'react-native-super-grid';

import Header from "../../components/Header";
import ActionButton from "../../components/ActionButton";

import { list2 } from "../../data";

import {
  Card,
  Row,
  Nome,
  Mesa,
  Valor,
  Id,
  Aviso,
  AvisoLabel
} from "./styles";

export default function Home() {
  const navigation = useNavigation();
  const amount = list2.length;

  return (
    <>
      <Header
        title={`Comandas (${amount})`}
        onPress={navigation.goBack}
      />
      <FlatGrid
        itemDimension={100}
        data={list2}
        style={{ flex: 1, marginTop: 10, backgroundColor: '#eee' }}
        spacing={10}
        renderItem={({ item, index }) => {
          return (
            <Card
              key={index}
              onPress={() => { navigation.navigate("Comanda", { id: item.id }) }}
              style={item.pedidos > 0 ? { borderColor: 'greenyellow' } : null}
            >
              <Row>
                <Id>#{item.id}</Id>
                <Valor>R$ {item.total.toFixed(2)}</Valor>
              </Row>
              <Nome>{item.name}</Nome>
              <Mesa>Mesa: {item.mesa}</Mesa>
              {item.pedidos > 0 ? (
                <Aviso>
                  <AvisoLabel>{item.pedidos}</AvisoLabel>
                </Aviso>
              ) : null}
            </Card>
          )
        }}
      />
      <ActionButton name="add" size={40} />
    </>
  );
}