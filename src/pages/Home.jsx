import React from 'react';
import { Box, Container, Typography, ImageListItem } from '@mui/material';
import Section1 from '../Container/Section1';
import Section2 from '../Container/Section2';
import CustomTable from '../Container/Table';
import { Fade } from '@mui/material';
import './Home.css'; // Import the Home-specific CSS file
// import bat from '../assets/batu_ballu.jiff';

const Home = () => {
  return (
    <Box className="home-container">
      <Container maxWidth="xl">
        <Fade in={true} timeout={1500}>
          <Box className="home-title-box">
            <Typography variant="h2" className="home-title glowing-text" fontFamily={"Rubik Distressed, system-ui"} fontSize={{
              xs: '2rem', // Font size for mobile
              sm: '3rem', // Font size for small screens
              md: '4rem', // Font size for medium screens
            }} >
              Swing, Score, Succeed <br />The Cricket School That <br /> Builds Champions!
            </Typography>
            <Typography variant="h6" className="home-description glowing-text" fontFamily={"Knewave, system-ui"} fontSize={
              {
                xs: '1rem', // Font size for mobile
                sm: '1.2rem', // Font size for small screens
                md: '2rem', // Font size for medium screens
              }
            } paddingTop={6}>
              Unleash Your Inner Champion at CITY GYMKHANA   !
            </Typography>

          </Box>
        </Fade>
        <Section1 />
        {/* <Section2 /> */}
        <CustomTable />
      </Container>
    </Box>
  );
};

export default Home;