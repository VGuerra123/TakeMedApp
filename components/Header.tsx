import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  Animated,
  Easing,
  Image,
  Dimensions,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Logo from '../assets/images/icon.png';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const theme = useTheme();

  // Animación de aparición del Header (fade + slide)
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-40)).current;

  // Animación de pulso para el logo (escala y ring)
  const logoPulse = useRef(new Animated.Value(0)).current;
  const ringPulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Iniciar el fade + slide del Header
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.out(Easing.poly(3)),
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        easing: Easing.out(Easing.poly(3)),
        useNativeDriver: true,
      }),
    ]).start();

    // Iniciar loop del pulso del logo (ligero cambio de escala)
    Animated.loop(
      Animated.sequence([
        Animated.timing(logoPulse, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(logoPulse, {
          toValue: 0,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Iniciar loop del anillo pulsante: escala + fade‐out
    Animated.loop(
      Animated.sequence([
        Animated.timing(ringPulse, {
          toValue: 1,
          duration: 1200,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(ringPulse, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Interpolaciones para el ring
  const ringScale = ringPulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 2.2],
  });
  const ringOpacity = ringPulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 0],
  });

  // Interpolación para el logo (ligero pulso)
  const logoScale = logoPulse.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.05],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      {/* Gradiente idéntico al loading: azul → morado */}
      <LinearGradient
        colors={['#00AEEF', '#6A00F4']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBg}
      >
        {/* Blur sutil para glassmorphism */}
        <BlurView intensity={30} tint="light" style={styles.blurOverlay} />

        {/* Círculo semitransparente de fondo */}
        <View style={styles.backgroundCircle} />

        <SafeAreaView style={styles.safeArea}>
          <View style={styles.innerColumn}>
            {/* Contenedor del logo con ring animado */}
            <View style={styles.logoContainer}>
              {/* Anillo pulsante */}
              <Animated.View
                style={[
                  styles.ring,
                  {
                    transform: [{ scale: ringScale }],
                    opacity: ringOpacity,
                  },
                ]}
              />

              {/* Logo con pulso sutil */}
              <Animated.View
                style={[
                  styles.logoWrapper,
                  { transform: [{ scale: logoScale }] },
                ]}
              >
                <Image
                  source={Logo}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </Animated.View>
            </View>

            {/* Texto principal */}
            <View style={styles.textContainer}>
              <Text
                style={[
                  styles.title,
                  {
                    color: '#FFFFFF',
                    fontFamily: theme.typography.fontFamily.bold,
                    fontSize: theme.typography.fontSize.xxxl,
                  },
                ]}
              >
                {title}
              </Text>

              {subtitle && (
                <Text
                  style={[
                    styles.subtitle,
                    {
                      color: 'rgba(255,255,255,0.85)',
                      fontFamily: theme.typography.fontFamily.semiBold,
                      fontSize: theme.typography.fontSize.sm + 4,
                    },
                  ]}
                >
                  {subtitle}
                </Text>
              )}
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    zIndex: 20,
    elevation: 8,
    marginBottom: 12,
  },
  gradientBg: {
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
    paddingBottom: 20,
    // Espacio superior aumentado para dar cabida al logo animado con ring
    paddingTop: Platform.OS === 'ios' ? 44 : 54,
  },
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  backgroundCircle: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.5,
    height: SCREEN_WIDTH * 0.5,
    borderRadius: (SCREEN_WIDTH * 0.5) / 2,
    backgroundColor: 'rgba(255,255,255,0.15)',
    top: -(SCREEN_WIDTH * 0.25) + 24,
    left: (SCREEN_WIDTH - SCREEN_WIDTH * 0.5) / 2,
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
  },
  innerColumn: {
    alignItems: 'center',
  },
  logoContainer: {
    width: SCREEN_WIDTH * 0.28,
    height: SCREEN_WIDTH * 0.28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  ring: {
    position: 'absolute',
    width: SCREEN_WIDTH * 0.28,
    height: SCREEN_WIDTH * 0.28,
    borderRadius: (SCREEN_WIDTH * 0.28) / 2,
    borderWidth: 2.5,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  logoWrapper: {
    width: SCREEN_WIDTH * 0.28,
    height: SCREEN_WIDTH * 0.28,
    borderRadius: (SCREEN_WIDTH * 0.28) / 2,
    backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    // Sombra suave en blanco para realce
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  logo: {
    width: SCREEN_WIDTH * 0.18,
    height: SCREEN_WIDTH * 0.18,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 4,
  },
  title: {
    marginBottom: 6,
    // Sombra muy suave para realzar sobre el fondo degradado
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  subtitle: {
    letterSpacing: 0.5,
    lineHeight: 22,
  },
});
