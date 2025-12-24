import React from 'react';
import { Box, Container, Typography, Button, Fade } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Section1 from '../Container/Section1';
import CustomTable from '../Container/Table';
import cgcaBanner from '../assets/cgca.jpeg';
import './Home.css';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: 'var(--neutral-100)', minHeight: '100vh' }}>

      {/* Immersive Hero Section */}
      <Box className="hero-section" sx={{ overflow: 'hidden' }}>
        <Container maxWidth="xl" className="hero-content">
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: { xs: 4, md: 8 },
            py: { xs: 4, md: 8 }
          }}>
            <Box sx={{ flex: 1, width: '100%', height: { xs: '300px', md: '600px' }, position: 'relative' }}>
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${cgcaBanner})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  animation: 'kenburns 20s infinite alternate',
                }}
              />
            </Box>
            <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
              <Fade in={true} timeout={1000}>
                <Box>
                  <Typography variant="h5" sx={{
                    color: 'var(--accent)',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    letterSpacing: '4px',
                    textTransform: 'uppercase',
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: { xs: 'center', md: 'flex-start' },
                    gap: 1
                  }}>
                    <SportsCricketIcon /> Est. 1980
                  </Typography>

                  <h1 className="hero-title">
                    Building Champions <br />
                    <span className="gradient-text">One Innings at a Time</span>
                  </h1>

                  <p className="hero-subtitle">
                    Join Bangalore's premier cricket academy where tradition meets modern excellence.
                    Experience world-class coaching and facilities.
                  </p>

                  <Box sx={{ display: 'flex', gap: 3, justifyContent: { xs: 'center', md: 'flex-start' }, flexWrap: 'wrap' }}>
                    <button
                      className="cta-button"
                      onClick={() => navigate('/contact-us')}
                    >
                      Join the Club
                    </button>
                    <Button
                      variant="outlined"
                      sx={{
                        color: 'white',
                        borderColor: 'rgba(255,255,255,0.5)',
                        borderRadius: '50px',
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        fontFamily: 'var(--font-heading)',
                        '&:hover': {
                          borderColor: 'white',
                          bgcolor: 'rgba(255,255,255,0.1)'
                        }
                      }}
                      onClick={() => navigate('/about')}
                    >
                      Learn More
                    </Button>
                  </Box>
                </Box>
              </Fade>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Modern Wave Divider */}
      <Box sx={{
        position: 'relative',
        height: '100px',
        background: 'var(--neutral-100)',
        mt: -10,
        zIndex: 5,
        clipPath: 'ellipse(60% 100% at 50% 100%)'
      }} />

      {/* Content Sections */}
      <Container maxWidth="lg" sx={{ py: 8, position: 'relative', zIndex: 10 }}>

        {/* Intro/About Snippet */}
        <Box sx={{ mb: 10 }}>
          <Section1 />
        </Box>

        {/* Schedule Table Section */}
        <Box sx={{
          background: 'white',
          borderRadius: '24px',
          p: { xs: 3, md: 6 },
          boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)'
        }}>
          <Typography variant="h4" sx={{
            textAlign: 'center',
            mb: 4,
            fontFamily: 'var(--font-heading)',
            color: 'var(--primary)',
            fontWeight: 700
          }}>
            Training Schedule
          </Typography>
          <CustomTable />
        </Box>
      </Container>
    </Box>
  );
};

export default Home;