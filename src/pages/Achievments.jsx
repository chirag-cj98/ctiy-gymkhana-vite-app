import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, CircularProgress, Fade, Card, CardMedia, CardContent } from '@mui/material';
import { strapiApiUrl } from '../config/api';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: 'var(--neutral-100)' }}>
        <CircularProgress sx={{ color: 'var(--accent)' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: 'var(--neutral-100)' }}>
        <Typography color="error">Error loading achievements: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'var(--neutral-100)', pt: '100px', pb: 8, minHeight: '100vh' }}>
      <Container maxWidth="xl">
        <Fade in={true} timeout={1000}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: 'var(--font-heading)',
                fontSize: { xs: '2.5rem', sm: '3rem', md: '4rem' },
                fontWeight: 800,
                color: 'var(--primary)',
                mb: 2,
                textTransform: 'uppercase',
                letterSpacing: '-1px',
              }}
            >
              Our <span className="gradient-text">Achievements</span>
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontFamily: 'var(--font-body)',
                color: 'text.secondary',
                maxWidth: '700px',
                mx: 'auto'
              }}
            >
              Celebrating the victories and milestones that define our journey.
            </Typography>
          </Box>
        </Fade>

        {achievements.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
              No achievements to display at the moment.
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: 4,
            }}
          >
            {achievements.map((a, index) => (
              <Fade in={true} timeout={1000 + index * 200} key={a.id}>
                <Card
                  className="card-hover"
                  sx={{
                    borderRadius: '24px',
                    overflow: 'hidden',
                    bgcolor: 'white',
                    border: 'none',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  }}
                >
                  <Box sx={{ height: '300px', overflow: 'hidden', position: 'relative' }}>
                    <CardMedia
                      component="img"
                      image={a.achievementImg?.url}
                      alt={a.description}
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
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9) 0%, transparent 60%)',
                    }} />
                    <Box sx={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}>
                      <Typography variant="body1" sx={{
                        color: 'white',
                        fontFamily: 'var(--font-body)',
                        fontSize: '1.1rem',
                        fontWeight: 500,
                        lineHeight: 1.6
                      }}>
                        {a.description}
                      </Typography>
                    </Box>
                  </Box>
                </Card>
              </Fade>
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Achievements;