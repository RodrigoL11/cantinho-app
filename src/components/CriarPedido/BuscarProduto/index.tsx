import React, { useState } from 'react';
import Header from '@components/Header';
import { IProducts } from '@interfaces/main';

import {
  Container,
  ProductContainer,
  ProductName,
  ProductPrice,
  Content,
  Empty,
  EmptyTitle,
  EmptySubTitle,
  Row,
  Stock,
  Separator
} from './styles'
import SearchInput from '@components/SearchInput';
import { TouchableWithoutFeedback } from 'react-native';

interface Props {
  products: IProducts[],
  toogleModal: (type?: string, product?: IProducts) => void
}

export default function BuscarProduto({ toogleModal, products }: Props) {
  const [search, setSearch] = useState<string>("");

  const filteredProducts = search.length > 2
    ? products.filter(item => item.nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(search.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()))
    : [];

  return (
    <Container>
      <Header
        title="Buscar produto"
        onPress={toogleModal}
      />
      <SearchInput
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar..."
      />

      {filteredProducts.length > 0 ?
        <Content keyboardShouldPersistTaps="always">
          {filteredProducts.map((product, index) =>
            <TouchableWithoutFeedback key={index} onPress={() => toogleModal("search-add", product)}>
              <ProductContainer>
                <ProductName>{product.nome}</ProductName>
                <ProductPrice>R$ {product.valor_tabela.toFixed(2)}</ProductPrice>
                {filteredProducts[filteredProducts.length - 1] !== product && <Separator />}
              </ProductContainer>
            </TouchableWithoutFeedback>
          )}
        </Content>
        :
        <Empty>
          <EmptyTitle>
            {search.length < 3 ? "Nenhuma busca até o\nmomento" : "Produto não\nencontrado"}
          </EmptyTitle>
          <EmptySubTitle>
            {search.length < 3 ? "Faça sua primeira busca aqui" : `Não encontramos nenhum resultado na\nbusca por "${search}"`}
          </EmptySubTitle>
        </Empty>}
    </Container>
  )
}