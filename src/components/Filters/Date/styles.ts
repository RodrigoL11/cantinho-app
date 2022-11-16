import styled from 'styled-components/native'

export const Container = styled.View`
  margin-left: 16px;
`

export const SubTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.semiBold};
  font-size: 12px;
  color: ${({theme}) => theme.colors.text_color[600]};
  margin-bottom: 6px;
`

export const DateContainer = styled.View`  
  padding: 0 10px;
  height: 34px;    
  align-items: center;
  justify-content: center;  
  height: 34px; 
  background-color: ${({theme}) => theme.colors.bgCard};
`

export const Label = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme}) => theme.colors.text_color[700]};
  font-size: 13px;
  letter-spacing: 0.5px;
`