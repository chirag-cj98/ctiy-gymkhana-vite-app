import React, { useState } from 'react';
import { Box, Typography, IconButton, Slide } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

const images = [
  'https://via.placeholder.com/800x400?text=Image+1',
  'https://via.placeholder.com/800x400?text=Image+2',
  'https://via.placeholder.com/800x400?text=Image+3',
  'https://via.placeholder.com/800x400?text=Image+4',
];

const Section2 = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: '#333333',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.15)',
        },
        textAlign: 'center',
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
        }}
      >
        Image Gallery
      </Typography>

      <Box
        sx={{
          position: 'relative',
          width: '100%',
          maxWidth: '800px',
          margin: '0 auto',
          overflow: 'hidden',
          borderRadius: '10px',
        }}
      >
        <Slide direction={currentImageIndex ? 'left' : 'right'} in={true} mountOnEnter unmountOnExit>
          <Box
            component="img"
            src={images[currentImageIndex]}
            alt={`Gallery Image ${currentImageIndex + 1}`}
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: '10px',
              boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
            }}
          />
        </Slide>

        {/* Navigation Buttons */}
        <IconButton
          onClick={handlePrevious}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '10px',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: '#FFD700',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
            },
          }}
        >
          <ChevronLeft />
        </IconButton>
        <IconButton
          onClick={handleNext}
          sx={{
            position: 'absolute',
            top: '50%',
            right: '10px',
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: '#FFD700',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
            },
          }}
        >
          <ChevronRight />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Section2;