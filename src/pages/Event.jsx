import React, { useState, useEffect } from 'react';
import { strapiApiUrl } from '../config/api';
import { Box, Typography, Container, Card, CardContent, CardMedia, CircularProgress, Button, IconButton, Grid as Grid2, Slide } from '@mui/material';
import { ChevronLeft, ChevronRight, CalendarToday } from '@mui/icons-material';

const ImageCarousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('left');

  const handleNext = () => {
    setSlideDirection('left');
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setSlideDirection('right');
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) {
    return (
      <CardMedia
        component="div"
        sx={{
          height: 250,
          backgroundColor: '#e0e0e0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#9e9e9e',
        }}
      >
        <Typography>No Image</Typography>
      </CardMedia>
    );
  }

  return (
    <Box sx={{ position: 'relative', height: 500, overflow: 'hidden', backgroundColor: '#fff' }}>
      {images.map((image, index) => (
        <Slide
          key={index}
          direction={slideDirection}
          in={activeIndex === index}
          mountOnEnter
          unmountOnExit
          timeout={500}
        >
          <CardMedia
            component="img"
            image={image.url}
            alt={`Event image ${index + 1}`}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              objectFit: 'contain',
              backgroundColor: '#fff',
            }}
          />
        </Slide>
      ))}
      {images.length > 1 && (
        <>
          <IconButton
            onClick={handlePrev}
            sx={{
              position: 'absolute',
              top: '50%',
              left: 8,
              transform: 'translateY(-50%)',
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
            }}
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              top: '50%',
              right: 8,
              transform: 'translateY(-50%)',
              color: 'white',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
            }}
          >
            <ChevronRight />
          </IconButton>
        </>
      )}
    </Box>
  );
};

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${strapiApiUrl}/events?populate=*`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const eventsData = await response.json();
        setEvents(eventsData.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #eef2f7 100%)' }}>
        <CircularProgress sx={{ color: '#c70404' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #eef2f7 100%)' }}>
        <Typography color="error">Error loading events: {error.message}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #eef2f7 100%)', py: { xs: 4, md: 8 }, minHeight: '100vh' }}>
      <Container maxWidth="xl">
        <Typography
          variant="h2"
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
            fontWeight: 700,
            color: '#c70404',
            textAlign: 'center',
            mb: 6,
            textTransform: 'uppercase',
            letterSpacing: '2px',
          }}
        >
          Our Events
        </Typography>

        {events.length === 0 ? (
          <Typography variant="h6" sx={{ textAlign: 'center', color: '#555' }}>
            No events available at the moment. Please check back later!
          </Typography>
        ) : (
          <Grid2 container spacing={4}>
            {events.map((event) => {
              const images = event.eventMedia ? (Array.isArray(event.eventMedia) ? event.eventMedia : [event.eventMedia]) : [];
              return (
                <Grid2 item key={event.id} xs={12} sm={6}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: '12px',
                      boxShadow: '0 8px 24px rgba(149, 157, 165, 0.2)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 12px 28px rgba(149, 157, 165, 0.25)',
                      },
                    }}
                  >
                    <ImageCarousel images={images} />
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography variant="h5" component="h2" sx={{ fontWeight: 600, fontFamily: 'Poppins, sans-serif', color: '#2c3e50', mb: 1.5 }}>
                        {event.Title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: '60px' }}>
                        {event.description}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', mb: 2 }}>
                        <CalendarToday sx={{ fontSize: '1rem', mr: 1 }} />
                        <Typography variant="body2">
                          {event.startDatetime ? new Date(event.startDatetime).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }) : 'Date TBD'}
                          {' '} - {' '}
                          {event.endDatetime ? new Date(event.endDatetime).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true }) : 'Date TBD'}
                        </Typography>
                      </Box>
                    </CardContent>
                    <Box sx={{ p: 3, pt: 0 }}>
                      <Button
                        variant="contained"
                        // disabled={true}
                        sx={{
                          backgroundColor: '#c70404',
                          '&:hover': { backgroundColor: '#a50303' },
                          fontWeight: 'bold',
                          fontFamily: 'Poppins, sans-serif',
                        }}
                      >
                        Winners are {event.Winners}
                      </Button>
                    </Box>
                  </Card>
                </Grid2>
              );
            })}
          </Grid2>
        )}
      </Container>
    </Box>
  );
};

export default EventsPage;