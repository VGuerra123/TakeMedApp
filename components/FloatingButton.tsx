import React, { useRef } from 'react';
import { TouchableOpacity, StyleSheet, Animated, Text, View } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { BlurView } from 'expo-blur';

interface FloatingButtonProps {
  icon?: React.ReactNode;
  text: string;
  onPress: () => void;
  style?: object;
}

export function FloatingButton({ icon, text, onPress, style }: FloatingButtonProps) {
  const theme = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      friction: 4,
      tension: 100,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.container,
        { transform: [{ scale: scaleAnim }] },
        style
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.9}
        style={[
          styles.button,
          {
            backgroundColor: theme.colors.primary,
            borderRadius: theme.borderRadius.full,
          }
        ]}
      >
        <View style={styles.contentContainer}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text 
            style={[
              styles.text, 
              { 
                color: theme.colors.text.light,
                fontFamily: theme.typography.fontFamily.semiBold,
                fontSize: theme.typography.fontSize.md,
              }
            ]}
          >
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    height: 56,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
  text: {
    textAlign: 'center',
  },
});