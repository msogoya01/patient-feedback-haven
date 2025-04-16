
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTheme } from "@/contexts/ThemeContext";
import { FiBell } from "react-icons/fi";

const translations = {
  title: {
    en: "Notifications",
    fr: "Notifications",
    es: "Notificaciones",
  },
  noNotifications: {
    en: "You have no notifications",
    fr: "Vous n'avez pas de notifications",
    es: "No tienes notificaciones",
  },
  today: {
    en: "Today",
    fr: "Aujourd'hui",
    es: "Hoy",
  },
  earlier: {
    en: "Earlier",
    fr: "Plus tôt",
    es: "Anteriores",
  },
  notifications: {
    en: [
      {
        id: "1",
        title: "Feedback Received",
        message: "Thank you for your recent feedback on our Emergency department.",
        date: "Today, 10:30 AM",
        isNew: true,
      },
      {
        id: "2",
        title: "New Survey Available",
        message: "A new satisfaction survey is available for your recent visit.",
        date: "Today, 08:45 AM",
        isNew: true,
      },
      {
        id: "3",
        title: "Changes Based on Your Feedback",
        message: "We've made improvements to our services based on patient feedback.",
        date: "Yesterday, 02:15 PM",
        isNew: false,
      },
      {
        id: "4",
        title: "Feedback Summary",
        message: "View a summary of how your feedback has helped us improve.",
        date: "3 days ago",
        isNew: false,
      },
    ],
    fr: [
      {
        id: "1",
        title: "Retour Reçu",
        message: "Merci pour votre récent retour sur notre service d'urgence.",
        date: "Aujourd'hui, 10:30",
        isNew: true,
      },
      {
        id: "2",
        title: "Nouveau Sondage Disponible",
        message: "Un nouveau sondage de satisfaction est disponible pour votre récente visite.",
        date: "Aujourd'hui, 08:45",
        isNew: true,
      },
      {
        id: "3",
        title: "Changements Basés sur Vos Commentaires",
        message: "Nous avons apporté des améliorations à nos services basées sur les commentaires des patients.",
        date: "Hier, 14:15",
        isNew: false,
      },
      {
        id: "4",
        title: "Résumé des Commentaires",
        message: "Consultez un résumé de la façon dont vos commentaires nous ont aidés à nous améliorer.",
        date: "Il y a 3 jours",
        isNew: false,
      },
    ],
    es: [
      {
        id: "1",
        title: "Comentarios Recibidos",
        message: "Gracias por sus recientes comentarios sobre nuestro departamento de Emergencias.",
        date: "Hoy, 10:30",
        isNew: true,
      },
      {
        id: "2",
        title: "Nueva Encuesta Disponible",
        message: "Una nueva encuesta de satisfacción está disponible para su visita reciente.",
        date: "Hoy, 08:45",
        isNew: true,
      },
      {
        id: "3",
        title: "Cambios Basados en Sus Comentarios",
        message: "Hemos realizado mejoras en nuestros servicios basados en los comentarios de los pacientes.",
        date: "Ayer, 14:15",
        isNew: false,
      },
      {
        id: "4",
        title: "Resumen de Comentarios",
        message: "Vea un resumen de cómo sus comentarios nos han ayudado a mejorar.",
        date: "Hace 3 días",
        isNew: false,
      },
    ],
  },
};

export default function NotificationsPage() {
  const { language } = useTheme();

  const notifications = 
    translations.notifications[language as keyof typeof translations.notifications];

  const todayNotifications = notifications.filter(
    (notification) => notification.date.includes("Today") || 
                      notification.date.includes("Aujourd'hui") || 
                      notification.date.includes("Hoy")
  );

  const earlierNotifications = notifications.filter(
    (notification) => !notification.date.includes("Today") && 
                      !notification.date.includes("Aujourd'hui") && 
                      !notification.date.includes("Hoy")
  );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        {translations.title[language as keyof typeof translations.title]}
      </h1>

      {notifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <FiBell className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-gray-600 dark:text-gray-300">
            {translations.noNotifications[language as keyof typeof translations.noNotifications]}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {todayNotifications.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {translations.today[language as keyof typeof translations.today]}
              </h2>
              {todayNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`border ${
                    notification.isNew
                      ? "border-l-4 border-l-medfeedback-blue"
                      : "border"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {notification.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                          {notification.message}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {notification.date}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {earlierNotifications.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {translations.earlier[language as keyof typeof translations.earlier]}
              </h2>
              {earlierNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`border ${
                    notification.isNew
                      ? "border-l-4 border-l-medfeedback-blue"
                      : "border"
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {notification.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
                          {notification.message}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {notification.date}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
