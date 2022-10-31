import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'

import Header from '@components/Header';

import {
  Container,
  Content,
  Card,
  Label,
  Row,
  Status,
  StatusLabel,
  Title,
  Items,
  ItemsTitle,
  ItemLabel,
  CategoryLabel,
  Item,
  Button,
  ButtonLabel,
  Buttons,
  DateContainer
} from './styles'
import api from '@services/api';
import { IFormatedOrder, IOrders } from '@interfaces/main';
import { Alert, ScrollView, TouchableWithoutFeedback, View } from 'react-native';

interface Pedidos extends IOrders {
  items: any[]
}

const pad = (n: number) => {
  return n < 10 ? '0' + n : n;
}

const formatDate = (date: Date) => {
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}h${pad(date.getMinutes())}`
}

const sumTotal = (items: any[]) => {
  let total = 0;

  items.forEach(item => {
    total += item.quantidade * item.valor_tabela
  })

  return `R$${total.toFixed(2)}`;
}

const bgStatus = {
  'entregue': '#27c24c',
  'cancelado': '#c23927',
  'ativo': '#efaa2a'
}

export default function Pedidos() {
  const navigation = useNavigation();
  const [pedidos, setPedidos] = useState<IFormatedOrder[]>([]);
  const [clicked, setClicked] = useState<number | null>(null);
  const [dataSourceCords, setDataSourceCords] = useState<any[]>([]);
  const [ref, setRef] = useState<ScrollView>();

  const toogle = (index: number) => {
    if (clicked == index) {
      return setClicked(null)
    }

    setClicked(index)
    scrollHandler(index)
  }

  const scrollHandler = (scrollToIndex: number) => {
    if (!ref) return null;

    if (dataSourceCords.length > 0) {
      ref.scrollTo({
        x: 0,
        y: dataSourceCords[scrollToIndex],
        animated: true
      }
      )
    } else {
      console.error('Out of Max Index')
    }
  }

  const handleSubmit = async (id: number, status: string) => {
    Alert.alert(
      "Atenção",
      `Tem certeza que deseja ${status === 'cancelado' ? 'cancelar' : 'definir como entregue'} o pedido?`,
      [
        {
          text: "Sim",
          onPress: async () => {
            await api.put(`pedidos/${id}`, {
              data: {
                status: status
              }
            })
              .then(response => {
                let newArr = [...pedidos];
                let pedido = pedidos.find(p => p.id === id);
                if (!pedido) return;

                newArr[pedidos.indexOf(pedido)].status = status;
                newArr[pedidos.indexOf(pedido)].finalized_at = new Date();
                setPedidos(newArr);
              })
          }
        },
        {
          text: "Cancelar",
          onPress: () => { return null }
        }
      ]
    )
  }

  const Order = (pedido: IFormatedOrder, index: number, clicked: boolean) => {
    return (
      <TouchableWithoutFeedback
        key={index}
        onPress={() => toogle(index)}
        onLayout={(event) => {
          const { layout } = event.nativeEvent;
          dataSourceCords[index] = layout.y;
          setDataSourceCords(dataSourceCords);
        }}>
        <Card>
          <Row style={{ marginBottom: 8 }}>
            <DateContainer>
              <Feather style={{ marginRight: 4 }} name="clock" size={13} />
              <Label>{formatDate(new Date(pedido.created_at))}</Label>
            </DateContainer>
            <Label>{sumTotal(pedido.items)}</Label>
          </Row>
          <Row>
            <Label>Nome: {pedido.nome_cliente} - Mesa: {pedido.num_mesa}</Label>
            <Status bgColor={bgStatus[pedido.status as keyof typeof bgStatus]}>
              <StatusLabel>{pedido.status.charAt(0).toUpperCase() + pedido.status.slice(1)}</StatusLabel>
            </Status>
          </Row>
          {clicked &&
            <Items>
              <ItemsTitle>Itens do pedido</ItemsTitle>
              {pedido.items.map((item, index) =>
                <Item>
                  <Row key={index}>
                    <Row>
                      <ItemLabel>{item.quantidade}× {item.produto_nome}</ItemLabel>
                      <CategoryLabel>({item.categoria_nome})</CategoryLabel>
                    </Row>
                    <ItemLabel>R$ {(item.quantidade * item.valor_tabela).toFixed(2)}</ItemLabel>
                  </Row>
                </Item>
              )}
              {pedido.status === 'ativo' ?
                <Buttons>
                  <Button bgColor="#c23927" onPress={() => handleSubmit(pedido.id, 'cancelado')}>
                    <ButtonLabel>Cancelar</ButtonLabel>
                  </Button>
                  <Button bgColor="#27c24c" onPress={() => handleSubmit(pedido.id, 'entregue')}>
                    <ButtonLabel>Finalizar</ButtonLabel>
                  </Button>
                </Buttons> :
                pedido.finalized_at &&
                <View>
                  <ItemsTitle>{pedido.status.charAt(0).toUpperCase() + pedido.status.slice(1)} às</ItemsTitle>
                  <DateContainer style={{ marginTop: -4 }}>
                    <Feather style={{ marginRight: 4 }} name="clock" size={12} />
                    <Label>{formatDate(new Date(pedido.finalized_at))}</Label>
                  </DateContainer>
                </View>
              }
            </Items>
          }
        </Card>
      </TouchableWithoutFeedback>
    )
  }

  const loadData = async () => {
    if (pedidos.length > 0) return null;
    try {
      const response = await api.get('pedidos')
      const { results } = response.data

      results.forEach(
        async (result: any) => {
          const itemsResponse = await api.get(`pedidos_itens/${result.id}`)
          const itemsResults = itemsResponse.data.results

          setPedidos(arr => [...arr, {
            ...result,
            items: itemsResults
          }])
        }
      )
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <Container>
      <Header title="Pedidos" onPress={() => navigation.goBack()} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={(ref: ScrollView) => setRef(ref)}        
      >
        <Content>
          <Title>Histórico de Pedidos</Title>
          {pedidos.map((pedido, index) => Order(pedido, index, clicked === index))}
        </Content>
      </ScrollView>
    </Container>
  )
}