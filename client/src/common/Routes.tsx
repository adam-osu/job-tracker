import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import type React from 'react';

import { Login } from '../pages/Login';
import { Signup } from '../pages/Signup';
import { Home, CreateJob, ViewJob, EditJob } from '../pages/jobPages';
import { CreateContact, ContactsHome, ContactsView, ContactsEdit } from '../pages/contactPages';

import { Skills } from '../pages/Skills';
import { useAuth } from './AuthContext';

export const PageRoutes = () => (
  <Routes>
    <Route
      path="/"
      element={
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      }
    />
    <Route
      path="/login"
      element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      }
    />
    <Route
      path="/signup"
      element={
        <PublicRoute>
          <Signup />
        </PublicRoute>
      }
    />
    <Route
      path="/jobs/create"
      element={
        <PublicRoute>
          <CreateJob />
        </PublicRoute>
      }
    />
    <Route
      path="/jobs/view/:jobId"
      element={
        <PrivateRoute>
          <ViewJob />
        </PrivateRoute>
      }
    />
    <Route
      path="/jobs/edit/:jobId"
      element={
        <PrivateRoute>
          <EditJob />
        </PrivateRoute>
      }
    />
    <Route
      path="/contacts"
      element={
        <PrivateRoute>
          <ContactsHome />
        </PrivateRoute>
      }
    />
    <Route
      path="/contacts/create"
      element={
        <PrivateRoute>
          <CreateContact />
        </PrivateRoute>
      }
    />
    <Route
      path="/contacts/view/:id"
      element={
        <PrivateRoute>
          <ContactsView />
        </PrivateRoute>
      }
    />
    <Route
      path="/contacts/edit/:id"
      element={
        <PrivateRoute>
          <ContactsEdit />
        </PrivateRoute>
      }
    />
    <Route
      path="/skills"
      element={
        <PrivateRoute>
          <Skills />
        </PrivateRoute>
      }
    />
  </Routes>
);

export const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (user) {
    return <>{children}</>;
  }

  return <Navigate to="/login" state={{ from: location.pathname }} />;
};
