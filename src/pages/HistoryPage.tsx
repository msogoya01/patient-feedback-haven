
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useFeedback } from "@/contexts/FeedbackContext";
import { useTheme } from "@/contexts/ThemeContext";
import { FiClock, FiMessageSquare } from "react-icons/fi";

const translations = {
  title: {
    en: "Feedback History",
    fr: "Historique des Commentaires",
    es: "Historial de Comentarios",
  },
  noHistory: {
    en: "You haven't submitted any feedback yet",
    fr: "Vous n'avez pas encore soumis de commentaires",
    es: "Aún no has enviado ningún comentario",
  },
  provideFeedback: {
    en: "Provide Feedback",
    fr: "Donner un Avis",
    es: "Proporcionar Comentarios",
  },
  department: {
    en: "Department",
    fr: "Service",
    es: "Departamento",
  },
  submitted: {
    en: "Submitted",
    fr: "Soumis",
    es: "Enviado",
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

export default function HistoryPage() {
  const { responses, departments } = useFeedback();
  const { language } = useTheme();
  const navigate = useNavigate();

  // Group responses by department and date
  const groupedResponses: {
    [key: string]: {
      departmentId: string;
      date: Date;
      count: number;
    };
  } = {};

  responses.forEach((response) => {
    const dateKey = response.timestamp.toISOString().split("T")[0];
    const key = `${response.departmentId}-${dateKey}`;

    if (!groupedResponses[key]) {
      groupedResponses[key] = {
        departmentId: response.departmentId,
        date: response.timestamp,
        count: 0,
      };
    }

    groupedResponses[key].count += 1;
  });

  // Convert to array and sort by date (most recent first)
  const historyItems = Object.values(groupedResponses).sort(
    (a, b) => b.date.getTime() - a.date.getTime()
  );

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(
      language === "en" ? "en-US" : language === "fr" ? "fr-FR" : "es-ES",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    ).format(date);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        {translations.title[language as keyof typeof translations.title]}
      </h1>

      {historyItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <FiMessageSquare className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {translations.noHistory[language as keyof typeof translations.noHistory]}
          </p>
          <Button
            className="bg-medfeedback-blue hover:bg-medfeedback-blue/90 text-white"
            onClick={() => navigate("/departments")}
          >
            {translations.provideFeedback[language as keyof typeof translations.provideFeedback]}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {historyItems.map((item, index) => {
            const department = departments.find((d) => d.id === item.departmentId);
            
            return (
              <Card key={index} className="border border-border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">
                        {translations.department[language as keyof typeof translations.department]}:{" "}
                        <span className="text-medfeedback-blue">
                          {department
                            ? translations.departmentNames[
                                language as keyof typeof translations.departmentNames
                              ][department.id as keyof typeof translations.departmentNames.en]
                            : "Unknown"}
                        </span>
                      </h3>
                      <div className="flex items-center mt-2 text-sm text-gray-500 dark:text-gray-400">
                        <FiClock className="mr-1 h-4 w-4" />
                        <span>
                          {translations.submitted[language as keyof typeof translations.submitted]}: {formatDate(item.date)}
                        </span>
                      </div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-full h-8 w-8 flex items-center justify-center">
                      <span className="text-sm font-medium">
                        {item.count}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
