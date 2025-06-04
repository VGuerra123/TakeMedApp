import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Activity } from 'lucide-react-native';

interface StepCounterProps {
  steps: number;
}

export function StepCounter({ steps }: StepCounterProps) {
  const theme = useTheme();
  
  const goalSteps = 10000;
  const progressPercentage = Math.min(steps / goalSteps * 100, 100);
  
  return (
    <View 
      style={[
        styles.container, 
        { 
          backgroundColor: theme.colors.cardBackground,
          borderRadius: theme.borderRadius.lg,
          ...theme.shadow.md
        }
      ]}
    >
      <View style={styles.headerRow}>
        <Activity size={22} color={theme.colors.primary} />
        <Text 
          style={[
            styles.title, 
            { 
              color: theme.colors.text.primary,
              fontFamily: theme.typography.fontFamily.semiBold,
              fontSize: theme.typography.fontSize.md,
            }
          ]}
        >
          Actividad Diaria
        </Text>
      </View>
      
      <View style={styles.stepsContainer}>
        <Text 
          style={[
            styles.stepsCount, 
            { 
              color: theme.colors.primary,
              fontFamily: theme.typography.fontFamily.bold,
              fontSize: theme.typography.fontSize.xxxl,
            }
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
            }
          ]}
        >
          pasos
        </Text>
      </View>
      
      <View style={styles.progressContainer}>
        <View 
          style={[
            styles.progressBackground, 
            { 
              backgroundColor: 'rgba(0, 71, 171, 0.1)',
              borderRadius: theme.borderRadius.full 
            }
          ]}
        >
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${progressPercentage}%`,
                backgroundColor: theme.colors.primary,
                borderRadius: theme.borderRadius.full 
              }
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
            }
          ]}
        >
          Meta: {goalSteps.toLocaleString()} pasos
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    marginLeft: 8,
  },
  stepsContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  stepsCount: {
    textAlign: 'center',
    marginBottom: 4,
  },
  stepsLabel: {
    textAlign: 'center',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBackground: {
    height: 10,
    width: '100%',
    marginBottom: 8,
  },
  progressFill: {
    height: 10,
  },
  goalText: {
    textAlign: 'right',
  },
});