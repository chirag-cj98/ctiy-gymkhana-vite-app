import React, { useEffect, useState } from 'react';
import { Box, Typography, Fade } from '@mui/material';
import VideoPlayer from '../components/video-player';
import { strapiApiUrl } from '../config/api';

const Section1 = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    fetch(`${strapiApiUrl}/home-page?populate=*`)
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then((data) => {
        const videoUrl = `${data.data.Video[0].url}`;
        setTitle(data.data.Title);
        setUrl(videoUrl);
      })
    //   .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: 'transparent',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.15)',
        },
        textAlign: 'center',
        marginBottom: '40px',
      }}
    >
      <Fade in={true} timeout={1500}>
        <Typography
          variant="h2"
          sx={{
            color: '#f1f1f1',
            fontSize: '2rem',
            marginBottom: '20px',
            fontWeight: 'bold',
            fontFamily: 'Poppins, sans-serif',
          }}
        >
          {title}
        </Typography>
      </Fade>

      {url && (
        <Box
          sx={{
            width: '80%',
            maxWidth: '800px',
            margin: '0 auto',
            borderRadius: '10px',
            overflow: 'hidden',
          }}
        >
          <VideoPlayer url={url} />
        </Box>
      )}
    </Box>
  );
};

export default Section1;