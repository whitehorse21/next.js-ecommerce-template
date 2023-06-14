import React from "react";

type ContextType = {
  theme: string;
  toggleTheme: () => void;
};

export const ThemeContext = React.createContext<ContextType>({
  theme: "light",
  toggleTheme: () => {},
});
