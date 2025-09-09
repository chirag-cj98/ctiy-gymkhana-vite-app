import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Section1 from '../Container/Section1';
// import Section2 from '../Container/Section2';
import CustomTable from '../Container/Table';
import { Fade } from '@mui/material';
import cgcaBanner from '../assets/cgca.jpeg'; // NOTE: Please update this path to your actual banner image.

const Home = () => {
  return (
    <Box>
      {/* Banner Section */}
      <Box
        sx={{
          position: 'relative',
          height: { xs: '50vh', md: '70vh' },
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          textAlign: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#fff', // Set background color here to fill empty space
            backgroundImage: `url(${cgcaBanner})`,
            backgroundSize: 'contain', // Use 'contain' to fit the image without stretching
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            filter: 'brightness(0.5)', // Darken the image for better text contrast
            zIndex: -1,
          },
        }}
      >
        <Container maxWidth="md">
          <Fade in={true} timeout={1500}>
            <Box>
              <Typography
                variant="h2"
                fontFamily={'Rubik Distressed, system-ui'}
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
                  textShadow: '2px 2px 8px rgba(0,0,0,0.8)',
                }}
              >
                Swing, Score, Succeed <br />
                The Cricket School That <br /> Builds Champions!
              </Typography>
              <Typography
                variant="h5"
                fontFamily={'Knewave, system-ui'}
                sx={{
                  mt: 4,
                  fontSize: { xs: '1rem', sm: '1.2rem', md: '2rem' },
                  textShadow: '1px 1px 4px rgba(0,0,0,0.7)',
                }}
              >
                Unleash Your Inner Champion at CITY GYMKHANA!
              </Typography>
            </Box>
          </Fade>
        </Container>
      </Box>

      {/* Content Sections */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Section1 />
        {/* <Section2 /> */}
        <CustomTable />
      </Container>
    </Box>
  );
};

export default Home;