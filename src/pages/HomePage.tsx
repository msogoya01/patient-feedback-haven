
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { ArrowRight } from 'lucide-react-native';

const translations = {
  welcome: {
    en: "Welcome dear patient",
    fr: "Bienvenue cher patient",
    es: "Bienvenido querido paciente",
  },
  clickButton: {
    en: "Click the button below to provide your feedback",
    fr: "Cliquez sur le bouton ci-dessous pour donner votre avis",
    es: "Haga clic en el botón de abajo para dar su opinión",
  },
  continue: {
    en: "CONTINUE",
    fr: "CONTINUER",
    es: "CONTINUAR",
  },
};

export default function HomePage() {
  const { user } = useAuth();
  const { language } = useTheme();
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.navigate('Departments');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>
          {translations.welcome[language as keyof typeof translations.welcome]}
        </Text>
        
        <Text style={styles.description}>
          {translations.clickButton[language as keyof typeof translations.clickButton]}
        </Text>
        
        <TouchableOpacity
          style={styles.button}
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>
            {translations.continue[language as keyof typeof translations.continue]}
          </Text>
          <ArrowRight color="white" size={20} style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#9b87f5',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
