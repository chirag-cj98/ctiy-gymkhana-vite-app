import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Container } from '@mui/material';
import appBg from '../assets/app-bg.jpg'
import { NavLink, useNavigate } from 'react-router-dom';
import { strapiApiUrl } from '../config/api';

const Facilities = () => {
  const [facility, setFacility] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/facilities?populate=*`)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        setFacility(data.data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  function navigateTraining (facilityName) {
    navigate('/training', { state: {
      id: facilityName
    }})
  }

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
            backgroundColor: 'transparent', // Semi-transparent black background for better readability
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
              color: '#f1f1f1',
              fontSize: '2rem',
              marginBottom: '20px',
              fontWeight: 'bold',
              fontFamily: 'Poppins, sans-serif',
              textAlign: 'center',
            }}
          >
            Our Facilities
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              justifyContent: 'center',
            }}
          >
            {facility.map((fac) => (
              <Card
                onClick={() => navigateTraining(fac.facilityName)}
                key={fac.id}
                sx={{
                  backgroundColor: 'rgba(51, 51, 51, 0.8)', // Semi-transparent background for cards
                  color: '#f1f1f1',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                  },
                  borderRadius: '10px',
                  boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
                  width: { xs: '100%', sm: 'calc(50% - 20px)', md: 'calc(33.33% - 20px)' },
                  maxWidth: '400px',
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={`${fac.facilityImage.url}`}
                  alt={fac.facilityName}
                  sx={{
                    borderTopLeftRadius: '10px',
                    borderTopRightRadius: '10px',
                  }}
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: 'bold',
                      color: '#FFD700',
                      textAlign: 'center',
                    }}
                  >
                    {fac.facilityName}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Facilities;