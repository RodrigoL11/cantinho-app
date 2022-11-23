import Empty from '@components/Empty';
import { IOrdersByComanda } from '@interfaces/main';
import { formatCurrency } from '@utils/main';
import React from 'react';

import {
  Column,
  Container,
  OrderContainer,
  Name,
  Value,
  Quantity,
  Title,
  Total,
  Category,
  Row,
  TotalContainer,
} from './styles'

interface Props {
  orders: IOrdersByComanda[]
}

export default function Orders({ orders }: Props) {
  let total = 0;

  return (
    <Container>
      <Title>Produdos pedidos</Title>

      {orders.map((order, index) => {
        total += order.valor_tabela * order.quantidade;

        return (
          <OrderContainer key={index}>
            <Column>
              <Row>
                <Name>{order.produto_nome} </Name>
                <Category>({order.categoria_nome})</Category>
              </Row>
              <Quantity>x{order.quantidade}</Quantity>
            </Column>
            <Value>{formatCurrency(order.valor_tabela)}</Value>
          </OrderContainer>
        )
      })}
      <TotalContainer>
        <Total>Total</Total>
        <Total>{formatCurrency(total)}</Total>
      </TotalContainer>
    </Container>
  )
}
