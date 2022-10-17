import styled, { css } from "styled-components/native";
import CurrencyInput from 'react-native-currency-input';

interface PlaceholderLabelProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.View<PlaceholderLabelProps>`
  height: 56px;
  border-bottom-width: 1px;
  padding: 0;
  border-bottom-color: #ffffff80;
  background-color: #fff;
  justify-content: center;
  margin-bottom: 8px;

  ${({ isFocused }) =>
    isFocused &&
    css`
      border-bottom-width: 2px;
      border-bottom-color: #dc1637;
    `};
`;

export const PlaceholderLabel = styled.Text<PlaceholderLabelProps>`
  position: absolute;
  padding: 0px 15px;
  
  ${(props) =>
      props.isFocused || props.isFilled
        ? css`
      top: 3px;
      font-size: 11px;
      color: ${({theme}) => theme.colors.primary_color};
      font-weight: 600;
    ` : css`
      transform: translateY(0px);
      font-size: 14px;
      color: #ababab;
  `}
`;

export const LabeledInput = styled(CurrencyInput)`
  top: 7px;
  flex: 1;
  color: #7a7a80;
  padding: 0px 15px; 
`;