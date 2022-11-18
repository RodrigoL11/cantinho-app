export type UserProps = {
  id: number
}

type ComandaProps = {
  comandaID: number
  disabled: boolean  
}

type CriarPedidoProps = {
  comandaID: number
}

type PagamentoProps = {
  comandaID: number
  total: number
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined
      SignIn: undefined
      SignUp: undefined
      Comandas: undefined
      Comanda: ComandaProps
      Users: undefined
      User: UserProps
      Produtos: undefined
      Pedidos: undefined
      Relatorios: undefined
      Estoque: undefined
      CriarPedido: CriarPedidoProps
      Pagamento: PagamentoProps
    }
  }
}

