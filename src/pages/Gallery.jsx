import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Box, Typography, Container, Button } from '@mui/material';
import appBg from '../assets/app-bg.jpg';
import { strapiApiUrl } from '../config/api';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Pagination state
  const [hasMore, setHasMore] = useState(true); // Track if more images are available

  // Fetch images with pagination
  const fetchImages = async (page) => {
    try {
      const response = await fetch(
        `${strapiApiUrl}/galleries?populate=*&pagination[page]=${page}&pagination[pageSize]=10` // Fetch 10 images per page
      );
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setImages(data.data); // Replace existing images with new ones
      setHasMore(data.data.length === 10); // Set hasMore to false if fewer than 10 images are returned
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  // Fetch images when the page changes
  useEffect(() => {
    fetchImages(page);
  }, [page]);

  // Handle Next button click
  const handleNext = () => {
    setPage((prev) => prev + 1);
  };

  // Handle Previous button click
  const handlePrevious = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  return (
    <Box
      sx={{
        background: `url(${appBg}) no-repeat center center fixed`,
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
            Gallery
          </Typography>

          {loading ? (
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
                color: '#e0e0e0',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              Loading...
            </Typography>
          ) : images.length === 0 ? (
            <Typography
              variant="h6"
              sx={{
                textAlign: 'center',
                color: '#e0e0e0',
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              No images found.
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
                {images.map((image) => (
                  <Box
                    key={image.id}
                    sx={{
                      borderRadius: '10px',
                      overflow: 'hidden',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.3)',
                      },
                    }}
                  >
                    <LazyLoadImage
                      src={`${strapiApiUrl}${image.gallery.url}`}
                      alt={image.title || 'Gallery Image'}
                      effect="blur"
                      width="100%"
                      height="auto"
                      style={{
                        borderRadius: '10px',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                ))}
              </Box>

              {/* Navigation Buttons */}
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
                  disabled={!hasMore} // Disable Next button if there are no more images
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

export default Gallery;