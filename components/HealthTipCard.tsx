import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';

interface HealthTipCardProps {
  title: string;
  description: string;
  iconName?: React.ReactNode;
}

export function HealthTipCard({ title, description, iconName }: HealthTipCardProps) {
  const theme = useTheme();
  
  return (
    <View 
      style={[
        styles.container, 
        { 
          backgroundColor: theme.colors.cardBackground,
          borderRadius: theme.borderRadius.lg,
          ...theme.shadow.sm
        }
      ]}
    >
      <View style={styles.contentContainer}>
        {iconName && (
          <View 
            style={[
              styles.iconContainer, 
              { 
                backgroundColor: 'rgba(0, 71, 171, 0.1)',
                borderRadius: theme.borderRadius.md,
              }
            ]}
          >
            {iconName}
          </View>
        )}
        <View style={styles.textContainer}>
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
            {title}
          </Text>
          <Text 
            style={[
              styles.description, 
              { 
                color: theme.colors.text.secondary,
                fontFamily: theme.typography.fontFamily.regular,
                fontSize: theme.typography.fontSize.sm,
              }
            ]}
          >
            {description}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 20,
    padding: 16,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 4,
  },
  description: {
    lineHeight: 20,
  },
});