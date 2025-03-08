import { Button, Box, Typography, Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import VideoPlayer from '../components/video-player';
import appBg from '../assets/app-bg.jpg';
import { strapiApiUrl } from '../config/api';

const Training = () => {
  const location = useLocation();
  const [drills, setDrills] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // Track if more drills are available

  const fetchTrainingVideos = async () => {
    const { id } = location.state; // Get the training ID from location state
    console.log('Training ID:', id);

    try {
      const response = await fetch(
        `${strapiApiUrl}/trainings?populate=*&filters[trainingTitle]=${id}&pagination[page]=${page}&pagination[pageSize]=5`
      );
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setDrills(data.data); // Set the drills data
      setHasMore(data.data.length === 5); // Set hasMore to false if fewer than 5 drills are returned
    } catch (err) {
      console.error('Error fetching training videos:', err);
    }
  };

  // Handle Next button click
  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  // Handle Previous button click
  const handlePrevious = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  // Fetch training videos when the page changes
  useEffect(() => {
    fetchTrainingVideos();
  }, [page]);

  return (
    <Box
      sx={{
        background: `url(${appBg}) no-repeat center center fixed`, // Add your background image
        backgroundSize: 'cover',
        paddingTop: '60px',
        paddingBottom: '60px',
        color: 'white',
        width: '100%',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            backgroundColor: 'rgba(26, 26, 26, 0.8)',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0px 12px 24px rgba(0, 0, 0, 0.2)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': {
              transform: 'scale(1.02)',
              boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.15)',
            },
            marginBottom: '40px',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: '#e0e0e0',
              fontSize: '2.5rem',
              marginBottom: '20px',
              fontWeight: 'bold',
              fontFamily: 'Poppins, sans-serif',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          >
            {location.state.id}
          </Typography>

          {drills.length === 0 ? (
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
                color: '#e0e0e0',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              No drills found.
            </Typography>
          ) : (
            <>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                  gap: '20px',
                }}
              >
                {drills.map((d) => (
                  <Box
                    key={d.id}
                    sx={{
                      borderRadius: '10px',
                      overflow: 'hidden',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.3)',
                      },
                      backgroundColor: 'rgba(51, 51, 51, 0.8)',
                      padding: '16px',
                    }}
                  >
                    {d.video.url && (
                      <VideoPlayer url={`${d.video.url}`} />
                    )}
                    <Typography
                      variant="h6"
                      sx={{
                        marginTop: '10px',
                        textAlign: 'center',
                        color: '#e0e0e0',
                        fontFamily: 'Poppins, sans-serif',
                      }}
                    >
                      {d.drill || 'No drill name available'}
                    </Typography>
                  </Box>
                ))}
              </Box>

              {/* Pagination Buttons */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '20px',
                  marginTop: '20px',
                }}
              >
                <Button
                  onClick={handlePrevious}
                  disabled={page === 1} // Disable Previous button on the first page
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
                    '&:disabled': {
                      backgroundColor: '#555',
                      color: '#888',
                      cursor: 'not-allowed',
                    },
                  }}
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={!hasMore} // Disable Next button if there are no more drills
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
                    '&:disabled': {
                      backgroundColor: '#555',
                      color: '#888',
                      cursor: 'not-allowed',
                    },
                  }}
                >
                  Next
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Training;