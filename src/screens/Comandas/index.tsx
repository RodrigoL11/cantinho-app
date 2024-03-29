import React, { useEffect, useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView, Modal, Platform, TouchableWithoutFeedback, View } from "react-native";
import { Feather } from '@expo/vector-icons'
import { useNavigation } from "@react-navigation/native";
import { FlatGrid } from 'react-native-super-grid';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import ActionButton from "@components/ActionButton";
import Header from "@components/Header";
import CreateComanda from "@components/FormsComanda/CreateComanda";
import EditComanda from "@components/FormsComanda/EditComanda";
import SearchInput from '@components/SearchInput';
import { IComandas } from "@interfaces/main";
import api from "@services/api";

import {
  Container,
  Card,
  Row,
  Nome,
  Mesa,
  DateLabel,
  Aviso,
  AvisoLabel,
  OptionContainer,
  OptionLabel,
  BackToTopButton
} from "./styles";
import Empty from "@components/Empty";
import Status from "@components/Filters/Status";
import DateFilter from "@components/Filters/Date";
import { formatDate, formatDateFrom, formatDateTo } from "../../utils/main";
import { Loading } from "@components/Loading";
import { themes, useTheme } from "@hooks/theme";

export default function Home() {
  const navigation = useNavigation();
  const { theme } = useTheme();

  const perPage = 20;
  const [page, setPage] = useState(0);

  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
  const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));

  const [search, setSearch] = useState<string>("");
  const [numeroMesa, setNumeroMesa] = useState("");
  const [showForms, setShowForms] = useState(false)
  const [comandas, setComandas] = useState<IComandas[]>([]);
  const [comandaID, setComandaID] = useState<number>();
  const [status, setStatus] = useState("A");
  const [dateFrom, setDateFrom] = useState(yesterday);
  const [dateTo, setDateTo] = useState(tomorrow);
  const [handleInputQuery, setHandleInputQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFullLoaded, setIsFullLoaded] = useState(false);


  const loadData = async (reload?: boolean) => {
    if (loading || (isFullLoaded && !reload)) return;

    let _page = reload ? 0 : page;

    setLoading(true);

    try {
      const _search = search.trim().length > 2 ? search : "";
      const _dateFrom = formatDateFrom(dateFrom || yesterday);
      const _dateTo = formatDateTo(dateTo || tomorrow);

      const response = await api.get(`comandas/q=${_search}&num_mesa=${numeroMesa}&limit=${perPage}&offset=${perPage * _page}&status=${status || "A"}&dateFrom=${_dateFrom}&dateTo=${_dateTo}`);
      const { results } = response.data;
      if (results.length < perPage) setIsFullLoaded(true);
      reload ? setComandas(results) : setComandas([...comandas, ...results]);

      _page++;
      setPage(_page);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  useEffect(() => {
    setIsFullLoaded(false);
    loadData(true);
    const willFocusSubscription = navigation.addListener('focus', () => {
      loadData(true);
    });

    return willFocusSubscription;
  }, [status, dateFrom, dateTo, handleInputQuery, numeroMesa]);

  const closeForms = () => {
    setShowForms(false);
    setComandaID(undefined);
  }

  const deleteComanda = (id: number) => {
    const delComanda = comandas.find(c => c.id == id)

    if (!delComanda) return null;

    Alert.alert(
      "Cancelar comanda",
      `${delComanda.pedidos ? `Há ${delComanda.pedidos} pedido${delComanda.pedidos > 1 ? 's' : ''} vinculado${delComanda.pedidos > 1 ? 's' : ''} a esta comanda! ` : ''}Tem certeza que deseja cancelar a comanda ${delComanda.nome_cliente}?`,
      [
        {
          text: "Sim",
          onPress: async () => {
            await api.delete(`comandas/${delComanda.id}`)
              .then(response => {
                if(status !== "T")
                  setComandas(comandas.filter(comanda => comanda !== delComanda))
                else {
                  setComandas(comandas => {
                    return comandas.map(comanda => {
                      if(comanda.id === delComanda.id) {
                        return { ...comanda, status: "I"}
                      } else {
                        return comanda;
                      }
                    })
                  })
                }
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

  const Comanda = (comanda: IComandas, index: number) => {
    return (
      <Card
        activeOpacity={0.7}
        key={index}
        onPress={() => { navigation.navigate("Comanda", { comandaID: comanda.id, disabled: comanda.status !== "A" }) }}
        hasPedidos={(comanda.pedidos_ativos || 0) > 0}
        status={comanda.status}
        disabled={comanda.status === "I"}        
      >
        <Row>
          <DateLabel style={{ top: -2 }}>{formatDate(new Date(comanda.data_hora_abertura))}</DateLabel>
          {comanda.status !== "A" ? null :
            <Menu>
              <MenuTrigger style={{ right: -4 }}>
                <Feather name="more-vertical" color={themes[theme].colors.text_color[700]} size={20} />
              </MenuTrigger>
              <MenuOptions optionsContainerStyle={{ padding: 4, width: 'auto', marginTop: -2, backgroundColor: themes[theme].colors.bgCard }}>
                <MenuOption onSelect={() => {
                  setComandaID(comanda.id);
                  setShowForms(true);
                }}>
                  <OptionContainer>
                    <Feather name="edit-2" size={13} color={themes[theme].colors.text_color[700]} />
                    <OptionLabel>Editar</OptionLabel>
                  </OptionContainer>
                </MenuOption>
                <MenuOption onSelect={() => deleteComanda(comanda.id)}>
                  <OptionContainer>
                    <Feather name="trash-2" size={13} color={themes[theme].colors.text_color[700]} />
                    <OptionLabel>Cancelar</OptionLabel>
                  </OptionContainer>
                </MenuOption>
              </MenuOptions>
            </Menu>
          }
        </Row>
        <Nome numberOfLines={2}>{comanda.nome_cliente}</Nome>
        <Mesa>Mesa: {comanda.num_mesa}</Mesa>
        {comanda.pedidos_ativos ?
          <Aviso>
            <AvisoLabel>{comanda.pedidos_ativos}</AvisoLabel>
          </Aviso>
          : null}
      </Card>
    )
  }

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Header
        title={`Comandas (${comandas.length})`}
        onPress={navigation.goBack}
      />
      <Row>
        <View style={{ width: '80%' }}>
          <SearchInput
            value={search}
            onChangeText={text => {
              setSearch(text);
              if (text.length > 2) setHandleInputQuery(text);
              if (text.length <= 2 && handleInputQuery) setHandleInputQuery("");
            }}
            placeholder="Busque uma comanda..."
          />
        </View>
        <View style={{ width: '18%' }}>
          <SearchInput
            hideIcon={true}
            value={numeroMesa}
            onChangeText={text => {
              setNumeroMesa(text);
            }}
            placeholder="Mesa"
            keyboardType='numeric'
            style={{ paddingLeft: 16, paddingRight: 16 }}
            maxLength={5}
          />
        </View>
      </Row>
      <Row style={{ paddingLeft: 15, paddingRight: 15, paddingBottom: 12 }}>
        <Status
          status={status}
          setStatus={setStatus}
          options={
            {
              'A': 'Ativo',
              'F': 'Finalizado',
              'I': 'Cancelado',
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
      </Row>
      {comandas.length > 0 ?
        <FlatGrid
          itemDimension={100}
          data={comandas}
          keyboardShouldPersistTaps="always"
          style={{ flex: 1 }}
          spacing={10}
          renderItem={({ item, index }) => Comanda(item, index)}
          onEndReached={() => loadData()}
          onEndReachedThreshold={0.1}
          ListFooterComponent={<Loading load={loading} />}
          
        />
        :
        <Empty
          title={`Não há nenhuma comanda\npara os filtros aplicados`}
          subtitle={"Altere os filtros ou crie uma nova"}
        />
      }
      <ActionButton 
        name="add"
        size={40}
        onPress={() => setShowForms(true)}
      />

      <Modal
        transparent={true}
        visible={showForms}
        onRequestClose={closeForms}
        statusBarTranslucent={true}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            {comandaID ? (
              <EditComanda comandaID={comandaID} comandas={comandas} setComandas={setComandas} toogleVisibility={closeForms} />
            ) : (
              <CreateComanda setComandas={setComandas} toogleVisibility={closeForms} />
            )}
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    </Container>
  );
}