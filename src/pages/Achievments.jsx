import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, CircularProgress } from '@mui/material';
import { strapiApiUrl } from '../config/api';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const shine = {
    to: {
      transform: 'translateX(200%) skewX(-25deg)',
    },
  };

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${strapiApiUrl}/achievements?populate=*`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAchievements(data.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress sx={{ color: '#c70404' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography color="error">Error loading achievements: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box
       sx={{
        '@keyframes shine': shine,
        paddingTop: '60px',
        paddingBottom: '60px',
        color: 'white',
        width: '100%',
        minHeight: '100vh', // Ensure the background covers the entire viewport
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            padding: { xs: '2rem', md: '3rem' }, // Responsive padding
            marginBottom: '40px',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: '#c70404', // Match homepage red
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
              marginBottom: '40px',
              fontWeight: 'bold',
              fontFamily: 'Poppins, sans-serif',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
            }}
          >
            Our Achievements
          </Typography>

          {achievements.length === 0 ? (
            <Typography variant="h6" sx={{ textAlign: 'center', color: '#e0e0e0' }}>
              No achievements to display at the moment.
            </Typography>
          ) : (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                gap: '2.5rem',
                justifyItems: 'center',
              }}
            >
              {achievements.map((a) => (
                <Box
                  key={a.id}
                  sx={{
                    backgroundColor: 'rgba(51, 51, 51, 0.8)', // Semi-transparent background for each achievement
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2)',
                    transition: 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
                    position: 'relative',
                    overflow: 'hidden',
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
                      transform: 'scale(1.05)',
                      boxShadow: '0px 15px 30px rgba(199, 4, 4, 0.3)',
                      '&::before': { animation: 'shine 1.2s' },
                    },
                    width: '100%',
                    maxWidth: '500px', // Max width for each card
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    component="img"
                    src={`${a.achievementImg.url}`}
                    alt={a.description}
                    sx={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '10px',
                      marginBottom: '20px',
                      objectFit: 'cover',
                    }}
                  />
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: '400',
                      color: '#e0e0e0', // Brighter text
                      lineHeight: '1.6',
                      textAlign: 'center',
                    }}
                  >
                    {a.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Achievements;