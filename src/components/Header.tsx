import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Header: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const buttonStyles = {
    base: {
      padding: isMobile ? '6px 12px' : '8px 16px',
      fontSize: isMobile ? '12px' : '14px',
      cursor: 'pointer',
      borderRadius: '4px',
    },
    login: {
      backgroundColor: 'transparent',
      color: '#4285f4',
      border: '1px solid #4285f4',
    },
    register: {
      backgroundColor: '#4285f4',
      color: 'white',
      border: 'none',
    },
    logout: {
      backgroundColor: '#dc3545',
      color: 'white',
      border: 'none',
    }
  };

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        backgroundColor: '#ddd', // Placeholder for logo
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Logo placeholder */}
        Logo
      </div>

      <div style={{
        display: 'flex',
        gap: isMobile ? '0.5rem' : '1rem',
      }}>
        {!currentUser ? (
          <>
            <button
              onClick={() => navigate('/login')}
              style={{ ...buttonStyles.base, ...buttonStyles.login }}
            >
              Войти
            </button>
            <button
              onClick={() => {
                navigate('/login');
                // You might want to add state to indicate registration mode
                // This would require modifying your Login component to accept and handle this state
              }}
              style={{ ...buttonStyles.base, ...buttonStyles.register }}
            >
              Регистрация
            </button>
          </>
        ) : (
          <button
            onClick={handleLogout}
            style={{ ...buttonStyles.base, ...buttonStyles.logout }}
          >
            Выйти
          </button>
        )}
      </div>
    </header>
  );
}; 