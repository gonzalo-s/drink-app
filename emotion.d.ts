import "@emotion/react";

declare module "@emotion/react" {
  export interface Theme {
    colors: {
      text: string;
      background: string;
      backgroundSecondary: string;
      primary: string;
      border: string;
      borderColor: string; // Added borderColor to theme typing
      placeholder: string;
      dropdown: string;
      dropdownText: string;
      dropdownSelected: string;
      inputBackground: string;
    };
    border: {
      width: number;
      radius: number;
    };
  }
}
