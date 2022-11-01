import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
`

export const Content = styled.View`
    padding: 15px 0;
`

export const ErrorMessage = styled.Text`
  width: 100%;
  padding: 8px;
  background-color: #fce6e5;
  color: #ee6d66;
  font-family: ${({theme}) => theme.fonts.semiBold};
  top: -8px;
  font-size: 12px;
`