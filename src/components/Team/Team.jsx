import React, { useState, useEffect } from 'react';
import { Collapse, Button, Card, CardContent, Typography, Box, Fade } from '@mui/material';

const Team = () => {
  const [expanded, setExpanded] = useState(false);
  const [captains, setCaptains] = useState([]);

  const handleClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const fetchCaptains = async () => {
      try {
        const capData = await fetch('http://localhost:1337/api/t-eams?populate=*');
        if (capData.ok) {
          const captains = await capData.json();
          setCaptains(captains.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchCaptains();
  }, []);

  return (
    <Box sx={{ marginTop: '40px', textAlign: 'center' }}>
      <Button
        onClick={handleClick}
        sx={{
          backgroundColor: '#FFD700',
          color: '#1a1a1a',
          fontWeight: 'bold',
          padding: '10px 20px',
          borderRadius: '8px',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
            boxShadow: '0px 5px 15px rgba(255, 215, 0, 0.3)',
            backgroundColor: '#e6b800',
          },
        }}
      >
        {expanded ? 'Hide Team' : 'Show Team'}
      </Button>

      <Collapse in={expanded}>
        <Fade in={expanded} timeout={1000}>
          <Box
            sx={{
              marginTop: '20px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '20px',
              justifyContent: 'center',
            }}
          >
            {captains.map((c) => (
              <Card
                key={c.id}
                sx={{
                  backgroundColor: 'rgba(26, 26, 26, 0.8)',
                  color: '#e0e0e0',
                  borderRadius: '12px',
                  boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.2)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  width: { xs: '100%', sm: 'calc(50% - 20px)', md: 'calc(33.33% - 20px)' },
                  maxWidth: '300px',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.3)',
                  },
                }}
              >
                <CardContent>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: 'Poppins, sans-serif',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      color: '#FFD700',
                      marginBottom: '10px',
                    }}
                  >
                    {c.teamName}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: 'Poppins, sans-serif',
                      color: '#b0b0b0',
                      marginBottom: '10px',
                    }}
                  >
                    <strong>Captain:</strong> {c.captainName}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: 'Poppins, sans-serif',
                      color: '#b0b0b0',
                      marginBottom: '10px',
                    }}
                  >
                    <strong>Year:</strong> {c.year}
                  </Typography>
                  <Box
                    component="img"
                    src={`http://localhost:1337${c.captainImage.formats.thumbnail.url}`}
                    alt={c.captainName}
                    sx={{
                      width: '100%',
                      height: 'auto',
                      borderRadius: '8px',
                      objectFit: 'cover',
                    }}
                  />
                </CardContent>
              </Card>
            ))}
          </Box>
        </Fade>
      </Collapse>
    </Box>
  );
};

export default Team;