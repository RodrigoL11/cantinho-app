import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Feather, MaterialIcons } from '@expo/vector-icons'

import {
  CategoryContainer,
  Container,
  Content,
  ModalContainer,
  Placeholder,
  Title
} from './styles'
import { Modal, TouchableWithoutFeedback } from 'react-native';
import Header from '@components/Header';
import SearchInput from '@components/SearchInput';

interface Props {
  onChange: Dispatch<SetStateAction<any>>,
  items: any[];
  placeholder: string;
  itemSelected?: any;
}

interface CategoryProps {
  title: string,
  isFirst: boolean,
  isSelected: boolean,
  onPress: (event: any) => void,
}

const Category = ({ title, isFirst, isSelected, onPress }: CategoryProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <CategoryContainer isSelected={isSelected} isFirst={isFirst}>
        <Title>{title}</Title>
      </CategoryContainer>
    </TouchableWithoutFeedback>
  )
}

export default function DropDown({ onChange, items, placeholder, itemSelected }: Props) {
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<any>(itemSelected);

  useEffect(() => {
    setSelected(itemSelected)
  }, [itemSelected])

  const filteredItems = search.length > 0
    ? items.filter(item => item.nome.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(search.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase()))
    : items;

  return (
    <TouchableWithoutFeedback onPress={() => setShow(true)}>
      <Container>
        <Placeholder style={placeholder != "Categoria" && {color: "#7a7a80"}}>{placeholder}</Placeholder>
        <Feather name="chevron-down" size={24} color="#abababaa" />

        <Modal
          visible={show}
          onRequestClose={() => setShow(false)}
          statusBarTranslucent={true}
        >
          <ModalContainer>
            <Header title='Categorias' onPress={() => setShow(false)} />
            <SearchInput
              placeholder="Busque categoria..."
              value={search}
              onChangeText={setSearch}
            />
            <Content>
              {filteredItems.map((item, index) => (                
                  <Category
                    key={index}
                    title={item.nome as string}
                    isFirst={filteredItems[0] === item}
                    isSelected={selected ? selected.id === item.id : false}
                    onPress={() => {
                      setSelected(item)
                      onChange(item)
                      setShow(false);
                    }}
                  />                
              ))}
            </Content>
          </ModalContainer>
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  )
}