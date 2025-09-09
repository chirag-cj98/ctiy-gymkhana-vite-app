import { Button, Box, Typography, Container, CircularProgress, Card, CardContent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import VideoPlayer from '../components/video-player';
import { strapiApiUrl } from '../config/api';

const Training = () => {
  const location = useLocation();
  const [drills, setDrills] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchTrainingVideos = async () => {
      if (!location.state?.id) {
        setError('No training category specified.');
        setLoading(false);
        setDrills([]);
        setTitle('Training Drills');
        return;
      }
      const { id } = location.state;
      setTitle(id);

      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `${strapiApiUrl}/trainings?populate=*&filters[trainingTitle]=${id}&pagination[page]=${page}&pagination[pageSize]=6`
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setDrills(data.data);
        setHasMore(data.meta.pagination.page < data.meta.pagination.pageCount);
      } catch (err) {
        console.error('Error fetching training videos:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainingVideos();
  }, [page, location.state]);

  // Handle Next button click
  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  // Handle Previous button click
  const handlePrevious = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleBack = () => {
    navigate('/facility');
  };

  const fadeInUp = {
    'from': { opacity: 0, transform: 'translateY(30px)' },
    'to': { opacity: 1, transform: 'translateY(0)' },
  };

  const videoCardStyle = {
    background: 'rgba(26, 26, 26, 0.85)',
    borderRadius: '16px',
    boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.3)',
    transition: 'transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
    width: 340,
    border: '1px solid rgba(255, 215, 0, 0.1)',
    opacity: 0,
    padding: '1rem',
    '&:hover': {
      transform: 'translateY(-10px)',
      boxShadow: '0px 12px 28px rgba(0, 0, 0, 0.4)',
    },
  };

  const buttonStyle = {
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
    '&:disabled': {
      backgroundColor: '#555',
      color: '#888',
      cursor: 'not-allowed',
      transform: 'none',
      boxShadow: 'none',
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
        <Typography color="error">Error loading drills: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        '@keyframes fadeInUp': fadeInUp,
        padding: { xs: '2rem 1rem', md: '4rem 1rem' },
        color: '#f0f0f0',
        width: '100%',
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ mb: '2rem', textAlign: { xs: 'center', sm: 'left' } }}>
          <Button
            onClick={handleBack}
            sx={buttonStyle}
          >
            &larr; Back to Facilities
          </Button>
        </Box>

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
            textAlign: 'center',
            animation: 'fadeInUp 1s ease-out forwards',
          }}
        >
          {title}
        </Typography>

        {drills.length === 0 ? (
          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              mt: '4rem',
              animation: 'fadeInUp 1s ease-out forwards',
            }}
          >
            No drills found for this category.
          </Typography>
        ) : (
          <>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '2.5rem',
                justifyContent: 'center',
              }}
            >
              {drills.map((d, index) => (
                <Card
                  key={d.id}
                  sx={{
                    ...videoCardStyle,
                    animation: `fadeInUp 0.8s ease-out forwards`,
                    animationDelay: `${0.3 + index * 0.1}s`,
                  }}
                >
                  {d.video?.url && <VideoPlayer url={d.video.url} />}
                  <CardContent sx={{ p: '1.5rem', textAlign: 'center' }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#FFD700',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                      }}
                    >
                      {d.drill || 'Drill'}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>

            {/* Pagination Buttons */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
                marginTop: '4rem',
              }}
            >
              <Button onClick={handlePrevious} disabled={page === 1} sx={buttonStyle}>
                Previous
              </Button>
              <Button onClick={handleNext} disabled={!hasMore} sx={buttonStyle}>
                Next
              </Button>
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default Training;