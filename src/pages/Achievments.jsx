import React, { useState, useEffect } from 'react';
import { Box, Typography, Container } from '@mui/material';
import appBg from '../assets/app-bg.jpg'
import { strapiApiUrl } from '../config/api';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    fetch(`${strapiApiUrl}/achievements?populate=*`)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setAchievements(data.data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <Box
      sx={{
        background: `url(${appBg}) no-repeat center center fixed`, // Add your image path here
        backgroundSize: 'cover', // Ensure the image covers the entire background
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
            backgroundColor: 'rgba(51, 51, 51, 0.8)', // Semi-transparent black background for better readability
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'scale(1.02)',
              boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.15)',
            },
            marginBottom: '40px',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: '#e0e0e0',
              fontSize: '2.5rem',
              marginBottom: '40px',
              fontWeight: 'bold',
              fontFamily: 'Poppins, sans-serif',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            Our Achievements
          </Typography>

          {/* Achievements List */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '40px', // Space between achievements
              alignItems: 'center',
            }}
          >
            {achievements.map((a) => (
              <Box
                key={a.id}
                sx={{
                  backgroundColor: 'rgba(51, 51, 51, 0.8)', // Semi-transparent background for each achievement
                  padding: '20px',
                  borderRadius: '10px',
                  boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.15)',
                  },
                  width: '80%',
                  maxWidth: '800px',
                  textAlign: 'center',
                }}
              >
                <img
                  src={`${a.achievementImg.url}`}
                  alt={a.description}
                  style={{
                    width: '100%',
                    maxWidth: '600px',
                    height: 'auto',
                    borderRadius: '10px',
                    marginBottom: '20px',
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: '400',
                    color: '#b0b0b0',
                    lineHeight: '1.6',
                  }}
                >
                  {a.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Achievements;