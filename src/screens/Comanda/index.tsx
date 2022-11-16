import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import Header from "@components/Header";

import {
  Container,
  Content
} from "./styles";

import api from "@services/api";
import Orders from "@components/Orders";
import { IOrdersByComanda } from "@interfaces/main";
import Button from "@components/Button";
import Empty from "@components/Empty";
import { Alert } from "react-native";

export default function Comanda({ route }: any) {
  const navigation = useNavigation();
  const { comandaID, pedidos_ativos } = route.params;
  const [pedidos, setPedidos] = useState<IOrdersByComanda[]>([]);

  const loadData = async () => {
    try {
      const response = await api.get(`pedidos/comanda_id/${comandaID}`)
      const { results } = response.data;
      setPedidos(results);
      console.log(results)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    loadData();
    const willFocusSubscription = navigation.addListener('focus', () => {
      loadData();
    });

    return willFocusSubscription;
  }, [])

  return (
    <Container>
      <Header
        title={`Comanda nº ${comandaID}`}
        onPress={navigation.goBack}
      />

      {pedidos.length > 0 ?
        <Content>
          <Orders
            orders={pedidos}
          />
        </Content>
        :
        <Empty
          title={"Nenhum pedido criado"}
          subtitle={`Crie um pedido novo para a comanda`}
        />
      }

      <Button
        style={{ marginBottom: 0 }}
        title="Criar pedido"
        onPress={() => navigation.navigate("CriarPedido", { comandaID: comandaID })}
      />
      <Button
        style={{ marginBottom: 0 }}
        title="Finalizar comanda"
        reverse={true}
        onPress={() => {
          if (pedidos.length === 0)
            Alert.alert("Atenção", "Não há nenhum pedido vinculado a comanda para ser feito o pagamento.")
          else if (pedidos_ativos > 0)
            Alert.alert("Atenção", `Há ${pedidos_ativos} pedido${pedidos_ativos > 1 ? 's' : ''} vinculado${pedidos_ativos > 1 ? 's' : ''} a comanda aguardando serem entregues.`)
          else {
            var total = pedidos.reduce((prev: number, obj) => prev + (obj.quantidade * obj.valor_tabela), 0)
            navigation.navigate("Pagamento", { comandaID: comandaID, total: total })
          }
        }}
      />
    </Container>
  );
}