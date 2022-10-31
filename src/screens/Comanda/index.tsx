import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import Header from "@components/Header";

import {
  Container,
  Content
} from "./styles";

import api from "@services/api";
import ActionButton from "@components/ActionButton";
import Orders from "@components/Orders";
import { IFormatedOrder } from "@interfaces/main";

export default function Comanda({ route }: any) {
  const navigation = useNavigation();
  const { comandaID } = route.params;
  
  const [pedidos, setPedidos] = useState<IFormatedOrder[]>([]);

  const loadData = async () => {    
    const response = await api.get(`pedidos/comanda_id/${comandaID}`)
    const { results } = response.data;
    setPedidos(results);
  }

  useEffect(() => {
    navigation.addListener(
      'focus',
      payload => {
        loadData();
      }
    );
  }, [])

  return (
    <Container>
      <Header
        title={`Comanda nº ${comandaID}`}
        onPress={navigation.goBack}
      />

      <Content>
        <Orders 
          orders={pedidos}          
        />        
      </Content>
      <ActionButton 
        name="add"
        size={40}
        onPress={() => navigation.navigate("CriarPedido", { comandaID: comandaID })}
      />
    </Container>
  );
}