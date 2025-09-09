import React, { useState } from 'react';
import { Box, Typography, Container, Fade, CircularProgress } from '@mui/material';

const Contact = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  const contactItems = [
    { label: 'Address', value: 'Jnanakshi Vidyaniketan School, RR Nagar, Bangalore, India' },
    { label: 'Phone', value: '+91 9901029957' },
    { label: 'Email', value: 'Gymkhanacity@gmail.com' },
    { label: 'Timings', value: 'Mon-Sun, 9:00 AM - 6:00 PM' },
  ];

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #eef2f7 100%)',
        py: { xs: 4, md: 8 },
        color: '#2c3e50',
        width: '100%',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="xl">
        <Fade in={true} timeout={1500}>
          <Box
            sx={{
              textAlign: 'center',
              mb: 5,
              background: 'transparent',
              p: { xs: 2, md: 3 },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
                fontWeight: 700,
                color: '#c70404', // Match homepage red
                mb: 2,
                textTransform: 'uppercase',
                letterSpacing: '2px',
                textShadow: '1px 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              Find Us
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: { xs: '1rem', md: '1.2rem' },
                color: '#2c3e50',
                fontWeight: 500,
                lineHeight: 1.7,
                maxWidth: '80ch',
                mx: 'auto',
              }}
            >
              Visit us at our location and become a part of the City Gymkhana School of Cricket!
            </Typography>
          </Box>
        </Fade>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            mt: 5,
          }}
        >
          {/* Map Section */}
          <Box
            sx={{
              flex: { md: 1.5 }, // Make map larger
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(149, 157, 165, 0.2)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 28px rgba(149, 157, 165, 0.25)',
              },
              background: '#ffffff',
              p: 1, // Padding around the map iframe
            }}
          >
            {!mapLoaded && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                   height: '450px', // Match iframe height
                   backgroundColor: '#f0f0f0',
                  borderRadius: '12px',
                }}
              >
                <CircularProgress sx={{ color: '#c70404' }} />
              </Box>
            )}
            <Box
              component="iframe"
              width="100%"
              height="100%" // Increased height slightly
              src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Jnanakshi%20Vidyaniketan%20school,%20Rr%20nagar+(City%20Gymkhana%20School%20of%20Cricket)&t=&z=14&ie=UTF8&iwloc=B&output=embed"
              title="Google Map Location"
              onLoad={handleMapLoad}
              sx={{
                display: mapLoaded ? 'block' : 'none', // Hide iframe until loaded
                border: 'none',
                width: '100%',
                borderRadius: '8px', // Rounded corners for the map itself
              }}
            />
          </Box>

          {/* Contact Details Section */}
          <Box
            sx={{
              flex: { md: 1 },
              background: '#ffffff',
              p: { xs: 3, md: 4 },
              borderRadius: '12px',
              boxShadow: '0 8px 24px rgba(149, 157, 165, 0.2)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 28px rgba(149, 157, 165, 0.25)',
              },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontFamily: 'Poppins, sans-serif',
                fontSize: '2rem',
                fontWeight: 700,
                color: '#2c3e50',
                mb: 3,
              }}
            >
              Contact Details
            </Typography>
            {contactItems.map((item, index) => (
              <Typography
                key={item.label}
                variant="body1"
                sx={{
                  fontFamily: 'Poppins, sans-serif',
                  fontSize: '1.1rem',
                  color: '#555',
                  mb: index === contactItems.length - 1 ? 0 : 2,
                  lineHeight: 1.7,
                  '& strong': {
                    color: '#2c3e50',
                    fontWeight: 600,
                  },
                }}
              >
                <strong>{item.label}:</strong> {item.value}
              </Typography>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;