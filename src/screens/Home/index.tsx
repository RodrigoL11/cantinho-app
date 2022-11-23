import React from "react";
import { Alert, Switch, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@hooks/auth";
import { themes, useTheme } from "@hooks/theme";
import { Feather } from "@expo/vector-icons";

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
  CardIcon,
} from "./styles";

export default function Home() {
  const navigator = useNavigation();
  const { signOut, authData } = useAuth();
  const { toogleTheme, theme } = useTheme();
  const iconColor = themes[theme].colors.text_color[700];

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

  const isDarkMode = theme === 'dark';
  const moonColor = isDarkMode ? "#FEFCD7" : "#576ad3"
  const sunColor = isDarkMode ? "#FFD600" : "#ecb613";

  return (
    <Container>
      <Row style={{ justifyContent: 'space-between' }}>
        <TouchableWithoutFeedback onPress={() => SignOut()}>
          <IconContainer>
            <Feather name="chevron-left" size={24} color={iconColor} />
          </IconContainer>
        </TouchableWithoutFeedback>
        <Row>
          <Feather name="sun" color={sunColor} size={19} />
          <Switch value={isDarkMode} onValueChange={toogleTheme}
            thumbColor={isDarkMode ? "#c5c3a4" : "#d4b203"}
            trackColor={{
              false: '#FFD600',
              true: '#FEFCD7'
            }} />
          <Feather name="moon" color={moonColor} size={19} />
        </Row>
      </Row>
      <Row style={{ marginTop: 30 }}>
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
        <Card activeOpacity={0.45} onPress={() => navigator.navigate("Pedidos")}>
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
        <Card activeOpacity={0.45} onPress={() => navigator.navigate("Relatorios")}>
          <CardIcon>
            <Feather name="bar-chart" size={60} color="#fff" />
          </CardIcon>
          <CardTitle>Relátorios</CardTitle>
        </Card>
        <Card activeOpacity={0.45} onPress={() => navigator.navigate("Estoque")}>
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