import React, { createContext, useContext, ReactNode } from 'react';

export const theme = {
  colors: {
    // -------- Paleta Principal --------
    primary: '#0D6EFD',        // Azul Profundo → confianza y profesionalismo
    secondary: '#20C3B2',      // Verde Azulado Claro → frescura e innovación
    accent: '#7CE98F',         // Verde Lima Suave → energía y vitalidad

    // -------- Fondos y Superficies --------
    background: '#E8F6F9',     // Fondo muy claro con ligero tono turquesa
    cardBackground: '#FFFFFF', // Tarjetas con blanco puro para alto contraste

    // -------- Texto --------
    text: {
      primary: '#1E293B',      // Gris oscuro azulado (casi azul marino) para títulos
      secondary: '#475569',    // Gris medio azulado para subtítulos y cuerpo de texto
      light: '#FFFFFF',        // Blanco puro para texto sobre fondos oscuros
      muted: '#94A3B8',        // Gris suave azulado para hint / texto secundario muy tenue
    },

    // -------- Estados / Alertas --------
    status: {
      success: '#22C55E',      // Verde intenso para éxito
      warning: '#FACC15',      // Amarillo vivo para advertencias
      error: '#EF4444',        // Rojo vibrante para errores
      info: '#3B82F6',         // Azul vivo para información (ligeramente diferente al primary)
    },

    // -------- Degradados --------
    gradient: {
      start: '#0D6EFD',        // Mismo que primary
      end: '#20C3B2',          // Segundo color turquesa claro
    }
  },

  // -------- Espaciados --------
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  // -------- Radios de Borde --------
  borderRadius: {
    sm: 6,
    md: 10,
    lg: 16,
    xl: 28,
    full: 9999,
  },

  // -------- Tipografía --------
  typography: {
    fontFamily: {
      regular: 'Poppins-Regular',
      medium: 'Poppins-Medium',
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
    },
  },

  // -------- Sombras --------
  shadow: {
    sm: {
      shadowColor: '#0D6EFD',      // Sombra suave con el color primario
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.10,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#0D6EFD',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 5,
    },
    lg: {
      shadowColor: '#0D6EFD',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.20,
      shadowRadius: 6,
      elevation: 10,
    },
  },
};

const ThemeContext = createContext(theme);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => (
  <ThemeContext.Provider value={theme}>
    {children}
  </ThemeContext.Provider>
);
