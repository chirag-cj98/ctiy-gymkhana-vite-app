import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Fade, Card, CardMedia, CardContent } from '@mui/material';
import './About.css'; // Import the About-specific CSS file
import Team from '../components/Team/Team';
import { strapiApiUrl } from '../config/api';

const About = () => {
  const [about, setAbout] = useState({});
  const [coach, setCoach] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fromPromise = await fetch(`${strapiApiUrl}/about`);
        if (fromPromise) {
          const about = await fromPromise.json();
          setAbout(about.data);
        }
        const fromCoach = await fetch(`${strapiApiUrl}/coaches?populate=*`);
        if (fromCoach) {
          const bio = await fromCoach.json();
          setCoach(bio.data);
        }
      } catch (err) {
        console.log('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  return (
    <Box className="about-container">
      <Container maxWidth="xl">
        <Fade in={true} timeout={1500}>
          <Box className="about-content">
            <Typography variant="h2" className="about-title glowing-text">
              {about.title}
            </Typography>
            <Typography variant="body1" className="about-description">
              {about.description}
            </Typography>
          </Box>
        </Fade>

        {/* Coaching Staff Section */}
        <Fade in={true} timeout={1500}>
          <Box className="coaching-staff-section">
            <Typography variant="h3" className="coaching-staff-title glowing-text">
              Coaching Staff
            </Typography>
            <Box className="coach-container">
              {coach.map((c) => (
                <Card key={c.id} className="coach-card">
                  <CardMedia
                    component="img"
                    height="200"
                    image={`${c.image.formats.thumbnail.url}`}
                    alt={c.name}
                    className="coach-image"
                  />
                  <CardContent className="coach-info">
                    <Typography variant="h5" className="coach-name">
                      {c.name}
                    </Typography>
                    <Typography variant="body1" className="coach-detail">
                      <strong>Age:</strong> {c.age}
                    </Typography>
                    <Typography variant="body1" className="coach-detail">
                      <strong>Experience:</strong> {c.experience}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </Box>
        </Fade>
        {/* team section */}
        { coach && <Team/> }
      </Container>
    </Box>
  );
};

export default About;