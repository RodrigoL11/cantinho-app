export type UserProps = {
  id: number;
}

export type ComandaProps = {
  id: number;
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      SignIn: undefined;
      SignUp: undefined;
      Comandas: undefined;
      Comanda: ComandaProps;
      Users: undefined;
      User: UserProps;
      Produtos: undefined;
      Pedidos: undefined;
      Relatorios: undefined;
      Estoque: undefined;
    }
  }
}

