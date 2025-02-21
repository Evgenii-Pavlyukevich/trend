import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Header } from './components/Header';
import { Login } from './pages/Login';
import { PrivateContent } from './pages/PrivateContent';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div style={{ 
          minHeight: '100vh', 
          backgroundColor: '#f9f9f9',
          fontFamily: 'Roboto, Arial, sans-serif'
        }}>
          <Header />
          <main style={{ 
            paddingTop: '56px',
            minHeight: 'calc(100vh - 56px)',
            width: '100%'
          }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <PrivateContent />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
