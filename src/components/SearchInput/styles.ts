import styled from 'styled-components/native'

export const Container = styled.View`
    flex-direction: row;
    margin-top: 0px;
    margin: 8px 0px;
    height: 50px;
`

export const IconContainer = styled.View`
  height: 50px;
  width: 50px;  
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.bgCard};  
`;

export const InputText = styled.TextInput`  
  flex: 1;
  background-color: ${({ theme }) => theme.colors.bgCard}; 
  color: ${({theme}) => theme.colors.text_color[900]};
  font-family: ${({theme}) => theme.fonts.regular};
  padding: 0 6px;
`;