export type Theme = {
  colors: {
    text: string;
    background: string;
    backgroundSecondary: string;
    primary: string;
    border: string;
    borderColor: string;
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
};

// Theme definitions for light and dark mode
export const lightTheme: Theme = {
  colors: {
    text: "#000",
    background: "#fff",
    backgroundSecondary: "#f5f5f5",
    primary: "#007AFF",
    border: "#e0e0e0",
    borderColor: "#e0e0e0",
    placeholder: "#888",
    dropdown: "#fff",
    dropdownText: "#000",
    dropdownSelected: "#007AFF",
    inputBackground: "#fff",
  },
  border: {
    width: 1,
    radius: 8,
  },
};

export const darkTheme: Theme = {
  colors: {
    text: "#fff",
    background: "#000",
    backgroundSecondary: "#1f1f1f",
    primary: "#007AFF",
    border: "#333",
    borderColor: "#333", // Added borderColor for all borders
    placeholder: "#aaa",
    dropdown: "#1f1f1f",
    dropdownText: "#fff",
    dropdownSelected: "red",
    inputBackground: "#1f1f1f",
  },
  border: {
    width: 1,
    radius: 8,
  },
};
