import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LoginRegister from './pages/LoginRegister';
import Dashboard1 from './pages/dashboard/Dashboard1';
import Dashboard2 from './pages/dashboard/Dashboard2';
import GroupWatchListRegister from './pages/dashboard/GroupWatchListRegister';
import WatchLists from './pages/dashboard/WatchLists';
import Dashboard7 from './pages/dashboard/Dashboard7';
import PersonalWatchListView from './pages/dashboard/PersonalWatchListView';
import Insights from './pages/dashboard/Insights';
import NavWithContainer from './components/NavWithContainer';
import Loading from './components/Loading';
import { AuthProvider, useAuth } from './context/AuthContext';
import GroupWatchListView from './pages/dashboard/GroupWatchListView';

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
            <Route element={<NavWithContainer />}>
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <WatchLists />
                  </ProtectedRoute>
                }
              />
              <Route
                path="dashboard/insights"
                element={
                  <ProtectedRoute>
                    <Insights />
                  </ProtectedRoute>
                }
              />
              <Route
                path="dashboard/personal"
                element={
                  <ProtectedRoute>
                    <PersonalWatchListView />
                  </ProtectedRoute>
                }
              />
              <Route
                path="dashboard/groups/register"
                element={
                  <ProtectedRoute>
                    <GroupWatchListRegister />
                  </ProtectedRoute>
                }
              />
              <Route
                path="dashboard/groups/view/:name"
                element={
                  <ProtectedRoute>
                    <GroupWatchListView />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route element={<NavWithContainer hidden={true} />}>
              <Route exact path='/' element={<LoginRegister />} />
            </Route>

            <Route element={<NavWithContainer />}>
              <Route exact path='/dashboard1' element={<Dashboard1 />} />
              <Route exact path='/dashboard2' element={<Dashboard2 />} />
              <Route exact path='/dashboard7' element={<Dashboard7 />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  )
};

export default App;
