import "styled-components";
import theme from "./theme";
import fonts from "./fonts";

declare module "styled-components" {
  type ThemeType = typeof theme;
  type FontsType = typeof fonts;

  export interface DefaultTheme<ThemeType, FontsType> {}
}