
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { FiMoon, FiSun, FiGlobe, FiLogOut } from "react-icons/fi";

const translations = {
  title: {
    en: "Settings",
    fr: "Paramètres",
    es: "Configuración",
  },
  appearance: {
    en: "Appearance",
    fr: "Apparence",
    es: "Apariencia",
  },
  darkMode: {
    en: "Dark Mode",
    fr: "Mode Sombre",
    es: "Modo Oscuro",
  },
  language: {
    en: "Language",
    fr: "Langue",
    es: "Idioma",
  },
  english: {
    en: "English",
    fr: "Anglais",
    es: "Inglés",
  },
  french: {
    en: "French",
    fr: "Français",
    es: "Francés",
  },
  spanish: {
    en: "Spanish",
    fr: "Espagnol",
    es: "Español",
  },
  account: {
    en: "Account",
    fr: "Compte",
    es: "Cuenta",
  },
  mrnNumber: {
    en: "MRN Number",
    fr: "Numéro MRN",
    es: "Número MRN",
  },
  signOut: {
    en: "Sign Out",
    fr: "Déconnexion",
    es: "Cerrar Sesión",
  },
  about: {
    en: "About",
    fr: "À propos",
    es: "Acerca de",
  },
  version: {
    en: "Version",
    fr: "Version",
    es: "Versión",
  },
};

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme, language, setLanguage } = useTheme();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        {translations.title[language as keyof typeof translations.title]}
      </h1>

      <div className="space-y-6">
        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              {translations.appearance[language as keyof typeof translations.appearance]}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {theme === "dark" ? (
                  <FiMoon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <FiSun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                )}
                <Label htmlFor="dark-mode">
                  {translations.darkMode[language as keyof typeof translations.darkMode]}
                </Label>
              </div>
              <Switch
                id="dark-mode"
                checked={theme === "dark"}
                onCheckedChange={toggleTheme}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center">
              <FiGlobe className="mr-2 h-5 w-5 text-gray-600 dark:text-gray-400" />
              {translations.language[language as keyof typeof translations.language]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={language}
              onValueChange={(value) => setLanguage(value as "en" | "fr" | "es")}
              className="space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="en" id="language-en" />
                <Label htmlFor="language-en">
                  {translations.english[language as keyof typeof translations.english]}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fr" id="language-fr" />
                <Label htmlFor="language-fr">
                  {translations.french[language as keyof typeof translations.french]}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="es" id="language-es" />
                <Label htmlFor="language-es">
                  {translations.spanish[language as keyof typeof translations.spanish]}
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              {translations.account[language as keyof typeof translations.account]}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label className="text-sm text-gray-500 dark:text-gray-400">
                {translations.mrnNumber[language as keyof typeof translations.mrnNumber]}
              </Label>
              <p className="text-gray-900 dark:text-white">{user?.mrn}</p>
            </div>

            <Button
              variant="destructive"
              className="w-full flex items-center justify-center"
              onClick={logout}
            >
              <FiLogOut className="mr-2 h-4 w-4" />
              {translations.signOut[language as keyof typeof translations.signOut]}
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">
              {translations.about[language as keyof typeof translations.about]}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label htmlFor="app-version">
                {translations.version[language as keyof typeof translations.version]}
              </Label>
              <span className="text-gray-600 dark:text-gray-400">1.0.0</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
