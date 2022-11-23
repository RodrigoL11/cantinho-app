import styled from 'styled-components/native'

interface Props{
  reverse?: boolean;
}

export const Container = styled.TouchableOpacity<Props>`
  width: 100%;
  padding: 19px;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => (props) => props.reverse ? theme.colors.bgCard : theme.colors.primary_color};
  margin-bottom: 8px;
`

export const Title = styled.Text<Props>`
  font-size: 15px;
  font-family: ${({theme}) => theme.fonts.semiBold};
  color: ${({ theme }) => (props) => props.reverse ?  theme.colors.primary_color : "#fff"};
`