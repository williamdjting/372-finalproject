import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LoginRegister from './pages/LoginRegister';
import Dashboard from './pages/dashboard/Dashboard';
import Dashboard1 from './pages/dashboard/Dashboard1';
import Dashboard2 from './pages/dashboard/Dashboard2';
import GroupWatchListRegister from './pages/dashboard/GroupWatchListRegister';
import GroupWatchListAddStocks from './pages/dashboard/GroupWatchListAddStocks';
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
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400&display=swap" rel="stylesheet" />
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
              <Route
                path="dashboard/group/register"
                element={
                  <ProtectedRoute>
                    <GroupWatchListRegister />
                  </ProtectedRoute>
                }
              />
              <Route
                path="dashboard/group/addstocks"
                element={
                  <ProtectedRoute>
                    <GroupWatchListAddStocks />
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
