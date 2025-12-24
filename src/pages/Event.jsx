import React, { useState, useEffect } from 'react';
import { strapiApiUrl } from '../config/api';
import { Box, Typography, Container, Card, CardContent, CardMedia, CircularProgress, Button, IconButton, Grid, Slide, Fade, Chip } from '@mui/material';
import { ChevronLeft, ChevronRight, CalendarToday, EmojiEvents } from '@mui/icons-material';

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
      <Box
        sx={{
          height: 250,
          bgcolor: 'var(--neutral-200)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--neutral-500)',
        }}
      >
        <Typography variant="body2">No Image Available</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ position: 'relative', height: 300, overflow: 'hidden', bgcolor: 'white' }}>
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
              objectFit: 'cover',
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
              left: 10,
              transform: 'translateY(-50%)',
              color: 'white',
              bgcolor: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(4px)',
              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.6)' },
            }}
          >
            <ChevronLeft />
          </IconButton>
          <IconButton
            onClick={handleNext}
            sx={{
              position: 'absolute',
              top: '50%',
              right: 10,
              transform: 'translateY(-50%)',
              color: 'white',
              bgcolor: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(4px)',
              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.6)' },
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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: 'var(--neutral-100)' }}>
        <CircularProgress sx={{ color: 'var(--accent)' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: 'var(--neutral-100)' }}>
        <Typography color="error">Error loading events: {error.message}</Typography>
      </Box>
    );
  }

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
                mb: 2,
                background: 'var(--gradient-primary)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-1px',
                textTransform: 'uppercase',
              }}
            >
              Upcoming <span className="gradient-text">Events</span>
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontFamily: 'var(--font-body)',
                color: 'text.secondary',
                maxWidth: '700px',
                mx: 'auto'
              }}
            >
              Mark your calendars for our exciting tournaments and club gatherings.
            </Typography>
          </Box>
        </Fade>

        {events.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
              No upcoming events scheduled. Stay tuned!
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {events.map((event, index) => {
              const images = event.eventMedia ? (Array.isArray(event.eventMedia) ? event.eventMedia : [event.eventMedia]) : [];
              return (
                <Grid item key={event.id} xs={12} md={6} lg={4}>
                  <Fade in={true} timeout={1000 + index * 200}>
                    <Card
                      className="card-hover"
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        borderRadius: '24px',
                        border: 'none',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                        overflow: 'hidden',
                        bgcolor: 'white',
                      }}
                    >
                      <ImageCarousel images={images} />

                      <CardContent sx={{ flexGrow: 1, p: 4 }}>
                        <Box sx={{ mb: 2 }}>
                          {event.Winners && (
                            <Chip
                              icon={<EmojiEvents sx={{ fontSize: '1.2rem !important' }} />}
                              label={`Winner: ${event.Winners}`}
                              sx={{
                                bgcolor: 'var(--accent)',
                                color: 'black',
                                fontWeight: 700,
                                mb: 2,
                                fontFamily: 'var(--font-heading)'
                              }}
                            />
                          )}
                        </Box>

                        <Typography variant="h5" component="h2" sx={{
                          fontWeight: 700,
                          fontFamily: 'var(--font-heading)',
                          color: 'var(--primary)',
                          mb: 2,
                          lineHeight: 1.3
                        }}>
                          {event.Title}
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', color: 'var(--accent-secondary)', mb: 3 }}>
                          <CalendarToday sx={{ fontSize: '1.2rem', mr: 1 }} />
                          <Typography variant="body2" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            {event.startDatetime ? new Date(event.startDatetime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'TBD'}
                            {' - '}
                            {event.endDatetime ? new Date(event.endDatetime).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'TBD'}
                          </Typography>
                        </Box>

                        <Typography variant="body1" sx={{ color: 'var(--neutral-600)', lineHeight: 1.7 }}>
                          {event.description}
                        </Typography>
                      </CardContent>

                      <Box sx={{ p: 4, pt: 0 }}>
                        <Button
                          fullWidth
                          variant="outlined"
                          sx={{
                            borderRadius: '50px',
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
                          Event Details
                        </Button>
                      </Box>
                    </Card>
                  </Fade>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default EventsPage;