import styled from 'styled-components/native'

interface ColumnProps{
  width: number
}

export const Container = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
`

export const Content = styled.View`
  padding: 15px 0;
`

export const Row = styled.View`
  justify-content: space-between;
  flex-direction: row;
`

export const Column = styled.View<ColumnProps>`
  width: ${(props) => props.width}%;
`

export const ErrorMessage = styled.Text`
  width: 100%;
  padding: 8px;
  background-color: #fce6e5;
  color: #ee6d66;
  top: -8px;
  font-size: 12px;
`
