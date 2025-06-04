import React, { createContext, useContext, ReactNode } from 'react';

// Definición de los colores del tema
export const theme = {
  colors: {
    primary: '#0047AB',        // Azul principal
    secondary: '#20B2AA',      // Turquesa secundario
    accent: '#4CAF50',         // Verde acento
    background: '#F8FAFC',     // Fondo principal
    cardBackground: '#FFFFFF', // Fondo de tarjetas
    text: {
      primary: '#1A1A2E',      // Texto principal
      secondary: '#4A5568',    // Texto secundario
      light: '#FFFFFF',        // Texto claro
      muted: '#718096',        // Texto suavizado
    },
    status: {
      success: '#38A169',      // Verde éxito
      warning: '#F59E0B',      // Amarillo advertencia
      error: '#E53E3E',        // Rojo error
      info: '#3182CE',         // Azul información
    },
    gradient: {
      start: '#0047AB',        // Inicio de gradiente
      end: '#20B2AA',          // Fin de gradiente
    }
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 20,
    full: 9999,
  },
  typography: {
    fontFamily: {
      regular: 'Poppins-Regular',
      semiBold: 'Poppins-SemiBold',
      bold: 'Poppins-Bold',
    },
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 24,
      xxxl: 32,
    }
  },
  shadow: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.18,
      shadowRadius: 1.0,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.30,
      shadowRadius: 4.65,
      elevation: 8,
    }
  }
};

const ThemeContext = createContext(theme);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};