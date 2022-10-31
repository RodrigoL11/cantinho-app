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
  Empty,
  TotalContainer,
} from './styles'

interface Props {
  orders: any[]
}

export default function Orders({ orders }: Props) {
  let total = 0;

  return (
    <Container>
      <Title>Produdos pedidos</Title>

      {orders.length > 0 ? orders.map((order, index) => {
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
            <Value>RS {order.valor_tabela.toFixed(2)}</Value>
          </OrderContainer>
        )
      }) : <Empty>Não há nenhum pedido</Empty>}
      <TotalContainer>
        <Total>Total</Total>
        <Total>R$ {total.toFixed(2)}</Total>
      </TotalContainer>
    </Container>
  )
}