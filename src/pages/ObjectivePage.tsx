
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";

const translations = {
  title: {
    en: "Our Objectives",
    fr: "Nos Objectifs",
    es: "Nuestros Objetivos",
  },
  objectives: {
    en: [
      {
        title: "Improve Patient Experience",
        description:
          "We are committed to continuously improving the patient experience by collecting and acting on your valuable feedback.",
      },
      {
        title: "Enhance Care Quality",
        description:
          "Your feedback helps us identify areas of strength and areas where we can enhance the quality of care provided.",
      },
      {
        title: "Streamline Processes",
        description:
          "We use your insights to streamline our processes and reduce waiting times throughout the healthcare journey.",
      },
      {
        title: "Staff Development",
        description:
          "Your feedback contributes to our staff training and development programs to ensure compassionate care.",
      },
      {
        title: "Informed Decision Making",
        description:
          "Patient feedback is integral to our decision-making process at all levels of the organization.",
      },
    ],
    fr: [
      {
        title: "Améliorer l'expérience du patient",
        description:
          "Nous nous engageons à améliorer continuellement l'expérience du patient en recueillant et en agissant sur vos précieux commentaires.",
      },
      {
        title: "Améliorer la qualité des soins",
        description:
          "Vos commentaires nous aident à identifier les points forts et les domaines où nous pouvons améliorer la qualité des soins fournis.",
      },
      {
        title: "Simplifier les processus",
        description:
          "Nous utilisons vos idées pour simplifier nos processus et réduire les temps d'attente tout au long du parcours de soins.",
      },
      {
        title: "Développement du personnel",
        description:
          "Vos commentaires contribuent à nos programmes de formation et de développement du personnel pour assurer des soins compatissants.",
      },
      {
        title: "Prise de décision éclairée",
        description:
          "Les commentaires des patients font partie intégrante de notre processus de prise de décision à tous les niveaux de l'organisation.",
      },
    ],
    es: [
      {
        title: "Mejorar la experiencia del paciente",
        description:
          "Estamos comprometidos a mejorar continuamente la experiencia del paciente recopilando y actuando según sus valiosos comentarios.",
      },
      {
        title: "Mejorar la calidad de la atención",
        description:
          "Sus comentarios nos ayudan a identificar áreas de fortaleza y áreas donde podemos mejorar la calidad de la atención brindada.",
      },
      {
        title: "Optimizar procesos",
        description:
          "Usamos sus ideas para optimizar nuestros procesos y reducir los tiempos de espera a lo largo del proceso de atención médica.",
      },
      {
        title: "Desarrollo del personal",
        description:
          "Sus comentarios contribuyen a nuestros programas de capacitación y desarrollo del personal para garantizar una atención compasiva.",
      },
      {
        title: "Toma de decisiones informada",
        description:
          "Los comentarios de los pacientes son parte integral de nuestro proceso de toma de decisiones en todos los niveles de la organización.",
      },
    ],
  },
};

export default function ObjectivePage() {
  const { language } = useTheme();

  const currentObjectives =
    translations.objectives[language as keyof typeof translations.objectives];

  return (
    <div className="space-y-6 p-2">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          {translations.title[language as keyof typeof translations.title]}
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {currentObjectives.map((objective, index) => (
          <Card key={index} className="bg-white dark:bg-card border border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-medfeedback-blue">
                {objective.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                {objective.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
