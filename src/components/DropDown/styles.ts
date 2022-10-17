import styled, { css } from 'styled-components/native'

interface CategoryProps{
  isSelected: boolean;
  isLast: boolean;
}

export const Container = styled.View`
  height: 56px;
  background-color: #fff;
  padding: 0 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;  
`

export const Placeholder = styled.Text`
  color: #ababab;
`

export const ModalContainer = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`

export const CategoryContainer = styled.View<CategoryProps>`
  height: 46px;
  justify-content: center;
  padding: 0px 15px;
  border-bottom-width: ${(props) => props.isLast ? 0 : 1}px;
  border-color: #dadada;

  ${(props) =>
      props.isSelected
        ? css`
      background-color: #dfdfdf;
      margin: -1.2px 0px;      
    ` : css`
      background-color: #FFF;
  `}
`

export const Title = styled.Text`
  color: #7a7a80;
  font-size: 14px;
`

export const Content = styled.View`
  background-color: #FFF;
`