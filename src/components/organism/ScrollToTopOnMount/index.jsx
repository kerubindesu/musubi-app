// eslint-disable-next-line no-unused-vars
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ScrollToTopOnMount = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [navigate]);

  return null;
};

export default ScrollToTopOnMount;
