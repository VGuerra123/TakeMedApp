import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Animated,
  Easing,
  Dimensions,
  Platform,
  Text,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/context/ThemeContext';
import Logo from '../assets/images/icon.png';

const { width } = Dimensions.get('window');

export default function LoadingScreen() {
  const theme = useTheme();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 6,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(progressAnim, {
          toValue: 1,
          duration: 3000,
          easing: Easing.out(Easing.exp),
          useNativeDriver: false,
        }),
        Animated.loop(
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 2000,
            easing: Easing.linear,
            useNativeDriver: true,
          })
        ),
        Animated.loop(
          Animated.sequence([
            Animated.timing(pulseAnim, {
              toValue: 1.15,
              duration: 700,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
              toValue: 1,
              duration: 700,
              easing: Easing.inOut(Easing.ease),
              useNativeDriver: true,
            }),
          ])
        ),
      ]),
    ]).start();

    const timer = setTimeout(() => {
      router.replace('/(tabs)');
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width * 0.8],
  });

  return (
    <LinearGradient
      colors={['#00D4FF', '#2A7BFF', '#6A00FF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.logoWrapper,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <View style={styles.ringContainer}>
          <Animated.View
            style={[
              styles.rotatingRing,
              {
                transform: [{ rotate: rotateInterpolate }, { scale: pulseAnim }],
                borderColor: 'rgba(255,255,255,0.35)',
              },
            ]}
          />
          <View style={styles.logoCircle}>
            <Image source={Logo} style={styles.logoImage} resizeMode="contain" />
            <Animated.View
              style={[
                styles.innerGlow,
                {
                  opacity: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.5],
                  }),
                  transform: [{
                    scale: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.2] })
                  }],
                },
              ]}
            />
          </View>
        </View>
        <Animated.Text
          style={[
            styles.tagline,
            {
              fontFamily: theme.typography.fontFamily.regular,
              opacity: fadeAnim,
            },
          ]}
        >
          Tu salud, nuestra prioridad
        </Animated.Text>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBackground}>
            <Animated.View
              style={[
                styles.progressFill,
                { width: progressWidth },
              ]}
            >
              <LinearGradient
                colors={['#FFFFFFEE', '#FFFFFF55']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={StyleSheet.absoluteFill}
              />
            </Animated.View>
          </View>
        </View>
      </Animated.View>
    </LinearGradient>
  );
}

const CIRCLE_SIZE = 180;
const ringSize = CIRCLE_SIZE + 36;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoWrapper: {
    alignItems: 'center'
  },
  ringContainer: {
    width: ringSize,
    height: ringSize,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rotatingRing: {
    position: 'absolute',
    width: ringSize,
    height: ringSize,
    borderRadius: ringSize / 2,
    borderWidth: 4
  },
  logoCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: 'rgba(255,255,255,0.97)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00000055',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.32,
    shadowRadius: 12,
    elevation: 12,
  },
  logoImage: {
    width: 80,
    height: 80,
    borderRadius: 20
  },
  innerGlow: {
    position: 'absolute',
    width: CIRCLE_SIZE * 0.9,
    height: CIRCLE_SIZE * 0.9,
    borderRadius: (CIRCLE_SIZE * 0.9) / 2,
    backgroundColor: '#FFFFFF44',
  },
  tagline: {
    marginTop: 32,
    fontSize: 18,
    color: 'rgba(255,255,255,0.95)',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8
  },
  progressBarContainer: {
    marginTop: 36,
    width: width * 0.8,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.3)',
    overflow: 'hidden',
    ...Platform.select({
      android: {
        elevation: 5
      }
    })
  },
  progressBackground: {
    width: '100%',
    height: 10,
    borderRadius: 5,
    overflow: 'hidden'
  },
  progressFill: {
    height: 10,
    borderRadius: 5
  }
});
