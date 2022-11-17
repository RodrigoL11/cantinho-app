import React, { useEffect, useState } from 'react';
import { Alert, BackHandler, Keyboard, KeyboardAvoidingView, Modal, ScrollView, TouchableWithoutFeedback } from 'react-native';
import Header from '@components/Header';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import {
  Container,
  CategoriesContainer,
  Content,
  CategoryLabel,
  Section,
  ProductContainer,
  ProductName,
  ProductPrice,
  ProductSeparator,
  CartTitle,
  CartContainer,
  CartTotal,
  CartIcon,
  CartItemsQuantityContainer,
  CartItemsQuantityLabel
} from './styles'

import api from '@services/api';
import { ICartItems, ICategories, IProducts } from '@interfaces/main';
import CategoryButton from '@components/CriarPedido/CategoryButton';
import BuscarProduto from '@components/CriarPedido/BuscarProduto';
import AddProduto from '@components/CriarPedido/AddProduto';
import FinalizarPedido from '@components/CriarPedido/FinalizarPedido';
import Empty from '@components/Empty';

export default function CreateOrder({ route }: any) {
  const [categories, setCategories] = useState<ICategories[]>([]);
  const [products, setProducts] = useState<IProducts[]>([]);
  const [type, setType] = useState<string>();
  const [show, setShow] = useState<boolean>(false);
  const [dataSourceCords, setDataSourceCords] = useState<any[]>([]);

  const [cartItems, setCartItems] = useState<ICartItems[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProducts>();

  const [ref, setRef] = useState<ScrollView>();
  const navigation = useNavigation();
  const { comandaID } = route.params

  const CategorySection = (category: ICategories, key: number) => {
    let _products = products.filter(p => p.cID === category.id)

    return (
      <Section
        key={key}
        onLayout={(event) => {
          const { layout } = event.nativeEvent;
          dataSourceCords[key] = layout.y;
          setDataSourceCords(dataSourceCords);
        }}
      >
        <CategoryLabel>
          {category.nome}
        </CategoryLabel>
        {_products.map((product, index) => (
          <TouchableWithoutFeedback key={index} onPress={() => toogleModal('add', product)} >
            <ProductContainer>
              <ProductName>{product.nome}</ProductName>
              <ProductPrice>R$ {product.valor_tabela.toFixed(2)}</ProductPrice>
              {_products[_products.length - 1] !== product && <ProductSeparator />}
            </ProductContainer>
          </TouchableWithoutFeedback>
        ))}
      </Section>
    )
  }

  const loadCategories = async () => {
    try {
      const response = await api.get('categorias/status=A')
      const { results } = response.data
      return results;
    } catch (err) {
      console.error(err)
    }
  }

  const loadProducts = async () => {
    try {
      const response = await api.get('produtos/status=A')
      const { results } = response.data
      return results;
    } catch (err) {
      console.error(err)
    }
  }

  const fetchData = async () => {
    const [categories, products] = await Promise.allSettled([
      loadCategories(),
      loadProducts()
    ])

    if (categories.status === 'fulfilled') setCategories(categories.value)
    if (products.status === 'fulfilled') setProducts(products.value)
  }

  useEffect(() => {
    fetchData();
  }, [])

  const scrollHandler = (scrollToIndex: number) => {
    if (!ref) return null;

    if (dataSourceCords.length > 0) {
      ref.scrollTo({
        x: 0,
        y: dataSourceCords[scrollToIndex],
        animated: true
      })
    } else {
      console.error('Out of Max Index')
    }
  }

  const sumCartTotal = () => {
    let total = 0;

    cartItems.forEach(item => {
      total += item.product.valor_tabela * item.quantity
    })

    return `R$ ${total.toFixed(2)}`
  }

  const toogleModal = (type?: string, product?: IProducts) => {
    setType(type || "");
    setSelectedProduct(product || undefined);
    type == "search-add" ? setType("add") : setShow(!show);
  }

  const backAction = (headerButton?: boolean) => {
    if (cartItems.length > 0) {
      Alert.alert("Atenção", "Há um pedido em andamento, tem certeza que quer voltar?", [
        {
          text: "Cancelar",
          onPress: () => null,
          style: "cancel"
        },
        { text: "SIM", onPress: () => navigation.goBack() }
      ]);
      return true;
    } else if (headerButton) {
      navigation.goBack();
    };
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [cartItems]);

  return (
    <Container>
      <Header
        title={'Criar pedido'}
        onPress={() => backAction(true)}
        extraIconName="search"
        extraOnPress={() => toogleModal("search")}
      />
      {products.length > 0 ?
        <>
          <CategoriesContainer
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            {categories.map((category, index) =>
              category.NumberOfProducts !== 0 &&
              <CategoryButton
                title={category.nome}
                onPress={() => scrollHandler(index)}
                key={index}
              />
            )}
          </CategoriesContainer>

          <Content
            ref={(ref: any) => setRef(ref)}
          >
            {categories.map((category, index) => category.NumberOfProducts !== 0 && CategorySection(category, index))}
          </Content>
        </>
        :
        <Empty          
          title={"Não há nenhum produto\ncadastrado"}
          subtitle={"Cadastre produtos para poder criar\npedidos"}
        />
      }
      {cartItems.length > 0 &&
        <CartContainer activeOpacity={0.85} onPress={() => toogleModal("finalize")}>
          <CartIcon>
            <Feather name="shopping-cart" color="#fff" size={20} />
            <CartItemsQuantityContainer>
              <CartItemsQuantityLabel>{cartItems.length}</CartItemsQuantityLabel>
            </CartItemsQuantityContainer>
          </CartIcon>
          <CartTitle>Meu pedido</CartTitle>
          <CartTotal>{sumCartTotal()}</CartTotal>
        </CartContainer>}
      <Modal
        visible={show}
        onRequestClose={() => toogleModal()}
        transparent={true}
        statusBarTranslucent={true}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
            {type === "search"
              ? <BuscarProduto products={products} toogleModal={toogleModal} />
              : type === "add" && selectedProduct
                ? <AddProduto product={selectedProduct} setProducts={setProducts} toogleModal={toogleModal} setCartItems={setCartItems} />
                : type === "finalize" && cartItems.length > 0
                && <FinalizarPedido comandaID={comandaID} setProducts={setProducts} cartItems={cartItems} setCartItems={setCartItems} toogleModal={toogleModal} />
            }
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </Modal>
    </Container>
  )
}