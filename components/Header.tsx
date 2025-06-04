import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const theme = useTheme();
  
  return (
    <LinearGradient
      colors={[theme.colors.gradient.start, theme.colors.gradient.end]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContent}>
          <View>
            <Text 
              style={[
                styles.title, 
                { 
                  color: theme.colors.text.light,
                  fontFamily: theme.typography.fontFamily.bold,
                  fontSize: theme.typography.fontSize.xxl,
                }
              ]}
            >
              {title}
            </Text>
            {subtitle && (
              <Text 
                style={[
                  styles.subtitle, 
                  { 
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontFamily: theme.typography.fontFamily.regular,
                    fontSize: theme.typography.fontSize.md,
                  }
                ]}
              >
                {subtitle}
              </Text>
            )}
          </View>
          <View style={styles.logoContainer}>
            <Text 
              style={[
                styles.logoText, 
                { 
                  color: theme.colors.primary,
                  fontFamily: theme.typography.fontFamily.bold 
                }
              ]}
            >
              TM
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 0 : 40,
  },
  safeArea: {
    paddingTop: Platform.OS === 'android' ? 10 : 0,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    opacity: 0.9,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  logoText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});