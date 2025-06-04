import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { BlurView } from 'expo-blur';

interface HealthTipCardProps {
  title: string;
  description: string;
  iconName?: React.ReactNode;
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export function HealthTipCard({ title, description, iconName }: HealthTipCardProps) {
  const theme = useTheme();

  const ringAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (iconName) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(ringAnim, {
            toValue: 1,
            duration: 1200,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(ringAnim, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, []);

  // Interpolaciones para el anillo del icono
  const ringScale = ringAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.8],
  });
  const ringOpacity = ringAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 0],
  });

  return (
    <View style={styles.outerWrapper}>
      <BlurView intensity={30} tint="light" style={styles.blurBackground}>
        <View
          style={[
            styles.cardContainer,
            {
              borderRadius: theme.borderRadius.xl,
              backgroundColor: 'rgba(255,255,255,0.15)',
              borderColor: 'rgba(255,255,255,0.25)',
              borderWidth: 1,
            },
          ]}
        >
          <View style={styles.contentRow}>
            {iconName && (
              <View style={styles.iconWrapper}>
                {/* Anillo pulsante */}
                <Animated.View
                  style={[
                    styles.iconRing,
                    {
                      transform: [{ scale: ringScale }],
                      opacity: ringOpacity,
                    },
                  ]}
                />
                <View
                  style={[
                    styles.iconContainer,
                    {
                      backgroundColor: 'rgba(0, 174, 239, 0.15)', 
                      borderRadius: theme.borderRadius.md,
                    },
                  ]}
                >
                  {iconName}
                </View>
              </View>
            )}

            <View style={styles.textWrapper}>
              <Text
                style={[
                  styles.titleText,
                  {
                    color: theme.colors.text.primary,
                    fontFamily: theme.typography.fontFamily.semiBold,
                    fontSize: theme.typography.fontSize.lg,
                    textShadowColor: 'rgba(0, 0, 0, 0.1)',
                    textShadowOffset: { width: 0, height: 1 },
                    textShadowRadius: 2,
                  },
                ]}
              >
                {title}
              </Text>
              <Text
                style={[
                  styles.descText,
                  {
                    color: theme.colors.text.secondary,
                    fontFamily: theme.typography.fontFamily.regular,
                    fontSize: theme.typography.fontSize.md,
                    lineHeight: 20,
                    opacity: 0.9,
                  },
                ]}
              >
                {description}
              </Text>
            </View>
          </View>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerWrapper: {
    marginVertical: 12,
    marginHorizontal: 20,
    // Sombra de "resplandor azul"
    shadowColor: '#00AEEF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
    borderRadius: 28,
    overflow: 'hidden',
  },
  blurBackground: {
    borderRadius: 28,
    padding: 2,
    ...Platform.select({
      android: {
        backgroundColor: 'rgba(255,255,255,0.04)',
      },
    }),
  },
  cardContainer: {
    padding: 16,
    // fallback para iOS: "backdropFilter" no es reconocido en RN nativo
    ...Platform.select({
      ios: {
        backdropFilter: 'blur(12px)',
      },
    }),
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    width: 52,
    height: 52,
    marginRight: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconRing: {
    position: 'absolute',
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  iconContainer: {
    width: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textWrapper: {
    flex: 1,
  },
  titleText: {
    marginBottom: 6,
  },
  descText: {
    opacity: 0.95,
  },
});
