import styled from 'styled-components/native'

interface AddressProps{
    last: boolean,
    height: number,
}

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`
export const Content = styled.ScrollView`
    margin-top: 15px;
`

export const Label = styled.Text`
    padding-left: 20px;
    color: ${({theme}) => theme.colors.text_color[800]};
    font-family: ${({theme}) => theme.fonts.semiBold};
    font-size: 13px;
    margin-top: 20px;
    margin-bottom: 10px;
`

export const Section = styled.View`
    padding: 7px 20px;
    background-color: ${({ theme }) => theme.colors.bgCard};
    justify-content: center;
`

export const SectionSeparator = styled.View`
    width: 100%;
    height: 0.8px;
    background-color: ${({ theme}) => theme.colors.primary_color};
`

export const AddButtonContainer = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.bgCard};
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 16px 0;
`

export const AddButton = styled.View`
    align-items: center;
    justify-content: center;
    border-radius: 999px;
    border-width: 2px;
    border-color: ${({ theme }) => theme.colors.primary_color};
`

export const AddButtonLabel = styled.Text`
    font-size: 13px;
    margin-left: 3%;
    color: ${({ theme }) => theme.colors.primary_color};
    font-family: ${({ theme }) => theme.fonts.medium};
`

export const Emoji = styled.Text`
    text-align: center;
    font-size: 18px;
    bottom: -6px;
    color: ${({theme}) => theme.colors.text_color[600]};
    font-family: ${({theme}) => theme.fonts.regular};
`

export const EmptyNotification = styled.Text`
    top: -6px;
    font-size: 15px;
    color: ${({theme}) => theme.colors.text_color[800]};
    font-family: ${({theme}) => theme.fonts.regular};
    text-align: center;
    letter-spacing: 1.5px;
`

export const Items = styled.View`
    flex: 1;
`

export const ItemContainer = styled.TouchableOpacity`
    flex-direction: row;
    background-color: ${({theme}) => theme.colors.bgCard};
    padding: 14px 20px;
    padding-right: 30px;
    border-bottom-width: 0.55px;
    border-color: #555;
    justify-content: space-between;
    align-items: center;
    position: relative;
    height: 48px;
`

export const ItemText = styled.Text`
    color: ${({theme}) => theme.colors.text_color[700]};
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: 13.5px;
`

export const IconContainer = styled.View`
    position: absolute;
    right: 4.5px;
`

export const Row = styled.View`
    flex-direction: row;
`

export const DataContainer = styled.TouchableOpacity<AddressProps>`
    justify-content: center;
    border-bottom-width: ${(props) => props.last ? 0 : 0.5}px;
    height: ${(props) => props.height}px;
    border-color: #888;
`

export const DataLabel = styled.Text`
    font-size: 13px;
    color: ${({theme}) => theme.colors.text_color[700]};
    font-family: ${({theme}) => theme.fonts.regular};
`
