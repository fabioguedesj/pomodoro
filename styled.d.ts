import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      black: string;
      lightBlack: string;
      gray: string;
      lightGray: string;
      white: string;
      lightWhite: string;
      lightGreen;
      darkGreen;
    };
    borderRadius: string;
    boxShadow: string;
  }
}
