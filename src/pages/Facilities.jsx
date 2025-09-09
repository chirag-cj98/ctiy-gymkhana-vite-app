import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Container, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { strapiApiUrl } from '../config/api';

const Facilities = () => {
  const [facility, setFacility] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${strapiApiUrl}/facilities?populate=*`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setFacility(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  function navigateTraining (facilityName) {
    navigate('/training', { state: {
      id: facilityName
    }})
  }

  const fadeInUp = {
    'from': { opacity: 0, transform: 'translateY(30px)' },
    'to': { opacity: 1, transform: 'translateY(0)' },
  };

  const shine = {
    'to': {
      transform: 'translateX(200%) skewX(-25deg)',
    }
  };

  const cardStyle = {
    background: 'rgba(26, 26, 26, 0.85)',
    borderRadius: '16px',
    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
    width: 320,
    border: '1px solid rgba(255, 215, 0, 0.1)',
    opacity: 0,
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '50%',
      height: '100%',
      background: 'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0) 100%)',
      transform: 'translateX(-100%) skewX(-25deg)',
    },
    '&:hover': {
      transform: 'translateY(-10px)',
      boxShadow: '0px 12px 28px rgba(0, 0, 0, 0.4)',
      '&::before': { animation: 'shine 1.2s' },
    },
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress sx={{ color: '#FFD700' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography color="error">Error loading page: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{
      '@keyframes fadeInUp': fadeInUp,
      '@keyframes shine': shine,
      padding: { xs: '2rem 1rem', md: '4rem 1rem' },
      color: '#f0f0f0',
      width: '100%',
      minHeight: '100vh',
      overflowX: 'hidden',
    }}>
      <Container maxWidth="xl">
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2.2rem', sm: '3rem', md: '3.5rem' },
              fontWeight: 800,
              color: '#c70404',
              mb: '3rem',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
              textAlign: 'center',
              animation: 'fadeInUp 1s ease-out forwards',
            }}
          >
            Our Facilities
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '2.5rem',
              justifyContent: 'center',
            }}
          >
            {facility.map((fac, index) => (
              <Card
                onClick={() => navigateTraining(fac.facilityName)}
                key={fac.id}
                sx={{
                  ...cardStyle,
                  animation: `fadeInUp 0.8s ease-out forwards`,
                  animationDelay: `${0.3 + index * 0.1}s`,
                }}
              >
                <CardMedia
                  component="img"
                  height="250"
                  image={fac.facilityImage?.formats?.medium?.url || fac.facilityImage?.url}
                  alt={fac.facilityName}
                  sx={{
                    objectFit: 'cover',
                    filter: 'saturate(1.1)',
                    transition: 'filter 0.3s ease',
                    '&:hover': { filter: 'saturate(1.3)' },
                  }}
                />
                <CardContent sx={{ p: '1.5rem', textAlign: 'center' }}>
                  <Typography
                    variant="h5"
                    sx={{
                      color: '#FFD700',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}
                  >
                    {fac.facilityName}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
      </Container>
    </Box>
  );
};

export default Facilities;