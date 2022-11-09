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
  Items,
  ItemsTitle,
  ItemLabel,
  CategoryLabel,
  Item,
  Button,
  ButtonLabel,
  Buttons,
  DateContainer,
  HighLabel,
  SpacedRow,
  ListLoading,
  BackToTopButton
} from './styles'
import api from '@services/api';
import { IFormatedOrder, IOrders } from '@interfaces/main';
import { ActivityIndicator, Alert, Keyboard, NativeScrollEvent, ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import SearchInput from '@components/SearchInput';

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
  'E': '#388E3C', //entregue
  'C': '#D32F2F', //cancelado
  'A': '#FFC107'  //ativo
}

const textStatus = {
  'E': 'Entregue',
  'C': 'Cancelado',
  'A': 'Ativo'
}

export default function Pedidos() {
  const navigation = useNavigation();
  const perPage = 10;

  const [pedidos, setPedidos] = useState<IFormatedOrder[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [clicked, setClicked] = useState<number | null>(null);
  const [dataSourceCords, setDataSourceCords] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [ref, setRef] = useState<ScrollView>();
  const [showBackToTop, setShowBackToTop] = useState(false);

  const toogle = (index: number) => {
    if (clicked == index) {
      return setClicked(null)
    }

    Keyboard.dismiss();
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

  const handleScrollBackToTop = () => {
    if (!ref) return null;

    ref.scrollTo({
      x: 0,
      y: 0,
      animated: true
    })
  }

  const handleSubmit = async (id: number, status: string) => {
    Alert.alert(
      "Atenção",
      `Tem certeza que deseja ${status === 'C' ? 'cancelar' : 'definir como entregue'} o pedido?`,
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
        <Card isFirst={filteredSearch[0].id === pedido.id}>
          <SpacedRow style={{ marginBottom: 8 }}>
            <DateContainer>
              <Feather style={{ marginRight: 4 }} name="clock" size={13} />
              <HighLabel>{formatDate(new Date(pedido.created_at))}</HighLabel>
            </DateContainer>
            <HighLabel>{sumTotal(pedido.items)}</HighLabel>
          </SpacedRow>
          <SpacedRow>
            <View style={{ flex: 1 }}>
              <Row>
                <HighLabel>Nome: </HighLabel>
                <Label numberOfLines={1}>{pedido.nome_cliente}</Label>
              </Row>
              <Row>
                <HighLabel>Mesa: </HighLabel>
                <Label>{pedido.num_mesa}</Label>
              </Row>
            </View>
            <Status bgColor={bgStatus[pedido.status as keyof typeof bgStatus]}>
              <StatusLabel>{textStatus[pedido.status as keyof typeof textStatus]}</StatusLabel>
            </Status>
          </SpacedRow>
          {clicked &&
            <Items>
              <ItemsTitle>Itens do pedido</ItemsTitle>
              {pedido.items.map((item, index) =>
                <Item key={index}>
                  <SpacedRow>
                    <Row>
                      <ItemLabel>{item.quantidade}× {item.produto_nome}</ItemLabel>
                      <CategoryLabel>({item.categoria_nome})</CategoryLabel>
                    </Row>
                    <ItemLabel>R$ {(item.quantidade * item.valor_tabela).toFixed(2)}</ItemLabel>
                  </SpacedRow>
                </Item>
              )}
              {pedido.status === 'A' ?
                <Buttons>
                  <Button bgColor="#D32F2F" onPress={() => handleSubmit(pedido.id, 'C')}>
                    <ButtonLabel>Cancelar</ButtonLabel>
                  </Button>
                  <Button bgColor="#388E3C" onPress={() => handleSubmit(pedido.id, 'E')}>
                    <ButtonLabel>Finalizar</ButtonLabel>
                  </Button>
                </Buttons> :
                pedido.finalized_at &&
                <View>
                  <ItemsTitle>{textStatus[pedido.status as keyof typeof textStatus]} às</ItemsTitle>
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

  const isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }: NativeScrollEvent) => {
    const paddingToBottom = 20;
    return layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
  };

  const formatString = (text: string) => { return text.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase() }

  const filteredSearch = search.length > 0
    ? pedidos.filter(item => formatString(item.nome_cliente).includes(formatString(search)) || item.num_mesa === search.trim())
    : pedidos;

  const loadData = async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const response = await api.get(`pedidos/limit=${perPage}&offset=${perPage * page}`)
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

      setPage(page + 1);
    } catch (err) {
      console.error(err)
    }

    setIsLoading(false);
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header title="Pedidos" onPress={() => navigation.goBack()} />
        <SearchInput
          value={search}
          onChangeText={text => {
            setClicked(null);
            setSearch(text);
          }}
          placeholder="Busque um pedido..."
          filterIcon={true}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          ref={(ref: ScrollView) => setRef(ref)}
          keyboardShouldPersistTaps="always"
          onScroll={({ nativeEvent }) => {
            nativeEvent.contentOffset.y > 100 ? setShowBackToTop(true) : setShowBackToTop(false);

            if (isCloseToBottom(nativeEvent))
              loadData();            
          }}
        >
          <Content>
            {filteredSearch.map((pedido, index) => Order(pedido, index, clicked === index))}
          </Content>
          {isLoading && !clicked ?
            <ListLoading>
              <ActivityIndicator size={25} />
            </ListLoading>
            : null}
        </ScrollView>
        {showBackToTop && !clicked ?
          <BackToTopButton activeOpacity={1} onPress={handleScrollBackToTop}>
            <Feather name="chevron-up" size={24} color="#f4f5f6" />
          </BackToTopButton>
          : null}
      </Container>
    </TouchableWithoutFeedback>
  )
}