import React from "react";
import { Alert, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@hooks/auth";
import { Ionicons, Feather } from "@expo/vector-icons";

import {
  Container,
  IconContainer,
  Row,
  Title,
  Name,
  Emoji,
  SubTitle,
  Content,
  Card,
  CardTitle,
  CardIcon
} from "./styles";

export default function Home() {
  const navigator = useNavigation();
  const { signOut } = useAuth();
  const { authData } = useAuth();

  const SignOut = () => {
    Alert.alert("Adeus", "Deseja realmente sair da conta?", [
      {
        text: "Sim",
        onPress: () => signOut(),
      },
      {
        text: "Cancelar",
        onPress: () => null,
      },
    ]);

    return true;
  };

  return (
    <Container>
      <IconContainer>
        <TouchableWithoutFeedback onPress={() => SignOut()}>
          <Ionicons name="ios-exit-outline" size={32} color="#222" />
        </TouchableWithoutFeedback>
      </IconContainer>
      <Row>
        <Title>Olá, </Title>
        <Name>{authData?.name.split(' ')[0]}</Name>
        <Emoji>👋</Emoji>
      </Row>
      <SubTitle>Seja bem vindo ao Cantinho Management</SubTitle>
      <Content>
        <Card activeOpacity={0.45} onPress={() => navigator.navigate("Comandas")}>
          <CardIcon>
            <Feather name="book" size={60} color="#fff" />
          </CardIcon>
          <CardTitle>Comandas</CardTitle>
        </Card>
        <Card activeOpacity={0.45}>
          <CardIcon>
            <Feather name="clock" size={60} color="#fff" />
          </CardIcon>
          <CardTitle>Pedidos</CardTitle>
        </Card>
        <Card activeOpacity={0.45} onPress={() => navigator.navigate("Users")} token={authData?.token} disabled={authData?.token == "user" ? true : false}>
          <CardIcon>
            <Feather name="users" size={60} color="#fff" />
          </CardIcon>
          <CardTitle>Usuários</CardTitle>
        </Card>
        <Card activeOpacity={0.45}>
          <CardIcon>
            <Feather name="bar-chart" size={60} color="#fff" />
          </CardIcon>
          <CardTitle>Relátorios</CardTitle></Card>
        <Card activeOpacity={0.45}>
          <CardIcon>
            <Feather name="database" size={60} color="#fff" />
          </CardIcon>
          <CardTitle>Estoque</CardTitle>
        </Card>
        <Card activeOpacity={0.45} onPress={() => navigator.navigate("Produtos")} token={authData?.token} disabled={authData?.token == "user" ? true : false}>
          <CardIcon>
            <Feather name="package" size={60} color="#fff" />
          </CardIcon>
          <CardTitle>Produtos</CardTitle>
        </Card>
      </Content>
    </Container>
  );
}