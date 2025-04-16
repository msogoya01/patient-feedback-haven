
import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import DepartmentsPage from '../pages/DepartmentsPage';
import HomePage from '../pages/HomePage';
import ObjectivePage from '../pages/ObjectivePage';
import HistoryPage from '../pages/HistoryPage';
import NotificationsPage from '../pages/NotificationsPage';
import SettingsPage from '../pages/SettingsPage';
import FeedbackPage from '../pages/FeedbackPage';
import LoginPage from '../pages/LoginPage';
import { useAuth } from '@/contexts/AuthContext';
import { AppLayout } from '@/components/layout/AppLayout';

export function AppNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      
      {isAuthenticated ? (
        <Route element={<AppLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/objective" element={<ObjectivePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/departments" element={<DepartmentsPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
        </Route>
      ) : (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
}

// This component provides a simplified version of the tab navigation
// that can be used with React Router instead of React Navigation
export function TabNavigator() {
  const navigate = useNavigate();
  
  const navigateTo = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex justify-around p-4 bg-gray-100 border-t border-gray-200">
      <button onClick={() => navigateTo('/home')}>Home</button>
      <button onClick={() => navigateTo('/objective')}>Objective</button>
      <button onClick={() => navigateTo('/history')}>History</button>
      <button onClick={() => navigateTo('/notifications')}>Notifications</button>
      <button onClick={() => navigateTo('/settings')}>Settings</button>
    </div>
  );
}
