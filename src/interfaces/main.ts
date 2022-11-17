export interface IUser {
  id?: number
  nome: string
  senha: string
  login: string
  email: string
  token: string
  cpf: string
  status: string
}

export interface IPhone {
  id?: number
  DDI: string
  DDD: string
  num_telefone: string
  uID?: number
  status: string
}

export interface IAddress {
  id?: number
  logradouro: string
  num_endereco: string
  bairro: string
  cep: string
  cidade: string
  estado: string
  uID?: number
  status: string
}

export interface IComandas {
  id: number
  data_hora_abertura: Date
  data_hora_finalizada?: Date
  nome_cliente: string
  num_mesa: string
  status: string
  uID: number
  pedidos?: number
  pedidos_ativos?: number
}

export interface ICategories {
  id: number
  nome: string
  status: string
  tipo: string
  NumberOfProducts?: number
}

export interface IProducts {
  id: number
  nome: string
  valor_tabela: number
  status: string
  cID: number
  quantidade: number
  categoria_nome?: string
  preco_minimo?: number
}

export interface ICartItems {
  product: IProducts
  quantity: number
}

export interface IOrders {
  id: number
  created_at: Date
  finalized_at?: Date
  status: string
  uID: number //usuário
  cID: number //comanda
}

export interface IOrdersByComanda {
  status: string
  quantidade: number
  valor_tabela: number
  produto_nome: string
  categoria_nome: string
}

export interface IOrdersItens {
  id: number
  quantidade: number
  valor_tabela: number
  pedidoID: number
  produtoID: number
  status: string
}

export interface IFormatedOrder extends IOrders {
  nome_cliente: string
  num_mesa: string
  items: {    
    quantidade: number
    valor_tabela: number
    status: string
    categoria_nome: string
    produto_nome: string
  }[]
}