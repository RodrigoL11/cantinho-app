export type ComandaNavigationProps = {
  id?: number;
}

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Home: undefined;
      Comandas: undefined;
      Comanda: ComandaNavigationProps;
    }
  }
}

