import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: 'relative',
        height: '100vh',
        backgroundImage: `url("https://media.istockphoto.com/id/938068106/vector/chat-bubble-seamless-pattern.jpg?s=612x612&w=0&k=20&c=GxsXdHahLySTeiC035TXw7GasCzq1dREqRFptfzrbc8=")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: 'white',
          padding: '20px',
        }}
      >
        <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '10px' }}>
          Welcome to WhatsApp
        </h1>
        
        <button
          onClick={() => navigate('/chat')}
          style={{
            backgroundColor: '#25D366',
            color: 'white',
            padding: '12px 30px',
            border: 'none',
            borderRadius: '25px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#1DA851')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#25D366')}
        >
          Go to Chat
        </button>
      </div>
    </div>
  );
};

export default Home;
