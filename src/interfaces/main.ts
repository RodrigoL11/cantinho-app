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
  data_hora_abertura: string
  data_hora_finalizada?: string
  pedidos_abertos: number
  nome_cliente: string
  num_mesa: string
  status: string
  uID?: number
  NumberOfOrders?: number
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
  preco_custo: number
  quantidade_estoque: number
  valor_tabela: number
  status: string
  cID: number
  categoria_nome?: string
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

export interface IOrdersItens {
  id: number
  quantidade: number
  preco_custo: number
  valor_tabela: number
  pedidoID: number
  produtoID: number
  status: string
}

export interface IFormatedOrder extends IOrders {
  nome_cliente: string
  num_mesa: string
  items: {
    id: number
    status: string
    categoria_nome: string
    produto_nome: string
    quantidade: number
    valor_tabela: number
  }[]
}