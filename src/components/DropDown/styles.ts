import styled, { css } from 'styled-components/native'

interface CategoryProps{
  isSelected: boolean;
  isFirst: boolean;
}

export const Container = styled.View`
  height: 56px;
  background-color: ${({theme}) => theme.colors.bgCard};
  padding: 0 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;  
`

export const Placeholder = styled.Text`
  color: ${({theme}) => theme.colors.text_color[900]};
  font-family: ${({theme}) => theme.fonts.light};
`

export const ModalContainer = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`

export const CategoryContainer = styled.View<CategoryProps>`
  height: 46px;
  justify-content: center;
  padding: 0px 15px;
  border-top-width: ${({isFirst}) => isFirst ? 0 : 0.6}px;
  border-color: ${({theme}) => theme.colors.border_color};

  ${(props) =>
      props.isSelected
        ? css`
      background-color: ${({theme}) => theme.colors.bgCard_selected};
      margin: -1.2px 0px;      
    ` : css`
      background-color: ${({theme}) => theme.colors.bgCard};
  `}
`

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.text_color[600]};
  font-size: 14px;
  font-family: ${({theme}) => theme.fonts.medium};
`

export const Content = styled.View`
  background-color: ${({theme}) => theme.colors.bgCard};
`