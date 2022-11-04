import styled from 'styled-components/native'

export const Container = styled.View`
    flex-direction: row;
    margin-top: 0px;
    margin: 8px 0px;

`

export const IconContainer = styled.View`
  height: 50px;
  width: 50px;  
  justify-content: center;
  align-items: center;
  background-color: #ffffff;  
`;

export const InputText = styled.TextInput`  
  flex: 1;
  background-color: #ffffff;
  color: ${({theme}) => theme.colors.text_color[700]};
  font-family: ${({theme}) => theme.fonts.regular};
  padding: 0 6px;
`;