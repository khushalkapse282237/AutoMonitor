// pages/PageNotFound.jsx
import React from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 20px;
`;

const ErrorCode = styled.h1`
  font-size: 6rem;
  color: #2c3e50;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  animation: bounce 2s infinite;

  @media (max-width: 768px) {
    font-size: 4rem;
  }

  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-20px);
    }
    60% {
      transform: translateY(-10px);
    }
  }
`;

const Message = styled.p`
  font-size: 1.5rem;
  color: #34495e;
  margin: 20px 0;
  text-align: center;
  max-width: 600px;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Button = styled.button`
  padding: 12px 24px;
  font-size: 1.1rem;
  color: white;
  background-color: #3498db;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);

  &:hover {
    background-color: #2980b9;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 1rem;
  }
`;

const Footer = styled.div`
  margin-top: 40px;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

const Link = styled.span`
  color: #7f8c8d;
  cursor: pointer;
  font-size: 0.9rem;
  transition: color 0.3s ease;

  &:hover {
    color: #3498db;
    text-decoration: underline;
  }
`;

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <Container>
      <ErrorCode>404</ErrorCode>
      <Message>Oops! It seems we've lost our way. The page you're looking for doesn't exist or has been moved.</Message>
      
      <Button onClick={() => navigate('/')}>
        Return to Home
      </Button>

      <Footer>
        <Link onClick={() => navigate('/')}>Go Back</Link>
        <Link as="a" href="https://www.automonitor.com/privacy-policy" target="_blank">
          Privacy Policy
        </Link>
        <Link as="a" href="mailto:support@automonitor.com">
          Contact Support
        </Link>
      </Footer>
    </Container>
  );
}

export default PageNotFound;