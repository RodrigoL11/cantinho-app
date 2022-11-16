import styled from 'styled-components/native'

export const SubTitle = styled.Text`
  font-family: ${({theme}) => theme.fonts.semiBold};
  font-size: 12px;
  color: ${({theme}) => theme.colors.text_color[600]};
  margin-bottom: 6px;
`

export const Container = styled.View`
  flex-direction: row;
  padding: 0 10px;  
  align-items: center;  
  height: 34px;
  width: 120px;
  justify-content: space-between;
  background-color: ${({theme}) => theme.colors.bgCard};
`

export const StrongLabel = styled.Text`
  font-family: ${({theme}) => theme.fonts.semiBold};
  color: ${({theme}) => theme.colors.text_color[700]};
  font-size: 13px; 
`

export const Label = styled.Text`
  font-family: ${({theme}) => theme.fonts.regular};
  color: ${({theme}) => theme.colors.text_color[700]};
  font-size: 13px;  
`

export const Options = styled.View`
  position: absolute;
  top: 34px;
  padding: 15px;
  background-color: ${({theme}) => theme.colors.bgCard};
`