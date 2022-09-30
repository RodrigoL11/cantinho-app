export interface IUser {
    id?: number,
    nome: string,
    senha: string,
    login: string,
    email: string,
    token: string,
    cpf: string,
}

export interface IPhone {
    id?: number,
    DDI: string,
    DDD: string,
    num_telefone: string,
    uID?: number
}

export interface IAddress {
    id?: number;
    logradouro: string,
    num_endereco: string,
    bairro: string,
    cep: string,
    cidade: string,
    estado: string,
    uID?: number
}

export interface IComandas {
    id: number,
    data_hora_abertura: string,
    data_hora_finalizada?: string,
    pedidos_abertos: number,
    nome_cliente: string,
    num_mesa: string,
    status: string,
    uID?: number,
}

export interface ICategories{
    id: number,
    nome: string,
    status: string,
    tipo: string
}

export interface IProdutos{
    id: number,
    nome: string,
    preco_custo: number,
    quantidade_estoque: number,
    valor_tabela: number,
    status: string,
    cID: number
}