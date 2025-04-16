
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useFeedback } from "@/contexts/FeedbackContext";
import { useTheme } from "@/contexts/ThemeContext";
import { FiArrowRight } from "react-icons/fi";
import { useToast } from "@/components/ui/use-toast";

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
  const { toast } = useToast();

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
      toast({
        title: translations.noSelectionError[language as keyof typeof translations.noSelectionError],
        description: translations.selectionErrorDesc[language as keyof typeof translations.selectionErrorDesc],
        variant: "destructive",
      });
      return;
    }
    navigate("/feedback");
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {translations.title[language as keyof typeof translations.title]}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          {translations.subtitle[language as keyof typeof translations.subtitle]}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {departments.map((department) => (
          <Card
            key={department.id}
            className={`hover:shadow-md transition-shadow cursor-pointer border border-border ${
              selectedDepartments.some(d => d.id === department.id) 
                ? 'bg-medfeedback-blue/10 border-medfeedback-blue'
                : ''
            }`}
            onClick={() => handleDepartmentToggle(department)}
          >
            <CardContent className="p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Checkbox
                  checked={selectedDepartments.some(d => d.id === department.id)}
                  onCheckedChange={() => handleDepartmentToggle(department)}
                />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {translations.departmentNames[language as keyof typeof translations.departmentNames][department.id as keyof typeof translations.departmentNames.en]}
                </h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        <Button
          className="flex items-center justify-center bg-medfeedback-blue hover:bg-medfeedback-blue/90 text-white"
          onClick={handleContinue}
        >
          {translations.continueButton[language as keyof typeof translations.continueButton]} <FiArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
}
