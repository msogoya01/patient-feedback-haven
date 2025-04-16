
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFeedback } from '@/contexts/FeedbackContext';
import { useTheme } from '@/contexts/ThemeContext';
import { ArrowRight } from 'lucide-react-native';

const translations = {
  title: {
    en: "Select Department",
    fr: "Sélectionner un Service",
    es: "Seleccionar Departamento",
  },
  subtitle: {
    en: "Please select the department you'd like to provide feedback for",
    fr: "Veuillez sélectionner le service pour lequel vous souhaitez donner votre avis",
    es: "Por favor seleccione el departamento para el que le gustaría proporcionar comentarios",
  },
  departmentNames: {
    en: {
      "1": "Emergency",
      "2": "Cardiology",
      "3": "Pediatrics",
      "4": "Oncology",
      "5": "Neurology",
      "6": "Orthopedics",
    },
    fr: {
      "1": "Urgences",
      "2": "Cardiologie",
      "3": "Pédiatrie",
      "4": "Oncologie",
      "5": "Neurologie",
      "6": "Orthopédie",
    },
    es: {
      "1": "Emergencias",
      "2": "Cardiología",
      "3": "Pediatría",
      "4": "Oncología",
      "5": "Neurología",
      "6": "Ortopedia",
    },
  },
  continueButton: {
    en: "Continue",
    fr: "Continuer",
    es: "Continuar",
  },
  noSelectionError: {
    en: "No departments selected",
    fr: "Aucun service sélectionné",
    es: "No hay departamentos seleccionados",
  },
  selectionErrorDesc: {
    en: "Please select at least one department to provide feedback.",
    fr: "Veuillez sélectionner au moins un service pour donner votre avis.",
    es: "Por favor, seleccione al menos un departamento para proporcionar comentarios.",
  }
};

export default function DepartmentsPage() {
  const { departments, selectedDepartments, setSelectedDepartments } = useFeedback();
  const { language } = useTheme();
  const navigation = useNavigation();

  const handleDepartmentToggle = (department: any) => {
    const isSelected = selectedDepartments.some(d => d.id === department.id);
    if (isSelected) {
      setSelectedDepartments(selectedDepartments.filter(d => d.id !== department.id));
    } else {
      setSelectedDepartments([...selectedDepartments, department]);
    }
  };

  const handleContinue = () => {
    if (selectedDepartments.length === 0) {
      // Show toast using react-native-toast-message
      return;
    }
    navigation.navigate('Feedback');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {translations.title[language as keyof typeof translations.title]}
        </Text>
        <Text style={styles.subtitle}>
          {translations.subtitle[language as keyof typeof translations.subtitle]}
        </Text>
      </View>

      <ScrollView style={styles.departmentList}>
        {departments.map((department) => (
          <TouchableOpacity
            key={department.id}
            style={[
              styles.card,
              selectedDepartments.some(d => d.id === department.id) && styles.selectedCard
            ]}
            onPress={() => handleDepartmentToggle(department)}
          >
            <View style={styles.cardContent}>
              <Text style={styles.departmentName}>
                {translations.departmentNames[language as keyof typeof translations.departmentNames][department.id as keyof typeof translations.departmentNames.en]}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>
          {translations.continueButton[language as keyof typeof translations.continueButton]}
        </Text>
        <ArrowRight color="white" size={20} style={{ marginLeft: 8 }} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  departmentList: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e1e1e1',
  },
  selectedCard: {
    backgroundColor: 'rgba(155, 135, 245, 0.1)',
    borderColor: '#9b87f5',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  departmentName: {
    fontSize: 16,
    color: '#1a1a1a',
    flex: 1,
  },
  continueButton: {
    backgroundColor: '#9b87f5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
