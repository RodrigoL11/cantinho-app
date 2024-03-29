import Button from '@components/Button';
import Header from '@components/Header';
import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import {
  Card,
  Container,
  Content,
  Label,
  PaymentLabel,
  SubTitle,
  Input,
  SpacedRow,
  Separator,
  TotalLabel,
  Footer,
  Row,
  Icon,
} from './styles'

import api from '@services/api';
import { useAuth } from '@hooks/auth';
import { formatCurrency } from '@utils/main';

export default function Pagamento({ route }: any) {
  const { comandaID, total } = route.params;
  const [pix, setPix] = useState(0);
  const [card, setCard] = useState(0);
  const [money, setMoney] = useState(0);
  const [shareIn, setShareIn] = useState(1);
  const [hasBudget, setHasBudget] = useState(true);
  const navigation = useNavigation();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  //handling keyboard visible
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const { authData } = useAuth();

  function roundUp(num: number, precision: number) {
    precision = Math.pow(10, precision)
    return (Math.ceil(num * precision) / precision).toFixed(2)
  }

  const handleSubmit = () => {
    Alert.alert("Atenção", "Tem certeza que deseja finalizar o pagamento e a comanda?", [
      {
        text: "Cancelar",
        onPress: () => null,
        style: "cancel"
      },
      {
        text: "SIM",
        style: "default",
        onPress: async () => {
          if (!authData) return;

          await api.post('pagamentos', {
            data: {
              comandaID: comandaID,
              usuarioID: authData.id,
              pix_valor: pix,
              cartao_valor: card,
              dinheiro_valor: money
            }
          }).then(() => {
            Alert.alert("Sucesso", "Pagamento da comanda cadastrado sem problemas.")
            navigation.dispatch(StackActions.pop(2));
          }
          )
        }
      }
    ]);
  }

  const sum = pix + card + money;
  const _total = total + (hasBudget ? (total * 0.1) : 0)

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header
          title="Pagamento"
          onPress={navigation.goBack}
        />
        <Content>
          <SubTitle>Formas de pagamento</SubTitle>
          <Card>
            <SpacedRow>
              <PaymentLabel>Pix</PaymentLabel>
              <Input
                value={pix || 0}
                onChangeValue={(text: number) => setPix(text)}
                prefix="R$ "
                delimiter="."
                separator=","
                precision={2}
              />
            </SpacedRow>
            <Separator />
            <SpacedRow>
              <PaymentLabel>Cartão</PaymentLabel>
              <Input
                value={card || 0}
                onChangeValue={(text: number) => setCard(text)}
                prefix="R$ "
                delimiter="."
                separator=","
                precision={2}
              />
            </SpacedRow>
            <Separator />
            <SpacedRow>
              <PaymentLabel>Dinheiro</PaymentLabel>
              <Input
                value={money || 0}
                onChangeValue={(text: number) => setMoney(text)}
                prefix="R$ "
                delimiter="."
                separator=","
                precision={2}
              />
            </SpacedRow>
            <Separator />
            <SpacedRow style={{ marginTop: 6 }}>
              <TotalLabel>Total</TotalLabel>
              <TotalLabel>{formatCurrency(sum)}</TotalLabel>
            </SpacedRow>
            {sum > 0 && sum !== _total ?
              <SpacedRow>
                <Label>{sum > _total ? "Excesso" : "Falta"}</Label>
                <Label>{formatCurrency(sum > _total ? sum - _total : _total - sum)}</Label>
              </SpacedRow>
              : null}
          </Card>
          <SubTitle>Resumo do pedido</SubTitle>
          <Card>
            <SpacedRow>
              <Label>Subtotal</Label>
              <Label>{formatCurrency(total)}</Label>
            </SpacedRow>
            <TouchableWithoutFeedback onPress={() => setHasBudget(!hasBudget)}>
              <SpacedRow>
                <Label style={!hasBudget ? { color: '#d20026' } : null}>Taxa de serviço</Label>
                <Label style={!hasBudget ? { color: '#d20026', textDecorationLine: 'line-through', textDecorationStyle: 'solid' } : null}>{formatCurrency(total * 0.1)}</Label>
              </SpacedRow>
            </TouchableWithoutFeedback>
            <SpacedRow style={{ marginTop: 6 }}>
              <TotalLabel>Total</TotalLabel>
              <TotalLabel>{formatCurrency(_total)}</TotalLabel>
            </SpacedRow>
          </Card>
          <SubTitle>Outros</SubTitle>
          <Card>
            <SpacedRow>
              <PaymentLabel>Dividir por quantas pessoas?</PaymentLabel>
              <Row>
                <TouchableWithoutFeedback
                  onPress={() => {
                    if (shareIn === 1) return null;
                    setShareIn(shareIn - 1)
                  }}
                >
                  <Icon>
                    <Ionicons name="chevron-down" size={17} color="#757575" />
                  </Icon>
                </TouchableWithoutFeedback>
                <Label style={{ marginLeft: 6, marginRight: 6 }}>{shareIn}</Label>
                <TouchableWithoutFeedback
                  onPress={() => {
                    if (shareIn >= 99) return null;
                    setShareIn(shareIn + 1)
                  }}
                >
                  <Icon>
                    <Ionicons name="chevron-up" size={17} color="#757575" />
                  </Icon>
                </TouchableWithoutFeedback>
              </Row>
            </SpacedRow>
            <SpacedRow>
              <Label>Valor para cada</Label>
              <Label>{formatCurrency(roundUp((_total / shareIn), 2))}</Label>
            </SpacedRow>
          </Card>
        </Content>
        <Footer>
          {isKeyboardVisible ? null :
            <Button
              title="Finalizar pagamento"
              onPress={handleSubmit}
              disabled={sum !== _total}
              style={sum !== _total
                ? { backgroundColor: '#cecece', marginBottom: 0 }
                : { marginBottom: 0 }}
            />
          }
        </Footer>
      </Container>
    </TouchableWithoutFeedback>
  )
}