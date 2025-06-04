import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Activity } from 'lucide-react-native';
import { BlurView } from 'expo-blur';

interface StepCounterProps {
  steps: number;
}

export function StepCounter({ steps }: StepCounterProps) {
  const theme = useTheme();
  const goalSteps = 10000;
  const progressPercentage = Math.min((steps / goalSteps) * 100, 100);

  return (
    <View style={styles.outerContainer}>
      <BlurView intensity={60} tint="light" style={styles.blurWrapper}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: 'rgba(255, 255, 255, 0.07)',
              borderRadius: theme.borderRadius.lg,
              borderColor: 'rgba(255, 255, 255, 0.12)',
              borderWidth: 1,
            },
          ]}
        >
          {/* Header con ícono */}
          <View style={styles.headerRow}>
            <View style={styles.iconCircle}>
              <Activity size={22} color={theme.colors.primary} />
            </View>
            <Text
              style={[
                styles.title,
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
              Actividad Diaria
            </Text>
          </View>

          {/* Número de pasos */}
          <View style={styles.stepsContainer}>
            <Text
              style={[
                styles.stepsCount,
                {
                  color: theme.colors.primary,
                  fontFamily: theme.typography.fontFamily.bold,
                  fontSize: theme.typography.fontSize.xxxl,
                  textShadowColor: 'rgba(0, 200, 255, 0.2)',
                  textShadowOffset: { width: 0, height: 1 },
                  textShadowRadius: 3,
                },
              ]}
            >
              {steps.toLocaleString()}
            </Text>
            <Text
              style={[
                styles.stepsLabel,
                {
                  color: theme.colors.text.secondary,
                  fontFamily: theme.typography.fontFamily.regular,
                  fontSize: theme.typography.fontSize.md,
                },
              ]}
            >
              pasos
            </Text>
          </View>

          {/* Barra de progreso */}
          <View style={styles.progressContainer}>
            <View
              style={[
                styles.progressBackground,
                {
                  backgroundColor: 'rgba(0, 200, 255, 0.1)',
                  borderRadius: theme.borderRadius.full,
                },
              ]}
            >
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${progressPercentage}%`,
                    backgroundColor: theme.colors.primary,
                    borderRadius: theme.borderRadius.full,
                    shadowColor: theme.colors.primary,
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0.3,
                    shadowRadius: 6,
                  },
                ]}
              />
            </View>
            <Text
              style={[
                styles.goalText,
                {
                  color: theme.colors.text.muted,
                  fontFamily: theme.typography.fontFamily.regular,
                  fontSize: theme.typography.fontSize.sm,
                },
              ]}
            >
              Meta: {goalSteps.toLocaleString()} pasos
            </Text>
          </View>
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    marginHorizontal: 20,
    marginVertical: 12,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#00D9FF',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 12,
  },
  blurWrapper: {
    borderRadius: 20,
    padding: 2,
    ...Platform.select({
      android: {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
      },
    }),
  },
  container: {
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 200, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  title: {
    marginLeft: 4,
  },
  stepsContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  stepsCount: {
    textAlign: 'center',
    marginBottom: 2,
  },
  stepsLabel: {
    textAlign: 'center',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBackground: {
    height: 12,
    width: '100%',
    marginBottom: 8,
  },
  progressFill: {
    height: 12,
  },
  goalText: {
    textAlign: 'right',
  },
});
