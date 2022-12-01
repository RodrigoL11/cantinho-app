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
import StatusFilter from '@components/Filters/Status';
import DateFilter from '@components/Filters/Date';
import Empty from '@components/Empty';
import { formatCurrency, formatDateFrom, formatDateTime, formatDateTo } from '../../utils/main';
import { themes, useTheme } from '@hooks/theme';

interface Pedidos extends IOrders {
  items: any[]
}

const sumTotal = (items: any[]) => {
  let total = 0;

  items.forEach(item => {
    total += item.quantidade * item.valor_tabela
  })

  return formatCurrency(total);
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
  const { theme } = useTheme();
  const iconColor = themes[theme].colors.text_color[700];
  const selectedColor = themes[theme].colors.bgCard_selected;

  const perPage = 10;

  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

  const [pedidos, setPedidos] = useState<IFormatedOrder[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [clicked, setClicked] = useState<number | null>(null);
  const [dataSourceCords, setDataSourceCords] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [numberMesa, setNumberMesa] = useState("");
  const [ref, setRef] = useState<ScrollView>();
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isFullLoaded, setIsFullLoaded] = useState(false);
  //filters
  const [status, setStatus] = useState("A");
  const [dateFrom, setDateFrom] = useState(yesterday);
  const [dateTo, setDateTo] = useState(tomorrow);
  //handle on search input to query
  const [handleInputQuery, setHandleInputQuery] = useState("");

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
        <Card style={clicked ? { backgroundColor: selectedColor } : null} isFirst={pedidos[0].id === pedido.id}>
          <SpacedRow style={{ marginBottom: 8 }}>
            <DateContainer>
              <Feather style={{ marginRight: 4, top: -1 }} name="clock" size={13} color={iconColor} />
              <HighLabel>{formatDateTime(new Date(pedido.created_at))}</HighLabel>
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
                    <ItemLabel>{formatCurrency(item.quantidade * item.valor_tabela)}</ItemLabel>
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
                    <Feather style={{ marginRight: 4 }} name="clock" size={12} color={iconColor} />
                    <Label>{formatDateTime(new Date(pedido.finalized_at))}</Label>
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

  const loadData = async (reload?: boolean) => {
    if (isLoading || (isFullLoaded && !reload)) return;

    let _page = reload ? 0 : page;

    setIsLoading(true);

    try {
      const _search = search.trim().length > 2 ? search : "";
      const _dateFrom = formatDateFrom(dateFrom || yesterday);
      const _dateTo = formatDateTo(dateTo || tomorrow);
      const response = await api.get(`pedidos/q=${_search}&num_mesa=${numberMesa}&limit=${perPage}&offset=${perPage * _page}&status=${status || "A"}&dateFrom=${_dateFrom}&dateTo=${_dateTo}`)
      const { results } = response.data

      if (results.length < perPage) setIsFullLoaded(true);

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

      _page++;
      setPage(_page);
    } catch (err) {
      console.error(err)
    }

    setIsLoading(false);
  }

  useEffect(() => {
      setIsFullLoaded(false);
      setPedidos([]);
      loadData(true);
      setClicked(null);    
  }, [status, dateFrom, dateTo, handleInputQuery, numberMesa])  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header title="Pedidos" onPress={() => navigation.goBack()} />
        <SpacedRow>
          <View style={{ width: '80%' }}>
            <SearchInput
              value={search}
              onChangeText={text => {
                setClicked(null);
                setSearch(text);
                if (text.length > 2) setHandleInputQuery(text);
                if (text.length <= 2 && handleInputQuery) setHandleInputQuery("");
              }}
              placeholder="Busque um pedido..."
            />
          </View>
          <View style={{ width: '18%' }}>
            <SearchInput
              hideIcon={true}
              value={numberMesa}
              onChangeText={text => {
                setClicked(null);
                setNumberMesa(text);
              }}
              placeholder="Mesa"
              keyboardType='numeric'
              style={{ paddingLeft: 16, paddingRight: 16 }}
              maxLength={5}
            />
          </View>
        </SpacedRow>
        <SpacedRow style={{ paddingLeft: 15, paddingRight: 15, marginBottom: 8 }}>
          <StatusFilter
            status={status}
            setStatus={setStatus}
            options={
              {
                'A': 'Ativo',
                'E': 'Entregue',
                'C': 'Cancelado',
                'T': 'Todos'
              }
            }
          />
          <Row>
            <DateFilter
              date={dateFrom}
              setDate={setDateFrom}
              subTitle="De"
            />
            <DateFilter
              date={dateTo}
              setDate={setDateTo}
              subTitle="Até"
            />
          </Row>
        </SpacedRow>

        {pedidos.length > 0 ?
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
              {pedidos.map((pedido, index) => Order(pedido, index, clicked === index))}
            </Content>
            {isLoading && !clicked ?
              <ListLoading>
                <ActivityIndicator size={25} />
              </ListLoading>
              : null}
          </ScrollView>
          :
          <Empty
            title={search.length === 0
              ? "Não há nenhum pedido\ncadastrado"
              : "Pedido não encontrado"}
            subtitle={search.length === 0
              ? "Crie um pedido primeiro"
              : `Não encontramos nenhum resultado na\nbusca por "${search}"`}
          />
        }

        {showBackToTop && !clicked ?
          <BackToTopButton activeOpacity={1} onPress={handleScrollBackToTop}>
            <Feather name="chevron-up" size={22} color="#f4f5f6" />
          </BackToTopButton>
          : null}
      </Container>
    </TouchableWithoutFeedback>
  )
}