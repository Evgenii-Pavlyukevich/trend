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
      padding: isMobile ? '8px 12px' : '10px 16px',
      fontSize: isMobile ? '14px' : '14px',
      cursor: 'pointer',
      borderRadius: '20px',
      fontWeight: 500,
      transition: 'all 0.2s ease',
    },
    login: {
      backgroundColor: 'transparent',
      color: '#065fd4',
      border: '1px solid #065fd4',
    },
    register: {
      backgroundColor: '#065fd4',
      color: 'white',
      border: 'none',
    },
    logout: {
      backgroundColor: '#f2f2f2',
      color: '#606060',
      border: 'none',
    }
  };

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.8rem 1.5rem',
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      height: '56px',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
      }}>
        <div style={{
          width: '90px',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#282828',
        }}>
          TREND
        </div>
      </div>

      <div style={{
        display: 'flex',
        gap: isMobile ? '0.5rem' : '0.75rem',
      }}>
        {!currentUser ? (
          <>
            <button
              onClick={() => navigate('/login')}
              style={{ ...buttonStyles.base, ...buttonStyles.login }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f2f8ff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Войти
            </button>
            <button
              onClick={() => {
                navigate('/login');
              }}
              style={{ ...buttonStyles.base, ...buttonStyles.register }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#0356c6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#065fd4';
              }}
            >
              Регистрация
            </button>
          </>
        ) : (
          <button
            onClick={handleLogout}
            style={{ ...buttonStyles.base, ...buttonStyles.logout }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#e5e5e5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f2f2f2';
            }}
          >
            Выйти
          </button>
        )}
      </div>
    </header>
  );
}; 