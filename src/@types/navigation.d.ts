export type ComandaNavigationProps = {
  id?: number;
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      SignIn: undefined;
      SignUp: undefined;
      Comandas: undefined;
      Comanda: ComandaNavigationProps;
    }
  }
}

