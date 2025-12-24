import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Box, Typography, Container, Button, Fade, CircularProgress, Card } from '@mui/material';
import { strapiApiUrl } from '../config/api';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchImages = async (page) => {
    try {
      const response = await fetch(
        `${strapiApiUrl}/galleries?populate=*&pagination[page]=${page}&pagination[pageSize]=10`
      );
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setImages(data.data);
      setHasMore(data.data.length === 10);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchImages(page);
  }, [page]);

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

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
              Photo <span className="gradient-text">Gallery</span>
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
              Capturing moments of passion, dedication, and victory.
            </Typography>
          </Box>
        </Fade>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: 'var(--accent)' }} />
          </Box>
        ) : images.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
              No images found.
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
              {images.map((image, index) => (
                <Fade in={true} timeout={1000 + index * 100} key={image.id}>
                  <Card
                    className="card-hover"
                    sx={{
                      borderRadius: '24px',
                      overflow: 'hidden',
                      border: 'none',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                      bgcolor: 'white',
                      height: '100%'
                    }}
                  >
                    <Box sx={{ position: 'relative', overflow: 'hidden', paddingTop: '75%' }}>
                      <Box sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                        <LazyLoadImage
                          src={`${image.gallery.url}`}
                          alt={image.title || 'Gallery Image'}
                          effect="blur"
                          width="100%"
                          height="100%"
                          style={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                            transition: 'transform 0.6s ease',
                          }}
                          className="gallery-image"
                        />
                      </Box>
                    </Box>
                  </Card>
                </Fade>
              ))}
            </Box>

            {/* Navigation Buttons */}
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
                    bgcolor: '#fbbf24', // Slightly darker amber
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

export default Gallery;