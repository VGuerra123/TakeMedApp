import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Header } from '@/components/Header';
import { Pill as Pills, Clock, Plus } from 'lucide-react-native';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

interface Medicamento {
  id: string;
  nombre: string;
  dosis: string;
  horario: string;
  activo: boolean;
}

export default function MedicamentosScreen() {
  const theme = useTheme();
  const [medicamentos, setMedicamentos] = useState<Medicamento[]>([
    {
      id: '1',
      nombre: 'Paracetamol',
      dosis: '500mg',
      horario: '08:00,20:00',
      activo: true,
    },
    {
      id: '2',
      nombre: 'Ibuprofeno',
      dosis: '400mg',
      horario: '14:00',
      activo: true,
    },
  ]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nuevoMedicamento, setNuevoMedicamento] = useState({
    nombre: '',
    dosis: '',
    horario: '',
  });

  const agregarMedicamento = () => {
    if (nuevoMedicamento.nombre && nuevoMedicamento.dosis && nuevoMedicamento.horario) {
      setMedicamentos([
        ...medicamentos,
        {
          id: Date.now().toString(),
          ...nuevoMedicamento,
          activo: true,
        },
      ]);
      setNuevoMedicamento({ nombre: '', dosis: '', horario: '' });
      setMostrarFormulario(false);
    }
  };

  const toggleMedicamento = (id: string) => {
    setMedicamentos(
      medicamentos.map((med) =>
        med.id === id ? { ...med, activo: !med.activo } : med
      )
    );
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Medicamentos" 
        subtitle="Control de tu medicación"
      />
      
      <ScrollView style={styles.content}>
        {medicamentos.map((medicamento) => (
          <TouchableOpacity
            key={medicamento.id}
            onPress={() => toggleMedicamento(medicamento.id)}
            style={[
              styles.medicamentoCard,
              {
                backgroundColor: theme.colors.cardBackground,
                borderRadius: theme.borderRadius.lg,
                opacity: medicamento.activo ? 1 : 0.6,
                ...theme.shadow.sm,
              },
            ]}
          >
            <View style={styles.medicamentoHeader}>
              <View style={styles.iconContainer}>
                <Pills size={24} color={theme.colors.primary} />
              </View>
              <View style={styles.medicamentoInfo}>
                <Text
                  style={[
                    styles.medicamentoNombre,
                    {
                      color: theme.colors.text.primary,
                      fontFamily: theme.typography.fontFamily.semiBold,
                      fontSize: theme.typography.fontSize.lg,
                    },
                  ]}
                >
                  {medicamento.nombre}
                </Text>
                <Text
                  style={[
                    styles.medicamentoDosis,
                    {
                      color: theme.colors.text.secondary,
                      fontFamily: theme.typography.fontFamily.regular,
                      fontSize: theme.typography.fontSize.md,
                    },
                  ]}
                >
                  {medicamento.dosis}
                </Text>
              </View>
            </View>
            <View style={styles.horarioContainer}>
              <Clock size={16} color={theme.colors.text.muted} />
              <Text
                style={[
                  styles.horarioText,
                  {
                    color: theme.colors.text.muted,
                    fontFamily: theme.typography.fontFamily.regular,
                    fontSize: theme.typography.fontSize.sm,
                    marginLeft: 4,
                  },
                ]}
              >
                {medicamento.horario}
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        {mostrarFormulario && (
          <View
            style={[
              styles.formulario,
              {
                backgroundColor: theme.colors.cardBackground,
                borderRadius: theme.borderRadius.lg,
                ...theme.shadow.sm,
              },
            ]}
          >
            <TextInput
              placeholder="Nombre del medicamento"
              value={nuevoMedicamento.nombre}
              onChangeText={(text) =>
                setNuevoMedicamento({ ...nuevoMedicamento, nombre: text })
              }
              style={[
                styles.input,
                {
                  color: theme.colors.text.primary,
                  fontFamily: theme.typography.fontFamily.regular,
                },
              ]}
            />
            <TextInput
              placeholder="Dosis (ej: 500mg)"
              value={nuevoMedicamento.dosis}
              onChangeText={(text) =>
                setNuevoMedicamento({ ...nuevoMedicamento, dosis: text })
              }
              style={[
                styles.input,
                {
                  color: theme.colors.text.primary,
                  fontFamily: theme.typography.fontFamily.regular,
                },
              ]}
            />
            <TextInput
              placeholder="Horario (ej: 08:00,20:00)"
              value={nuevoMedicamento.horario}
              onChangeText={(text) =>
                setNuevoMedicamento({ ...nuevoMedicamento, horario: text })
              }
              style={[
                styles.input,
                {
                  color: theme.colors.text.primary,
                  fontFamily: theme.typography.fontFamily.regular,
                },
              ]}
            />
            <TouchableOpacity
              onPress={agregarMedicamento}
              style={[
                styles.botonAgregar,
                { backgroundColor: theme.colors.primary },
              ]}
            >
              <Text
                style={[
                  styles.botonTexto,
                  {
                    color: theme.colors.text.light,
                    fontFamily: theme.typography.fontFamily.semiBold,
                  },
                ]}
              >
                Agregar Medicamento
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          onPress={() => setMostrarFormulario(!mostrarFormulario)}
          style={[
            styles.botonNuevo,
            {
              backgroundColor: theme.colors.primary,
              borderRadius: theme.borderRadius.full,
            },
          ]}
        >
          <Plus size={24} color={theme.colors.text.light} />
        </TouchableOpacity>

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
  medicamentoCard: {
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 16,
  },
  medicamentoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 12,
  },
  medicamentoInfo: {
    flex: 1,
  },
  medicamentoNombre: {
    marginBottom: 4,
  },
  medicamentoDosis: {
    marginBottom: 8,
  },
  horarioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  horarioText: {
    marginLeft: 8,
  },
  formulario: {
    margin: 20,
    padding: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
  },
  botonAgregar: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  botonTexto: {
    fontSize: 16,
  },
  botonNuevo: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
});