import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, Container, Card, CardMedia, CardContent, CircularProgress, Button } from '@mui/material';
import { strapiApiUrl } from '../config/api';

const About = () => {
  const [about, setAbout] = useState(null);
  const [coach, setCoach] = useState([]);
  const [teams, setTeams] = useState([]);
  const [showCoaches, setShowCoaches] = useState(false);
  const [showTeam, setShowTeam] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const coachesRef = useRef(null);
  const teamRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const aboutResponse = await fetch(`${strapiApiUrl}/about`);
        if (!aboutResponse.ok) throw new Error('Failed to fetch about data');
        const aboutData = await aboutResponse.json();
        setAbout(aboutData.data);

        const coachResponse = await fetch(`${strapiApiUrl}/coaches?populate=*`);
        if (!coachResponse.ok) throw new Error('Failed to fetch coach data');
        const coachData = await coachResponse.json();
        setCoach(coachData.data);

        const teamResponse = await fetch(`${strapiApiUrl}/t-eams?populate=*`);
        if (!teamResponse.ok) throw new Error('Failed to fetch team data');
        const teamData = await teamResponse.json();
        setTeams(teamData.data);
      } catch (err) {
        console.log('Error fetching data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (showCoaches && coachesRef.current) {
      setTimeout(() => {
        coachesRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100); // A small delay ensures the element is rendered
    }
  }, [showCoaches]);

  useEffect(() => {
    if (showTeam && teamRef.current) {
      setTimeout(() => {
        teamRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100); // A small delay ensures the element is rendered
    }
  }, [showTeam]);

  const fadeInUp = {
    'from': { opacity: 0, transform: 'translateY(30px)' },
    'to': { opacity: 1, transform: 'translateY(0)' },
  };

  const shine = {
    'to': {
      transform: 'translateX(200%) skewX(-25deg)',
    }
  };

  const cardStyle = {
    background: 'rgba(26, 26, 26, 0.85)',
    borderRadius: '16px',
    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
    width: 320,
    border: '1px solid rgba(255, 215, 0, 0.1)',
    opacity: 0,
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      width: '50%',
      height: '100%',
      background: 'linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0) 100%)',
      transform: 'translateX(-100%) skewX(-25deg)',
    },
    '&:hover': {
      transform: 'translateY(-10px)',
      boxShadow: '0px 12px 28px rgba(0, 0, 0, 0.4)',
      '&::before': { animation: 'shine 1.2s' },
    },
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress sx={{ color: '#FFD700' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography color="error">Error loading page: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        '@keyframes fadeInUp': fadeInUp,
        '@keyframes shine': shine,
        // background removed to match Home page style
        padding: { xs: '2rem 1rem', md: '4rem 1rem' },
        color: '#f0f0f0',
        width: '100%',
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            textAlign: 'left',
            mb: '4rem',
            background: 'rgba(0, 0, 0, 0)',
            p: { xs: '1.5rem', md: '2.5rem' },
            borderRadius: '16px',
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.3)',
            animation: 'fadeInUp 1s ease-out forwards',
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              fontWeight: 700,
              mb: '1.5rem',
              color: '#c70404',
              textTransform: 'uppercase',
              letterSpacing: '2px',
              textShadow: '1px 1px 4px rgba(0, 0, 0, 0.5)',
            }}
          >
            {about?.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              fontSize: { xs: '1rem', md: '1.2rem' },
              color: 'text.secondary',
              fontWeight: 400,
              lineHeight: 1.7,
              maxWidth: '80ch',
            }}
          >
            {about?.description}
          </Typography>
        </Box>

        {/* Button to show/hide coaching staff */}
        <Box sx={{ textAlign: 'center', mb: '4rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Button // Show coaches button
            variant="contained"
            onClick={() => setShowCoaches(!showCoaches)}
            sx={{
              backgroundColor: '#FFD700',
              color: '#1a1a1a',
              fontWeight: 'bold',
              padding: '12px 24px',
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
            {showCoaches ? 'Hide Coaching Staff' : 'Show Coaching Staff'}
          </Button>
          <Button // Show team button
            variant="contained"
            onClick={() => setShowTeam(!showTeam)}
            sx={{
              backgroundColor: '#FFD700',
              color: '#1a1a1a',
              fontWeight: 'bold',
              padding: '12px 24px',
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
            {showTeam ? 'Hide Team' : 'Show Team'}
          </Button>
        </Box>

        {/* Coaching Staff Section */}
        {showCoaches && (
          <Box
            ref={coachesRef}
            sx={{
              mt: '5rem',
              textAlign: 'center',
              animation: 'fadeInUp 1s 0.2s ease-out forwards',
              opacity: 0,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2.2rem', sm: '3rem', md: '3.5rem' },
                fontWeight: 800,
                color: '#c70404',
                mb: '3rem',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
                borderBottom: '2px solid #000',
              }}
            >
              Coaching Staff
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '2.5rem',
                justifyContent: 'center',
              }}
            >
              {coach.map((c, index) => (
                <Card
                  key={c.id}
                  sx={{
                    ...cardStyle,
                    animation: `fadeInUp 0.8s ease-out forwards`,
                    animationDelay: `${0.3 + index * 0.1}s`,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="250"
                    image={c.image?.formats?.medium?.url || c.image?.url}
                    alt={c.name}
                    sx={{ objectFit: 'cover', filter: 'saturate(1.1)', transition: 'filter 0.3s ease', '&:hover': { filter: 'saturate(1.3)' } }}
                  />
                  <CardContent sx={{ p: '1.5rem', textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ color: '#FFD700', fontWeight: 700, mb: '1rem', textTransform: 'uppercase' }}>
                      {c.name}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#b0b0b0', mb: '0.5rem' }}>
                      <strong>Age:</strong> {c.age}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#b0b0b0' }}>
                      <strong>Experience:</strong> {c.experience}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        )}

        {/* Team Section */}
        {showTeam && (
          <Box
            ref={teamRef}
            sx={{
              mt: '5rem',
              textAlign: 'center',
              animation: 'fadeInUp 1s 0.2s ease-out forwards',
              opacity: 0,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: '2.2rem', sm: '3rem', md: '3.5rem' },
                fontWeight: 800,
                color: '#c70404',
                mb: '3rem',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
                borderBottom: '2px solid #000',
              }}
            >
              Our Teams
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '2.5rem',
                justifyContent: 'center',
              }}
            >
              {teams.map((team, index) => (
                <Card
                  key={team.id}
                  sx={{
                    ...cardStyle,
                    animation: `fadeInUp 0.8s ease-out forwards`,
                    animationDelay: `${0.3 + index * 0.1}s`,
                  }}
                >
                  <CardMedia
                    component="img"
                    height="250"
                    image={team.captainImage?.formats?.medium?.url || team.captainImage?.url}
                    alt={team.captainName}
                    sx={{ objectFit: 'cover', filter: 'saturate(1.1)', transition: 'filter 0.3s ease', '&:hover': { filter: 'saturate(1.3)' } }}
                  />
                  <CardContent sx={{ p: '1.5rem', textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ color: '#FFD700', fontWeight: 700, mb: '1rem', textTransform: 'uppercase' }}>{team.teamName}</Typography>
                    <Typography variant="body1" sx={{ color: '#b0b0b0', mb: '0.5rem' }}><strong>Captain:</strong> {team.captainName}</Typography>
                    <Typography variant="body1" sx={{ color: '#b0b0b0' }}><strong>Year:</strong> {team.year}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        )}
      </Container>
      
    </Box>
  );
};

export default About;