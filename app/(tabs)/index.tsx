import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Animated } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Header } from '@/components/Header';
import { StepCounter } from '@/components/StepCounter';
import { FloatingButton } from '@/components/FloatingButton';
import { Bluetooth, User, ChevronRight } from 'lucide-react-native';

export default function HomeScreen() {
  const theme = useTheme();
  const [steps, setSteps] = useState(7850);
  const [syncing, setSyncing] = useState(false);
  const [lastSync, setLastSync] = useState<string | null>(null);
  
  const syncDevice = () => {
    if (syncing) return;
    
    setSyncing(true);
    
    // Simular sincronización
    setTimeout(() => {
      // Actualizar los pasos con un valor aleatorio
      const newSteps = Math.floor(5000 + Math.random() * 6000);
      setSteps(newSteps);
      
      // Actualizar la hora de sincronización
      const now = new Date();
      const timeStr = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
      setLastSync(timeStr);
      
      // Mostrar mensaje de éxito
      Alert.alert(
        "Sincronización Exitosa",
        "Sincronización exitosa con el dispositivo BLE",
        [{ text: "Aceptar" }]
      );
      
      setSyncing(false);
    }, 2000);
  };
  
  return (
    <View style={styles.container}>
      <Header 
        title="¡Hola, Carlos!" 
        subtitle="Bienvenido a tu centro de salud"
      />
      
      <ScrollView style={styles.content}>
        <StepCounter steps={steps} />
        
        <View 
          style={[
            styles.userInfoCard, 
            {
              backgroundColor: theme.colors.cardBackground,
              borderRadius: theme.borderRadius.lg,
              ...theme.shadow.sm
            }
          ]}
        >
          <View style={styles.userInfoHeader}>
            <View style={styles.userIconContainer}>
              <User size={20} color={theme.colors.primary} />
            </View>
            <Text 
              style={[
                styles.userInfoTitle, 
                {
                  color: theme.colors.text.primary,
                  fontFamily: theme.typography.fontFamily.semiBold,
                  fontSize: theme.typography.fontSize.md,
                }
              ]}
            >
              Información Personal
            </Text>
          </View>
          
          <View style={styles.userInfoRow}>
            <Text 
              style={[
                styles.userInfoLabel,
                {
                  color: theme.colors.text.secondary,
                  fontFamily: theme.typography.fontFamily.regular,
                  fontSize: theme.typography.fontSize.sm,
                }
              ]}
            >
              Nombre:
            </Text>
            <Text 
              style={[
                styles.userInfoValue,
                {
                  color: theme.colors.text.primary,
                  fontFamily: theme.typography.fontFamily.semiBold,
                  fontSize: theme.typography.fontSize.sm,
                }
              ]}
            >
              Carlos Rodríguez
            </Text>
          </View>
          
          <View style={styles.userInfoRow}>
            <Text 
              style={[
                styles.userInfoLabel,
                {
                  color: theme.colors.text.secondary,
                  fontFamily: theme.typography.fontFamily.regular,
                  fontSize: theme.typography.fontSize.sm,
                }
              ]}
            >
              Edad:
            </Text>
            <Text 
              style={[
                styles.userInfoValue,
                {
                  color: theme.colors.text.primary,
                  fontFamily: theme.typography.fontFamily.semiBold,
                  fontSize: theme.typography.fontSize.sm,
                }
              ]}
            >
              35 años
            </Text>
          </View>
          
          <View style={styles.userInfoRow}>
            <Text 
              style={[
                styles.userInfoLabel,
                {
                  color: theme.colors.text.secondary,
                  fontFamily: theme.typography.fontFamily.regular,
                  fontSize: theme.typography.fontSize.sm,
                }
              ]}
            >
              Última sincronización:
            </Text>
            <Text 
              style={[
                styles.userInfoValue,
                {
                  color: lastSync ? theme.colors.accent : theme.colors.text.muted,
                  fontFamily: theme.typography.fontFamily.semiBold,
                  fontSize: theme.typography.fontSize.sm,
                }
              ]}
            >
              {lastSync || 'No sincronizado'}
            </Text>
          </View>
        </View>
        
        {/* Espacio para evitar que el botón flotante oculte contenido */}
        <View style={{ height: 100 }} />
      </ScrollView>
      
      <View style={styles.floatingButtonContainer}>
        <FloatingButton
          icon={<Bluetooth size={20} color="white" />}
          text={syncing ? "Sincronizando..." : "Sincronizar dispositivo"}
          onPress={syncDevice}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  userInfoCard: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
  },
  userInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  userIconContainer: {
    marginRight: 8,
  },
  userInfoTitle: {
    flex: 1,
  },
  userInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  userInfoLabel: {
    flex: 1,
  },
  userInfoValue: {
    flex: 1,
    textAlign: 'right',
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    left: 20,
    alignItems: 'center',
  },
});