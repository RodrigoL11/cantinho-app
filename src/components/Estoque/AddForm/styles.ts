import styled from "styled-components/native";

export const Container = styled.View`
    width: 100%;
    height: 100%;
    background-color: #00000099;
    align-items: center;
    position: absolute;
`

export const Background = styled.TouchableOpacity`
    flex: 1;
    width: 100%;
`

export const Card = styled.View`
    width: 100%;
    background-color: ${({theme}) => theme.colors.background};
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 20px;
`

export const Title = styled.Text`
  font-size: 20px;
  color: ${({theme}) => theme.colors.text_color[900]};
  font-family: ${({theme}) => theme.fonts.bold}; 
`

export const SubTitle = styled.Text`
  font-size: 14px;
  color: ${({theme}) => theme.colors.text_color[700]};
  font-family: ${({theme}) => theme.fonts.medium}; 
  margin-bottom: 20px;
`

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

export const Column = styled.View`
  width: 49%;
`

export const ErrorMessage = styled.Text`
  width: 100%;
  padding: 8px;
  background-color: #fce6e5;
  color: #ee6d66;
  top: -8px;
  font-size: 12px;
  font-family: ${({theme}) => theme.fonts.semiBold};
`