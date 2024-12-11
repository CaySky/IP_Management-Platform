import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import Layout from './components/Layout';
import Login from './pages/Login';
import IPManagement from './pages/IPManagement';
import UserManagement from './pages/UserManagement';
import APIKeyManagement from './pages/APIKeyManagement';
import { isAuthenticatedAtom } from './store/auth';

const PrivateRoute: React.FC<{ element: React.ReactElement }> = ({ element }) => {
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  return isAuthenticated ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={<PrivateRoute element={<Layout />} />}
        >
          <Route index element={<IPManagement />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="api-keys" element={<APIKeyManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;