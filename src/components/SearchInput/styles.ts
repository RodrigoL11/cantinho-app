import styled, {css} from 'styled-components/native'

interface Props {
  isFocused: boolean;
}

export const Container = styled.View`
    flex-direction: row;
    margin-top: 0px;
    margin: 8px 0px;

`

export const IconContainer = styled.View<Props>`
  height: 50px;
  width: 50px;  
  justify-content: center;
  align-items: center;
  background-color: #ffffff;

  /* ${({ isFocused }) =>
    isFocused &&
    css`
      border-width: 1px;
      border-right-width: 0px;
      border-color: ${({theme}) => theme.colors.primary_color};
    `}; */
`;

export const InputText = styled.TextInput<Props>`  
  flex: 1;
  background-color: #ffffff;
  color: ${({theme}) => theme.colors.text_color};
  font-family: ${({theme}) => theme.fonts.regular};
  padding: 0 10px;
  
  /* ${({ isFocused }) =>
    isFocused &&
    css`
      border-width: 1px;
      border-left-width: 0px;      
      border-color: ${({theme}) => theme.colors.primary_color};
    `}; */
`;