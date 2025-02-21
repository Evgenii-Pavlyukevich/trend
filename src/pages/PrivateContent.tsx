import React from 'react';

export const PrivateContent: React.FC = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: 'calc(100vh - 72px)',
      padding: '2rem',
      backgroundColor: '#f9f9f9'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2.5rem',
        borderRadius: '8px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
        textAlign: 'center',
        maxWidth: '600px',
        width: '100%'
      }}>
        <h1 style={{ 
          marginBottom: '1.5rem',
          color: '#282828',
          fontSize: '24px',
          fontWeight: '400'
        }}>
          Private Content
        </h1>
        <p style={{
          color: '#606060',
          fontSize: '16px',
          lineHeight: '1.5'
        }}>
          This content is only visible to authenticated users.
        </p>
      </div>
    </div>
  );
}; 