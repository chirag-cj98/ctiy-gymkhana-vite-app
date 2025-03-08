import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import Section1 from '../Container/Section1';
import Section2 from '../Container/Section2';
import { Fade } from '@mui/material';
import './Home.css'; // Import the Home-specific CSS file

const Home = () => {
  return (
    <Box className="home-container">
      <Container maxWidth="xl">
        <Fade in={true} timeout={1500}>
          <Box className="home-title-box">
            <Typography variant="h2" className="home-title glowing-text">
              Swing, Score, Succeed – The Cricket School That Builds Champions!
            </Typography>
            <Typography variant="h6" className="home-description glowing-text">
              Unleash Your Inner Champion at the Cricket Academy!
            </Typography>
          </Box>
        </Fade>
        <Section1 />
        <Section2 />
      </Container>
    </Box>
  );
};

export default Home;