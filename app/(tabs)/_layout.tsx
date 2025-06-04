import React from 'react';
import { Tabs } from 'expo-router';
import {
  Activity,
  ListChecks,
  Pill as Pills,
  User as User2,
} from 'lucide-react-native';
import { StyleSheet, View, Platform } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { BlurView } from 'expo-blur';

export default function TabLayout() {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          // Colores de los iconos y etiquetas (activas/inactivas)
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.text.muted,

          // Estilo de las etiquetas
          tabBarLabelStyle: {
            fontFamily: 'Poppins-SemiBold',      // Tipografía más sofisticada
            fontSize: 13,                         // Tamaño ligeramente mayor
            textTransform: 'uppercase',           // Etiquetas en mayúsculas
            marginBottom: 4,                      // Espacio inferior
            letterSpacing: 0.5,                   // Espacio entre letras para darle aire
          },

          // Estilo de la “cápsula” que contiene las pestañas
          tabBarStyle: {
            position: 'absolute',
            bottom: 20,
            left: 30,
            right: 30,
            height: 70,                           // Barra más alta para un efecto “pill”
            borderRadius: 35,                     // Bordes muy redondeados
            overflow: 'hidden',                   // Para que el BlurView también respete el borde
            backgroundColor: 'transparent',       // El vidrio difuminado se encargará del fondo
            shadowColor: theme.colors.primary,    // Sombra con tono del color primario
            shadowOffset: { width: 0, height: 10 },
            shadowOpacity: 0.15,
            shadowRadius: 10,
            elevation: 10,
          },

          // Componente que renderiza el fondo difuminado (glassmorphism)
          tabBarBackground: () => (
            <BlurView
              tint="default"                       // Tono ligeramente blanquecino
              intensity={60}                       // Grado de desenfoque
              style={StyleSheet.absoluteFill}      // Ocupa todo el área de la barra
            />
          ),

          // Separación superior dentro de cada ítem
          tabBarItemStyle: {
            marginTop: 6,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Principal',
            tabBarIcon: ({ color, size }) => (
              <Activity color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="medicamentos"
          options={{
            title: 'Medicamentos',
            tabBarIcon: ({ color, size }) => (
              <Pills color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="consejos"
          options={{
            title: 'Consejos',
            tabBarIcon: ({ color, size }) => (
              <ListChecks color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="perfil"
          options={{
            title: 'Perfil',
            tabBarIcon: ({ color, size }) => (
              <User2 color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',   // Transparente para que el gradiente de fondo quede visible
  },
});
