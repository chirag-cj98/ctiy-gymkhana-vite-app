import React, { useEffect, useState } from 'react';
import { Box, Typography, Fade, CircularProgress } from '@mui/material';
import VideoPlayer from '../components/video-player';
import { strapiApiUrl } from '../config/api';

const Section1 = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${strapiApiUrl}/home-page?populate=*`)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        if (data.data && data.data.Video && data.data.Video.length > 0) {
          const videoUrl = `${data.data.Video[0].url}`;
          setTitle(data.data.Title);
          setUrl(videoUrl);
        } else {
          throw new Error('Video data not found in API response');
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0)', // Semi-transparent dark background for visibility
        padding: { xs: '2rem', md: '3rem' }, // Responsive padding
        borderRadius: '12px',
        boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.3)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)', // Subtle lift on hover
          boxShadow: '0px 12px 30px rgba(0, 0, 0, 0.4)',
        },
        textAlign: 'center',
        marginBottom: '40px',
      }}
    >
      <Fade in={true} timeout={1500}>
        <Typography
          variant="h2"
          sx={{
            color: '#c70404', // Gold color to match theme and stand out
            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
            marginBottom: '30px',
            fontWeight: 'bold',
            fontFamily: 'Poppins, sans-serif',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
          }}
        >
          {title || 'Featured Video'}
        </Typography>
      </Fade>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
          <CircularProgress sx={{ color: '#FFD700' }} />
        </Box>
      ) : error ? (
        <Typography color="error" sx={{ mt: 4 }}>Could not load video: {error}</Typography>
      ) : url ? (
        <Box
          sx={{
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto',
            borderRadius: '10px',
            overflow: 'hidden',
            boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
          }}
        >
          <VideoPlayer url={url} />
        </Box>
      ) : null}
    </Box>
  );
};

export default Section1;