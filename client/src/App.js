import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LoginRegister from './pages/LoginRegister';
import Dashboard from './pages/Dashboard';
import Loading from './components/Loading';
import { AuthProvider, useAuth } from './context/AuthContext';

const ProtectedRoute = ({ children, redirectPath = '/' }) => {
  const { currentUser, isLoading } = useAuth();
  return (
    isLoading ? <Loading /> :
      currentUser ? children : <Navigate to={redirectPath} replace />
  );
};

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route
              path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route exact path='/' element={<LoginRegister />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
};

export default App;