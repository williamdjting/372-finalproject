import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LoginRegister from './pages/LoginRegister';
import Dashboard from './pages/dashboard/Dashboard';
import Dashboard1 from './pages/dashboard/Dashboard1';
import Dashboard2 from './pages/dashboard/Dashboard2';
import Dashboard3 from './pages/dashboard/Dashboard3';
import Dashboard4 from './pages/dashboard/Dashboard4';
import Dashboard5 from './pages/dashboard/Dashboard5';
import Dashboard6 from './pages/dashboard/Dashboard6';
import Dashboard7 from './pages/dashboard/Dashboard7';
import Dashboard8 from './pages/dashboard/Dashboard8';
import Dashboard9 from './pages/dashboard/Dashboard9';
import WithoutNav from './pages/accessories/WithoutNav';
import WithNav from './pages/accessories/WithNav';
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

            <Route element={<WithNav />}>
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route element={<WithoutNav />}>
              <Route exact path='/' element={<LoginRegister />} />
            </Route>

            <Route element={<WithNav />}>
              <Route exact path='/dashboard1' element={<Dashboard1 />} />
              <Route exact path='/dashboard2' element={<Dashboard2 />} />
              <Route exact path='/dashboard3' element={<Dashboard3 />} />
              <Route exact path='/dashboard4' element={<Dashboard4 />} />
              <Route exact path='/dashboard5' element={<Dashboard5 />} />
              <Route exact path='/dashboard6' element={<Dashboard6 />} />
              <Route exact path='/dashboard7' element={<Dashboard7 />} />
              <Route exact path='/dashboard8' element={<Dashboard8 />} />
              <Route exact path='/dashboard9' element={<Dashboard9 />} />
            </Route>

          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
};

export default App;