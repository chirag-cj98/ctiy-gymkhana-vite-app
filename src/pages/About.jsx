import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, Container, Card, CardMedia, CardContent, CircularProgress, Button, Fade, IconButton, Slide } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import { strapiApiUrl } from '../config/api';

const ImageCarousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState('left');

  const getImageUrl = (image) => {
    if (!image) return '';
    const url = image.attributes?.formats?.medium?.url ||
      image.attributes?.url ||
      image.formats?.medium?.url ||
      image.url;

    if (url && url.startsWith('/')) {
      return `${strapiApiUrl.replace('/api', '')}${url}`;
    }
    return url;
  };

  const handleNext = () => {
    setSlideDirection('left');
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setSlideDirection('right');
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <Box sx={{ position: 'relative', height: '100%', minHeight: '300px', width: '100%', overflow: 'hidden', borderRadius: '12px', bgcolor: 'var(--neutral-200)' }}>
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
            src={getImageUrl(image)}
            alt={`About image ${index + 1}`}
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

const SectionContainer = ({ title, description, images, index, id }) => {
  const isImageRight = index % 2 === 0;
  const isHeader = id === 'header';

  // Helper to normalize image array from Strapi response
  const normalizedImages = (() => {
    if (!images) return [];
    if (images.data) {
      return Array.isArray(images.data) ? images.data : [images.data];
    }
    return Array.isArray(images) ? images : [images];
  })();

  const hasImages = normalizedImages.length > 0;

  return (
    <Fade in={true} timeout={1000 + (index * 200)}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          mb: 8,
          py: { xs: 4, md: 8 },
          px: { xs: 3, md: 6 },
          background: isHeader ? 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)' : 'white',
          borderRadius: '24px',
          boxShadow: '0 20px 40px -10px rgba(0,0,0,0.05)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {isHeader && (
          <Box sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '5px',
            background: 'var(--gradient-accent)'
          }} />
        )}

        <Typography
          variant={isHeader ? "h2" : "h3"}
          sx={{
            fontFamily: 'var(--font-heading)',
            fontSize: isHeader ? { xs: '2.5rem', md: '4rem' } : { xs: '2rem', md: '2.5rem' },
            fontWeight: 800,
            color: 'var(--primary)',
            width: '100%',
            ...(isHeader && {
              background: 'var(--gradient-primary)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-1px',
            })
          }}
        >
          {title}
        </Typography>

        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: isImageRight ? 'row' : 'row-reverse' },
          gap: 6,
          alignItems: 'center',
          width: '100%'
        }}>
          <Box sx={{ flex: 1, width: '100%' }}>
            <Typography
              component="div"
              sx={{
                fontFamily: 'var(--font-body)',
                fontSize: isHeader ? { xs: '1.1rem', md: '1.25rem' } : { xs: '1rem', md: '1.1rem' },
                color: 'var(--neutral-800)',
                lineHeight: 1.8,
                '& p': { mb: 2 },
                '& strong': { fontWeight: 700, color: 'var(--primary)' },
                '& ul': { pl: 3, mb: 2 },
                '& li': { mb: 1 },
                '& h1, & h2, & h3': { fontFamily: 'var(--font-heading)', color: 'var(--primary)', mt: 3, mb: 2 }
              }}
            >
              <ReactMarkdown>{description}</ReactMarkdown>
            </Typography>
          </Box>

          {hasImages && (
            <Box sx={{ flex: 1, width: '100%', height: '400px', borderRadius: '12px', overflow: 'hidden' }}>
              <ImageCarousel images={normalizedImages} />
            </Box>
          )}
        </Box>
      </Box>
    </Fade>
  );
};

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
        // Wildcard populate to get all root level fields including images
        const aboutResponse = await fetch(`${strapiApiUrl}/about?populate=*`);
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
      }, 100);
    }
  }, [showCoaches]);

  useEffect(() => {
    if (showTeam && teamRef.current) {
      setTimeout(() => {
        teamRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [showTeam]);

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
        <Typography color="error" variant="h6">Error loading page: {error}</Typography>
      </Box>
    );
  }

  // Define the sections to render based on the flat API structure
  const sections = [
    // Header/Intro Section
    {
      id: 'header',
      title: about?.title || 'Our Legacy',
      description: about?.description,
      images: about?.descriptionImage
    },
    // About Us
    {
      id: 'about',
      title: about?.aboutTitle || 'About Us',
      description: about?.aboutDescription,
      images: about?.aboutImage
    },
    // Our Legacy
    {
      id: 'legacy',
      title: about?.legacy || 'Our Legacy',
      description: about?.legacyDescription,
      images: about?.legacyImage
    },
    // Training
    {
      id: 'training',
      title: about?.training || 'Training Philosophy',
      description: about?.trainingDescription,
      images: about?.trainingImage
    },
    // Tournaments
    {
      id: 'tournaments',
      title: about?.tournaments || 'Tournaments',
      description: about?.tournamentsDescription,
      images: about?.tournamentsImage
    },
    // Facilities
    {
      id: 'facilities',
      title: about?.facilities || 'Our Facilities',
      description: about?.facilitiesDescription,
      images: about?.facilitiesImage
    },
    // Organization
    {
      id: 'organization',
      title: about?.organization || 'Organization',
      description: about?.organizationDesciption, // Note: Typo in API field name 'Desciption' matches backend
      images: about?.organizationImage
    },
    // Outro
    {
      id: 'outro',
      title: about?.outro || 'Join Us',
      description: about?.outroDescription,
      images: about?.outroImage
    }
  ].filter(section => section.description); // Only render sections that have content

  return (
    <Box sx={{ bgcolor: 'var(--neutral-100)', minHeight: '100vh', pt: '100px', pb: 8 }}>
      <Container maxWidth="xl">
        {/* Render Dynamic Sections */}
        <Box sx={{ mb: 8 }}>
          {sections.map((section, index) => (
            <SectionContainer
              key={section.id}
              index={index}
              {...section}
            />
          ))}
        </Box>

        {/* Buttons */}
        <Box sx={{ textAlign: 'center', mb: 8, display: 'flex', justifyContent: 'center', gap: 3, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            onClick={() => setShowCoaches(!showCoaches)}
            sx={{
              bgcolor: showCoaches ? 'var(--accent)' : 'white',
              color: showCoaches ? 'black' : 'var(--primary)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              py: 1.5,
              px: 4,
              borderRadius: '50px',
              fontSize: '1rem',
              boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
              textTransform: 'none',
              border: '1px solid',
              borderColor: showCoaches ? 'var(--accent)' : 'rgba(0,0,0,0.1)',
              '&:hover': {
                bgcolor: 'var(--accent)',
                color: 'black',
                transform: 'translateY(-2px)',
                boxShadow: '0 15px 30px rgba(251, 191, 36, 0.2)',
              },
            }}
          >
            {showCoaches ? 'Hide Coaching Staff' : 'Meet Our Coaches'}
          </Button>
          <Button
            variant="contained"
            onClick={() => setShowTeam(!showTeam)}
            sx={{
              bgcolor: showTeam ? 'var(--accent-secondary)' : 'white',
              color: showTeam ? 'white' : 'var(--primary)',
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              py: 1.5,
              px: 4,
              borderRadius: '50px',
              fontSize: '1rem',
              boxShadow: '0 10px 20px rgba(0,0,0,0.05)',
              textTransform: 'none',
              border: '1px solid',
              borderColor: showTeam ? 'var(--accent-secondary)' : 'rgba(0,0,0,0.1)',
              '&:hover': {
                bgcolor: 'var(--accent-secondary)',
                color: 'white',
                transform: 'translateY(-2px)',
                boxShadow: '0 15px 30px rgba(239, 68, 68, 0.2)',
              },
            }}
          >
            {showTeam ? 'Hide Teams' : 'View Teams'}
          </Button>
        </Box>

        {/* Coaching Staff Section */}
        {showCoaches && (
          <Fade in={true}>
            <Box ref={coachesRef} sx={{ mb: 10 }}>
              <Typography
                variant="h3"
                sx={{
                  textAlign: 'center',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  mb: 6,
                  color: 'var(--primary)',
                }}
              >
                World-Class Coaching
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 4 }}>
                {coach.map((c) => (
                  <Card
                    key={c.id}
                    className="card-hover"
                    sx={{
                      borderRadius: '20px',
                      overflow: 'hidden',
                      border: 'none',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                      bgcolor: 'white',
                    }}
                  >
                    <Box sx={{ height: '300px', overflow: 'hidden' }}>
                      <CardMedia
                        component="img"
                        height="100%"
                        image={c.image?.formats?.medium?.url || c.image?.url}
                        alt={c.name}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease',
                          '&:hover': { transform: 'scale(1.05)' }
                        }}
                      />
                    </Box>
                    <CardContent sx={{ p: 4 }}>
                      <Typography variant="h5" sx={{ fontFamily: 'var(--font-heading)', fontWeight: 700, mb: 1 }}>
                        {c.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: 'var(--accent-secondary)', fontWeight: 600, mb: 2, textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {c.role || 'Coach'}
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Age:</strong> {c.age}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Experience:</strong> {c.experience}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          </Fade>
        )}

        {/* Team Section */}
        {showTeam && (
          <Fade in={true}>
            <Box ref={teamRef} sx={{ mb: 10 }}>
              <Typography
                variant="h3"
                sx={{
                  textAlign: 'center',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  mb: 6,
                  color: 'var(--primary)',
                }}
              >
                Our Champions
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 4 }}>
                {teams.map((team) => (
                  <Card
                    key={team.id}
                    className="card-hover"
                    sx={{
                      borderRadius: '20px',
                      overflow: 'hidden',
                      border: 'none',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                      bgcolor: 'white',
                    }}
                  >
                    <Box sx={{ height: '280px', overflow: 'hidden', position: 'relative' }}>
                      <Box sx={{
                        position: 'absolute',
                        top: 15,
                        right: 15,
                        bgcolor: 'var(--accent)',
                        color: 'black',
                        fontWeight: 700,
                        py: 0.5,
                        px: 2,
                        borderRadius: '20px',
                        zIndex: 2,
                        fontSize: '0.8rem'
                      }}>
                        {team.year}
                      </Box>
                      <CardMedia
                        component="img"
                        height="100%"
                        image={team.captainImage?.formats?.medium?.url || team.captainImage?.url}
                        alt={team.captainName}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'transform 0.5s ease',
                          '&:hover': { transform: 'scale(1.05)' }
                        }}
                      />
                    </Box>
                    <CardContent sx={{ p: 4 }}>
                      <Typography variant="h5" sx={{ fontFamily: 'var(--font-heading)', fontWeight: 700, mb: 1 }}>
                        {team.teamName}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ color: 'text.secondary', mb: 2 }}>
                        Captain: <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{team.captainName}</span>
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </Box>
          </Fade>
        )}
      </Container>
    </Box>
  );
};

export default About;