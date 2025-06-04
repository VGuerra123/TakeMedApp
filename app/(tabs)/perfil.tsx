import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Switch } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Header } from '@/components/Header';
import { Moon, Bell, User as User2, CreditCard as Edit2 } from 'lucide-react-native';

export default function PerfilScreen() {
  const theme = useTheme();
  const [editando, setEditando] = useState(false);
  const [perfil, setPerfil] = useState({
    nombre: 'Carlos Rodríguez',
    edad: '35',
    peso: '75',
    altura: '175',
    notificaciones: true,
    modoOscuro: false,
  });

  const guardarCambios = () => {
    setEditando(false);
    // Aquí iría la lógica para guardar los cambios en el backend
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Mi Perfil" 
        subtitle="Gestiona tu información"
      />
      
      <ScrollView style={styles.content}>
        <View 
          style={[
            styles.perfilCard,
            {
              backgroundColor: theme.colors.cardBackground,
              borderRadius: theme.borderRadius.lg,
              ...theme.shadow.sm
            }
          ]}
        >
          <View style={styles.avatarContainer}>
            <View 
              style={[
                styles.avatar,
                {
                  backgroundColor: 'rgba(0, 71, 171, 0.1)',
                  borderRadius: theme.borderRadius.full,
                }
              ]}
            >
              <User2 size={40} color={theme.colors.primary} />
            </View>
            {!editando && (
              <TouchableOpacity
                onPress={() => setEditando(true)}
                style={styles.editButton}
              >
                <Edit2 size={20} color={theme.colors.primary} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.infoContainer}>
            {editando ? (
              <>
                <View style={styles.inputGroup}>
                  <Text 
                    style={[
                      styles.label,
                      {
                        color: theme.colors.text.secondary,
                        fontFamily: theme.typography.fontFamily.regular,
                      }
                    ]}
                  >
                    Nombre
                  </Text>
                  <TextInput
                    value={perfil.nombre}
                    onChangeText={(text) => setPerfil({ ...perfil, nombre: text })}
                    style={[
                      styles.input,
                      {
                        color: theme.colors.text.primary,
                        fontFamily: theme.typography.fontFamily.regular,
                      }
                    ]}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text 
                    style={[
                      styles.label,
                      {
                        color: theme.colors.text.secondary,
                        fontFamily: theme.typography.fontFamily.regular,
                      }
                    ]}
                  >
                    Edad
                  </Text>
                  <TextInput
                    value={perfil.edad}
                    onChangeText={(text) => setPerfil({ ...perfil, edad: text })}
                    keyboardType="numeric"
                    style={[
                      styles.input,
                      {
                        color: theme.colors.text.primary,
                        fontFamily: theme.typography.fontFamily.regular,
                      }
                    ]}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text 
                    style={[
                      styles.label,
                      {
                        color: theme.colors.text.secondary,
                        fontFamily: theme.typography.fontFamily.regular,
                      }
                    ]}
                  >
                    Peso (kg)
                  </Text>
                  <TextInput
                    value={perfil.peso}
                    onChangeText={(text) => setPerfil({ ...perfil, peso: text })}
                    keyboardType="numeric"
                    style={[
                      styles.input,
                      {
                        color: theme.colors.text.primary,
                        fontFamily: theme.typography.fontFamily.regular,
                      }
                    ]}
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text 
                    style={[
                      styles.label,
                      {
                        color: theme.colors.text.secondary,
                        fontFamily: theme.typography.fontFamily.regular,
                      }
                    ]}
                  >
                    Altura (cm)
                  </Text>
                  <TextInput
                    value={perfil.altura}
                    onChangeText={(text) => setPerfil({ ...perfil, altura: text })}
                    keyboardType="numeric"
                    style={[
                      styles.input,
                      {
                        color: theme.colors.text.primary,
                        fontFamily: theme.typography.fontFamily.regular,
                      }
                    ]}
                  />
                </View>

                <TouchableOpacity
                  onPress={guardarCambios}
                  style={[
                    styles.guardarButton,
                    { backgroundColor: theme.colors.primary }
                  ]}
                >
                  <Text 
                    style={[
                      styles.guardarButtonText,
                      {
                        color: theme.colors.text.light,
                        fontFamily: theme.typography.fontFamily.semiBold,
                      }
                    ]}
                  >
                    Guardar Cambios
                  </Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <View style={styles.infoRow}>
                  <Text 
                    style={[
                      styles.infoLabel,
                      {
                        color: theme.colors.text.secondary,
                        fontFamily: theme.typography.fontFamily.regular,
                      }
                    ]}
                  >
                    Nombre:
                  </Text>
                  <Text 
                    style={[
                      styles.infoValue,
                      {
                        color: theme.colors.text.primary,
                        fontFamily: theme.typography.fontFamily.semiBold,
                      }
                    ]}
                  >
                    {perfil.nombre}
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Text 
                    style={[
                      styles.infoLabel,
                      {
                        color: theme.colors.text.secondary,
                        fontFamily: theme.typography.fontFamily.regular,
                      }
                    ]}
                  >
                    Edad:
                  </Text>
                  <Text 
                    style={[
                      styles.infoValue,
                      {
                        color: theme.colors.text.primary,
                        fontFamily: theme.typography.fontFamily.semiBold,
                      }
                    ]}
                  >
                    {perfil.edad} años
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Text 
                    style={[
                      styles.infoLabel,
                      {
                        color: theme.colors.text.secondary,
                        fontFamily: theme.typography.fontFamily.regular,
                      }
                    ]}
                  >
                    Peso:
                  </Text>
                  <Text 
                    style={[
                      styles.infoValue,
                      {
                        color: theme.colors.text.primary,
                        fontFamily: theme.typography.fontFamily.semiBold,
                      }
                    ]}
                  >
                    {perfil.peso} kg
                  </Text>
                </View>

                <View style={styles.infoRow}>
                  <Text 
                    style={[
                      styles.infoLabel,
                      {
                        color: theme.colors.text.secondary,
                        fontFamily: theme.typography.fontFamily.regular,
                      }
                    ]}
                  >
                    Altura:
                  </Text>
                  <Text 
                    style={[
                      styles.infoValue,
                      {
                        color: theme.colors.text.primary,
                        fontFamily: theme.typography.fontFamily.semiBold,
                      }
                    ]}
                  >
                    {perfil.altura} cm
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>

        <View 
          style={[
            styles.configuracionCard,
            {
              backgroundColor: theme.colors.cardBackground,
              borderRadius: theme.borderRadius.lg,
              ...theme.shadow.sm
            }
          ]}
        >
          <Text 
            style={[
              styles.configuracionTitle,
              {
                color: theme.colors.text.primary,
                fontFamily: theme.typography.fontFamily.semiBold,
                fontSize: theme.typography.fontSize.lg,
              }
            ]}
          >
            Configuración
          </Text>

          <View style={styles.configuracionItem}>
            <View style={styles.configuracionItemLeft}>
              <Bell size={20} color={theme.colors.primary} />
              <Text 
                style={[
                  styles.configuracionItemText,
                  {
                    color: theme.colors.text.primary,
                    fontFamily: theme.typography.fontFamily.regular,
                  }
                ]}
              >
                Notificaciones
              </Text>
            </View>
            <Switch
              value={perfil.notificaciones}
              onValueChange={(value) =>
                setPerfil({ ...perfil, notificaciones: value })
              }
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor={perfil.notificaciones ? '#fff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.configuracionItem}>
            <View style={styles.configuracionItemLeft}>
              <Moon size={20} color={theme.colors.primary} />
              <Text 
                style={[
                  styles.configuracionItemText,
                  {
                    color: theme.colors.text.primary,
                    fontFamily: theme.typography.fontFamily.regular,
                  }
                ]}
              >
                Modo Oscuro
              </Text>
            </View>
            <Switch
              value={perfil.modoOscuro}
              onValueChange={(value) =>
                setPerfil({ ...perfil, modoOscuro: value })
              }
              trackColor={{ false: '#767577', true: theme.colors.primary }}
              thumbColor={perfil.modoOscuro ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Espacio para evitar que la barra de navegación oculte contenido */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: 20,
  },
  perfilCard: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 8,
  },
  infoContainer: {
    marginTop: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  infoLabel: {
    flex: 1,
  },
  infoValue: {
    flex: 1,
    textAlign: 'right',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  guardarButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  guardarButtonText: {
    fontSize: 16,
  },
  configuracionCard: {
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 20,
  },
  configuracionTitle: {
    marginBottom: 20,
  },
  configuracionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  configuracionItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  configuracionItemText: {
    marginLeft: 12,
  },
});