import "styled-components";
import theme from "./theme";
import fonts from "./fonts";

declare module "styled-components" {
  type ThemeType = typeof theme;
  type FontsType = typeof fonts;

  export interface DefaultTheme {
    title: string
    fonts: {
      light: string
      regular: string
      medium: string
      semiBold: string
      bold: string
    }
    colors: {
      background: string
      bgCard: string
      bgCard_selected: string

      text_color: {
        500: string
        600: string
        700: string
        800: string
        900: string
      },
      primary_color: string

      border_color: string
    }
  }
}