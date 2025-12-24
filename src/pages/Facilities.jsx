import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Container, CircularProgress, Fade } from '@mui/material';
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

  function navigateTraining(facilityName) {
    navigate('/training', {
      state: {
        id: facilityName
      }
    })
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: 'var(--neutral-100)' }}>
        <CircularProgress sx={{ color: 'var(--accent)' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: 'var(--neutral-100)' }}>
        <Typography color="error" variant="h6">Error loading page: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{
      bgcolor: 'var(--neutral-100)',
      minHeight: '100vh',
      pt: '100px',
      pb: 8
    }}>
      <Container maxWidth="xl">
        <Fade in={true} timeout={1000}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: 'var(--font-heading)',
                fontSize: { xs: '2.5rem', md: '4rem' },
                fontWeight: 800,
                color: 'var(--primary)',
                mb: 2,
                textTransform: 'uppercase',
                letterSpacing: '-1px',
              }}
            >
              World-Class <span className="gradient-text">Facilities</span>
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontFamily: 'var(--font-body)',
                color: 'text.secondary',
                maxWidth: '600px',
                mx: 'auto'
              }}
            >
              Train like a pro with our state-of-the-art infrastructure.
            </Typography>
          </Box>
        </Fade>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: 4,
          }}
        >
          {facility.map((fac, index) => (
            <Fade in={true} timeout={1000 + index * 200} key={fac.id}>
              <Card
                className="card-hover"
                onClick={() => navigateTraining(fac.facilityName)}
                sx={{
                  borderRadius: '24px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: 'none',
                  boxShadow: '0 20px 40px -10px rgba(0,0,0,0.08)',
                  bgcolor: 'white',
                  position: 'relative'
                }}
              >
                <Box sx={{ position: 'relative', height: '300px', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    height="100%"
                    image={fac.facilityImage?.formats?.medium?.url || fac.facilityImage?.url}
                    alt={fac.facilityName}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.6s ease',
                      '.card-hover:hover &': {
                        transform: 'scale(1.1)',
                      }
                    }}
                  />
                  <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)',
                    opacity: 0.8
                  }} />
                  <Box sx={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
                    <Typography
                      variant="h4"
                      sx={{
                        color: 'white',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        textShadow: '0 4px 10px rgba(0,0,0,0.3)'
                      }}
                    >
                      {fac.facilityName}
                    </Typography>
                  </Box>
                </Box>
                <CardContent sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
                    View Training Details
                  </Typography>
                  <Box sx={{
                    bgcolor: 'var(--neutral-100)',
                    p: 1,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default Facilities;