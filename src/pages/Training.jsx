import { Button, Box, Typography, Container, CircularProgress, Card, CardContent, Fade } from '@mui/material';
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

  const handleNext = () => setPage((prev) => prev + 1);
  const handlePrevious = () => setPage((prev) => (prev > 1 ? prev - 1 : 1));
  const handleBack = () => navigate('/facility');

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
        <Typography color="error">Error loading drills: {error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'var(--neutral-100)', pt: '100px', pb: 8, minHeight: '100vh' }}>
      <Container maxWidth="xl">
        <Box sx={{ mb: 6, textAlign: { xs: 'center', sm: 'left' } }}>
          <Button
            onClick={handleBack}
            variant="text"
            sx={{
              color: 'var(--primary)',
              fontWeight: 600,
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
            }}
          >
            &larr; Back to Facilities
          </Button>
        </Box>

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
              {title} <span className="gradient-text">Drills</span>
            </Typography>
          </Box>
        </Fade>

        {drills.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
              No drills found for this category.
            </Typography>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 4,
              }}
            >
              {drills.map((d, index) => (
                <Fade in={true} timeout={1000 + index * 200} key={d.id}>
                  <Card
                    className="card-hover"
                    sx={{
                      borderRadius: '24px',
                      overflow: 'hidden',
                      border: 'none',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                      bgcolor: 'white',
                    }}
                  >
                    <Box sx={{ p: 2 }}>
                      {d.video?.url && <VideoPlayer url={d.video.url} />}
                    </Box>
                    <CardContent sx={{ p: 3, pt: 1, textAlign: 'center' }}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: 'var(--primary)',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          fontFamily: 'var(--font-heading)'
                        }}
                      >
                        {d.drill || 'Drill'}
                      </Typography>
                    </CardContent>
                  </Card>
                </Fade>
              ))}
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3, mt: 8 }}>
              <Button
                onClick={handlePrevious}
                disabled={page === 1}
                variant="outlined"
                sx={{
                  borderRadius: '50px',
                  px: 4,
                  py: 1.5,
                  borderColor: 'var(--primary)',
                  color: 'var(--primary)',
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: 'var(--primary)',
                    color: 'white',
                    borderColor: 'var(--primary)',
                  }
                }}
              >
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={!hasMore}
                variant="contained"
                sx={{
                  bgcolor: 'var(--accent)',
                  color: 'black',
                  borderRadius: '50px',
                  px: 4,
                  py: 1.5,
                  fontWeight: 700,
                  fontFamily: 'var(--font-heading)',
                  '&:hover': {
                    bgcolor: '#fbbf24',
                  }
                }}
              >
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