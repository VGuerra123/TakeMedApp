import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Header } from '@/components/Header';
import { HealthTipCard } from '@/components/HealthTipCard';
import { Heart, Utensils, Moon, Coffee, Crop as Drop, Sun } from 'lucide-react-native';

export default function ConsejosScreen() {
  const theme = useTheme();

  const healthTips = [
    {
      id: '1',
      title: 'Mantén tu corazón saludable',
      description: 'Realiza al menos 30 minutos de actividad física moderada 5 días a la semana para mejorar tu salud cardiovascular.',
      icon: <Heart size={24} color={theme.colors.primary} />,
    },
    {
      id: '2',
      title: 'Alimentación balanceada',
      description: 'Consume una dieta rica en frutas, verduras, proteínas magras y grasas saludables. Limita los alimentos procesados.',
      icon: <Utensils size={24} color={theme.colors.primary} />,
    },
    {
      id: '3',
      title: 'Descanso adecuado',
      description: 'Duerme entre 7-8 horas diarias. Un buen descanso mejora tu sistema inmunológico y tu bienestar general.',
      icon: <Moon size={24} color={theme.colors.primary} />,
    },
    {
      id: '4',
      title: 'Hidratación constante',
      description: 'Bebe al menos 2 litros de agua al día. La hidratación adecuada mejora la función cognitiva y la salud de la piel.',
      icon: <Drop size={24} color={theme.colors.primary} />,
    },
    {
      id: '5',
      title: 'Exposición solar moderada',
      description: 'Toma 15 minutos diarios de sol para obtener vitamina D, pero usa protector solar para evitar daños en la piel.',
      icon: <Sun size={24} color={theme.colors.primary} />,
    },
    {
      id: '6',
      title: 'Limita la cafeína',
      description: 'No consumas más de 400mg de cafeína al día (aprox. 4 tazas de café). Evita el consumo después de las 2pm.',
      icon: <Coffee size={24} color={theme.colors.primary} />,
    },
  ];

  return (
    <View style={styles.container}>
      <Header
        title="Consejos de Salud"
        subtitle="Recomendaciones para tu bienestar"
      />

      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.innerScroll}
        showsVerticalScrollIndicator={false}
      >
        <Text
          style={[
            styles.sectionTitle,
            {
              color: theme.colors.text.primary,
              fontFamily: theme.typography.fontFamily.semiBold,
              fontSize: theme.typography.fontSize.xl,
              textShadowColor: 'rgba(0, 0, 0, 0.1)',
              textShadowOffset: { width: 0, height: 1 },
              textShadowRadius: 2,
            },
          ]}
        >
          Recomendaciones Diarias
        </Text>

        {healthTips.map((tip) => (
          <HealthTipCard
            key={tip.id}
            title={tip.title}
            description={tip.description}
            iconName={tip.icon}
          />
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:
      Platform.OS === 'android'
        ? 'rgba(250, 250, 255, 0.96)'
        : 'transparent',
  },
  scrollContent: {
    flex: 1,
    paddingTop: 16,
  },
  innerScroll: {
    paddingBottom: 24,
  },
  sectionTitle: {
    marginHorizontal: 20,
    marginBottom: 12,
    marginTop: 8,
  },
});
