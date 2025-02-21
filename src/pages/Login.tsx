import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const { login, signup, currentUser } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(email, password);
      }
      navigate('/');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 'calc(100vh - 72px)',
      padding: '1rem',
      backgroundColor: '#f9f9f9'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '3rem 2.5rem',
        borderRadius: '8px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '450px'
      }}>
        <h1 style={{ 
          textAlign: 'center',
          marginBottom: '2rem',
          fontSize: '24px',
          color: '#282828',
          fontWeight: '400'
        }}>
          {isLogin ? 'Войти' : 'Создать аккаунт'}
        </h1>
        {error && <p style={{ 
          color: '#c00',
          textAlign: 'center',
          marginBottom: '1rem',
          padding: '0.75rem',
          backgroundColor: '#fce8e8',
          borderRadius: '4px',
          fontSize: '14px'
        }}>{error}</p>}
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: '12px',
              fontSize: '15px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              backgroundColor: '#f9f9f9',
              transition: 'all 0.2s ease',
              outline: 'none',
            }}
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: '12px',
              fontSize: '15px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              backgroundColor: '#f9f9f9',
              transition: 'all 0.2s ease',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            style={{
              padding: '12px',
              fontSize: '15px',
              cursor: 'pointer',
              backgroundColor: '#065fd4',
              color: 'white',
              border: 'none',
              borderRadius: '20px',
              marginTop: '0.5rem',
              fontWeight: '500',
              transition: 'background-color 0.2s ease'
            }}
          >
            {isLogin ? 'Войти' : 'Создать'}
          </button>
        </form>
        <button
          onClick={() => setIsLogin(!isLogin)}
          style={{
            background: 'none',
            border: 'none',
            color: '#065fd4',
            cursor: 'pointer',
            width: '100%',
            marginTop: '1.5rem',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          {isLogin ? 'Нет аккаунта? Создать' : 'Уже есть аккаунт? Войти'}
        </button>
      </div>
    </div>
  );
}; 