import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/context/ThemeContext';

export default function LoadingScreen() {
  const theme = useTheme();
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.95);
  
  useEffect(() => {
    // Animación de aparición
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
    
    // Navegar a la pantalla principal después de 2.5 segundos
    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <LinearGradient
      colors={[theme.colors.gradient.start, theme.colors.gradient.end]}
      style={styles.container}
    >
      <Animated.View 
        style={[
          styles.logoContainer, 
          { 
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }] 
          }
        ]}
      >
        {/* Logo placeholder - en producción reemplazar con el logo real */}
        <View style={styles.logoCircle}>
          <Text style={[styles.logoText, { fontFamily: theme.typography.fontFamily.bold }]}>TM</Text>
        </View>
        <Text style={[styles.appName, { fontFamily: theme.typography.fontFamily.bold }]}>TakeMed</Text>
        <Text style={[styles.tagline, { fontFamily: theme.typography.fontFamily.regular }]}>
          Tu salud, nuestra prioridad
        </Text>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  logoText: {
    fontSize: 36,
    color: '#0047AB',
    fontWeight: 'bold',
  },
  appName: {
    fontSize: 32,
    color: 'white',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  }
});