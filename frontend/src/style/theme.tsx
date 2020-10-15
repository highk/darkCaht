import React, { createContext, Dispatch, useState } from "react";
import { ThemeProvider } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    background: string;
    activeButton: string;
    disabledButton: string;
    message: string;
  }
}

export const themes: any = {
  white: {
    background: "#fff",
    activeButton: "#000",
    disabledButton: "#eee",
    message: "#000",
  },
  black: {
    background: "#000",
    activeButton: "#333",
    disabledButton: "#aaa",
    message: "#fff",
  },
  pink: {
    background: "#ffd0eb",
    activeButton: "#ff2da6",
    disabledButton: "#ffd0eb",
    message: "#ff0093",
  },
};

export const ThemeState = createContext<string>("white");
export const ThemeAction = createContext<Dispatch<string>>(() => {});

const ThemeStore: React.FC<React.ReactNode> = ({ children }) => {
  const [theme, setTheme] = useState<string>("white");
  return (
    <ThemeState.Provider value={theme}>
      <ThemeAction.Provider value={setTheme}>
        <ThemeProvider theme={themes[theme]}>{children}</ThemeProvider>
      </ThemeAction.Provider>
    </ThemeState.Provider>
  );
};

export default ThemeStore;
