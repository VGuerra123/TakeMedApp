import React from 'react';
import { Tabs } from 'expo-router';
import { Activity, ListChecks, Pill as Pills, User as User2 } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

export default function TabLayout() {
  const theme = useTheme();
  
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.text.muted,
          tabBarLabelStyle: {
            fontFamily: theme.typography.fontFamily.regular,
            fontSize: 12,
          },
          tabBarStyle: {
            position: 'absolute',
            bottom: 16,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 20,
            height: 60,
            ...theme.shadow.md
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Principal',
            tabBarIcon: ({ color, size }) => <Activity size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="medicamentos"
          options={{
            title: 'Medicamentos',
            tabBarIcon: ({ color, size }) => <Pills size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="consejos"
          options={{
            title: 'Consejos',
            tabBarIcon: ({ color, size }) => <ListChecks size={size} color={color} />,
          }}
        />
        <Tabs.Screen
          name="perfil"
          options={{
            title: 'Perfil',
            tabBarIcon: ({ color, size }) => <User2 size={size} color={color} />,
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});