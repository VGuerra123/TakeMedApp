import React, { useRef, useEffect } from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  Text,
  View,
  Platform,
  ViewStyle,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

interface FloatingButtonProps {
  icon?: React.ReactNode;
  text: string;
  onPress: () => void;
  style?: ViewStyle;
}

export function FloatingButton({
  icon,
  text,
  onPress,
  style,
}: FloatingButtonProps) {
  const theme = useTheme();

  // -------------------------------------------------------
  // Animación de presión (scaleAnim) y glow (shadowAnim)
  // -------------------------------------------------------
  const scalePress = useRef(new Animated.Value(1)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.parallel([
      /* Encoge un poco */
      Animated.spring(scalePress, {
        toValue: 0.92,
        friction: 6,
        tension: 200,
        useNativeDriver: true,
      }),
      /* Aumenta glow */
      Animated.timing(glowAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      /* Vuelve a escala 1 */
      Animated.spring(scalePress, {
        toValue: 1,
        friction: 5,
        tension: 100,
        useNativeDriver: true,
      }),
      /* Reduce glow */
      Animated.timing(glowAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  // -------------------------------------------------------
  // Animación de pulso continuo (idle pulse)
  // -------------------------------------------------------
  const idleAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    // Loop entre 0 y 1 para interpolar un ligero pulso
    Animated.loop(
      Animated.sequence([
        Animated.timing(idleAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(idleAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [idleAnim]);

  // Interpolación de idleAnim para que la escala vaya de 1 a 1.05
  const scaleIdle = idleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.05],
  });

  // -------------------------------------------------------
  // Combinar ambas escalas: presión × pulso
  // -------------------------------------------------------
  const finalScale = Animated.multiply(scalePress, scaleIdle);

  // -------------------------------------------------------
  // Calcular color de sombra (glow) a partir de theme.colors.primary
  // -------------------------------------------------------
  const primaryHex = theme.colors.primary.replace('#', '');
  const r = parseInt(primaryHex.substring(0, 2), 16);
  const g = parseInt(primaryHex.substring(2, 4), 16);
  const b = parseInt(primaryHex.substring(4, 6), 16);

  const shadowColor = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      `rgba(${r},${g},${b},0.15)`, // sombra sutil en estado idle o normal
      `rgba(${r},${g},${b},0.7)`,  // sombra más intensa al presionar
    ],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: finalScale }],
          shadowColor,
        },
        style,
      ]}
    >
      {/* Blur para fondo lechoso */}
      <BlurView intensity={30} tint="light" style={styles.blurWrapper}>
        {/* TouchableWithoutFeedback para manejar pressIn/pressOut */}
        <TouchableWithoutFeedback
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          {/* 
            LinearGradient para fondo degradado (start → end)
            borderRadius desde theme
          */}
          <LinearGradient
            colors={[theme.colors.gradient.start, theme.colors.gradient.end]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              styles.gradient,
              {
                borderRadius: theme.borderRadius.full,
              },
            ]}
          >
            <View style={styles.content}>
              {icon && (
                <View style={styles.iconHolder}>{icon}</View>
              )}
              <Text
                style={[
                  styles.text,
                  {
                    color: theme.colors.text.light,
                    fontFamily: theme.typography.fontFamily.semiBold,
                    fontSize: theme.typography.fontSize.lg,
                    // Sutil sombra de texto con el color primary
                    textShadowColor: `rgba(${r},${g},${b},0.4)`,
                    textShadowOffset: { width: 0, height: 2 },
                    textShadowRadius: 6,
                  },
                ]}
              >
                {text}
              </Text>
            </View>
          </LinearGradient>
        </TouchableWithoutFeedback>
      </BlurView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 16,
    borderRadius: 48,
  },
  blurWrapper: {
    borderRadius: 48,
    overflow: 'hidden',
    ...Platform.select({
      android: { backgroundColor: 'rgba(255,255,255,0.03)' },
    }),
  },
  gradient: {
    height: 64,
    paddingHorizontal: 32,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconHolder: {
    marginRight: 10,
    // Sombra interna para que el ícono “flote” un poco
    shadowColor: 'rgba(0,0,0,0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  text: {
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
