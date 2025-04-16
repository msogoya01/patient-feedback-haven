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
      "2": "Outpatient Clinic",
      "3": "Inpatient Clinic",
      "4": "Radiology",
      "5": "Laboratory",
      "6": "Pharmacy",
      "7": "Billing",
      "8": "Mortuary",
      "9": "Maternity",
      "10": "Immunization",
    },
    fr: {
      "1": "Urgences",
      "2": "Clinique Externe",
      "3": "Clinique Interne",
      "4": "Radiologie",
      "5": "Laboratoire",
      "6": "Pharmacie",
      "7": "Facturation",
      "8": "Morgue",
      "9": "Maternité",
      "10": "Vaccination"
    
    },
    es: {
      "1": "Emergencias",
      "2": "Clínica Ambulatoria",
      "3": "Clínica de Hospitalización",
      "4": "Radiología",
      "5": "Laboratorio",
      "6": "Farmacia",
      "7": "Facturación",
      "8": "Morgue",
      "9": "Maternidad",
      "10": "Inmunización"
    }
    
  },
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
        title: "No departments selected",
        description: "Please select at least one department to provide feedback.",
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
          Continue <FiArrowRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
}
