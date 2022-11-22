import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import Header from '@components/Header';

import {
  Card,
  Container,
  Content,
  Label,
  ProfitTotal,
  Row,
  StrongLabel,
  SubTitle,
  Title
} from './styles'
import DateFilter from '@components/Filters/Date';
import api from '@services/api';
import { formatDateFrom, formatDateTo } from '../../utils/main';
import Empty from '@components/Empty';

export default function Relatorios() {
  const navigation = useNavigation();
  const [dateFrom, setDateFrom] = useState(new Date());
  const [dateTo, setDateTo] = useState(new Date());
  const [data, setData] = useState<any[]>([]);

  const loadData = async () => {
    try {
      const response = await api.get(`lucro/dateFrom=${formatDateFrom(dateFrom)}&dateTo=${formatDateTo(dateTo)}`);
      const { results } = response.data;
      setData(results);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadData();
  }, [dateFrom, dateTo])

  const lucroTotal = data.reduce((prev, obj) => prev + (obj.lucro * obj.quantidade), 0);

  const Item = (item: any, index: number) => {
    return (
      <Card key={index} style={item === data[0] ? { borderWidth: 0 } : null}>
        <StrongLabel>{item.nome}</StrongLabel>
        <Row>
          <Label>Quantidade vendida: </Label>
          <StrongLabel>{item.quantidade}</StrongLabel>
        </Row>
        <Row>
          <Label>Receita total: </Label>
          <StrongLabel>R${(item.receita * item.quantidade).toFixed(2)}</StrongLabel>
        </Row>
        <Row>
          <Label>Lucro total: </Label>
          <StrongLabel>R${(item.lucro * item.quantidade).toFixed(2)}</StrongLabel>
        </Row>
      </Card>
    )
  }

  return (
    <Container>
      <Header title="Relátorios" onPress={() => navigation.goBack()} />
      <Title>Lucro total</Title>
      <ProfitTotal>R$ {lucroTotal.toFixed(2)}</ProfitTotal>
      <Row style={{ marginBottom: 10 }}>
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
      {data.length > 0 ?
        <>
          <SubTitle>Lucro por produto em ordem decrescente</SubTitle>
          <Content>
            {data.map(Item)}
          </Content>
        </>
        :
        <Empty
          title="Sem vendas registradas"
          subtitle='Realize algumas vendas para poder ver o relátorio'
        />
      }
    </Container>
  )
}