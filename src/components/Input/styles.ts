import styled, { css } from "styled-components/native";
import MaskInput from 'react-native-mask-input';
interface Props {
  isFocused: boolean;
}

export const Container = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
  height: 56px;
`;

export const IconContainer = styled.View<Props>`
  height: 56px;
  width: 55px;
  justify-content: center;
  align-items: center;
  margin-right: 2px;
  background-color: #ffffff;

  ${({ isFocused }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: #dc1637;
    `};
`;

export const InputText = styled(MaskInput)<Props>`
  flex: 1;
  background-color: #ffffff;
  color: #7a7a80;
  padding: 0 15px;

  ${({ isFocused }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: #dc1637;
    `};
`;

export const SecurityContainer = styled.TouchableOpacity<Props>`
  height: 56px;
  width: 55px;
  justify-content: center;
  align-items: center;
  background-color: #fff;

  ${({ isFocused }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: #dc1637;
    `};
`;
