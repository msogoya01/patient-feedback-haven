
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFeedback } from '@/contexts/FeedbackContext';
import { useTheme } from '@/contexts/ThemeContext';
import { ArrowRight } from 'lucide-react';

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
  const navigate = useNavigate();

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
      console.log("No departments selected");
      return;
    }
    navigate('/feedback');
  };

  return (
    <div className="flex flex-col h-full p-4 bg-white">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          {translations.title[language as keyof typeof translations.title]}
        </h1>
        <p className="text-gray-600">
          {translations.subtitle[language as keyof typeof translations.subtitle]}
        </p>
      </div>

      <div className="flex-1 overflow-auto">
        {departments.map((department) => (
          <div
            key={department.id}
            className={`border rounded-lg p-4 mb-3 cursor-pointer transition-colors ${
              selectedDepartments.some(d => d.id === department.id)
                ? 'bg-purple-50 border-purple-500'
                : 'border-gray-200'
            }`}
            onClick={() => handleDepartmentToggle(department)}
          >
            <div className="flex items-center">
              <span className="text-gray-800">
                {translations.departmentNames[language as keyof typeof translations.departmentNames][department.id as keyof typeof translations.departmentNames.en]}
              </span>
            </div>
          </div>
        ))}
      </div>

      <button
        className="bg-purple-500 text-white flex items-center justify-center py-4 px-6 rounded-lg mt-4"
        onClick={handleContinue}
      >
        <span className="font-semibold">
          {translations.continueButton[language as keyof typeof translations.continueButton]}
        </span>
        <ArrowRight className="ml-2" size={20} />
      </button>
    </div>
  );
}
