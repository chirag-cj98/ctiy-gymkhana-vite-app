import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Fade, CircularProgress, Paper } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { strapiApiUrl } from '../config/api';

const Contact = () => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [contactData, setContactData] = useState({
    address: 'City Gymkhana, Bangalore',
    phone: '',
    email: '',
    timings: 'Mon-Sun, 9:00 AM - 6:00 PM'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await fetch(`${strapiApiUrl}/other-detail?populate=*`);
        if (response.ok) {
          const data = await response.json();
          if (data.data) {
            setContactData({
              address: data.data.address || 'City Gymkhana, Bangalore',
              phone: `${data.data.contactPhone1}${data.data.contactPhone2 ? `, ${data.data.contactPhone2}` : ''}`,
              email: data.data.contactEmail || 'Gymkhanacity@gmail.com',
              timings: 'Mon-Sun, 9:00 AM - 6:00 PM' // API doesn't seem to have timings, keeping hardcoded
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch contact details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContactDetails();
  }, []);

  const contactItems = [
    { label: 'Address', value: contactData.address, icon: <LocationOnIcon /> },
    { label: 'Phone', value: contactData.phone, icon: <PhoneIcon /> },
    { label: 'Email', value: contactData.email, icon: <EmailIcon /> },
    { label: 'Timings', value: contactData.timings, icon: <AccessTimeIcon /> },
  ];

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  return (
    <Box sx={{ bgcolor: 'var(--neutral-100)', pt: '100px', pb: 8, minHeight: '100vh' }}>
      <Container maxWidth="xl">
        <Fade in={true} timeout={1500}>
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
              Get in <span className="gradient-text">Touch</span>
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontFamily: 'var(--font-body)',
                fontSize: { xs: '1.1rem', md: '1.25rem' },
                color: 'text.secondary',
                maxWidth: '700px',
                mx: 'auto',
              }}
            >
              Visit us at our location and become a part of the City Gymkhana School of Cricket!
            </Typography>
          </Box>
        </Fade>

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 6,
          }}
        >
          {/* Map Section */}
          <Fade in={true} timeout={2000}>
            <Box
              sx={{
                flex: 1.5,
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
                bgcolor: 'white',
                position: 'relative',
                minHeight: '450px',
              }}
            >
              {!mapLoaded && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                    width: '100%',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bgcolor: 'var(--neutral-100)',
                  }}
                >
                  <CircularProgress sx={{ color: 'var(--accent)' }} />
                </Box>
              )}
              <Box
                component="iframe"
                width="100%"
                height="100%"
                src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Jnanakshi%20Vidyaniketan%20school,%20Rr%20nagar+(City%20Gymkhana%20School%20of%20Cricket)&t=&z=14&ie=UTF8&iwloc=B&output=embed"
                title="Google Map Location"
                onLoad={handleMapLoad}
                sx={{
                  border: 'none',
                  minHeight: '450px',
                  filter: 'grayscale(20%) contrast(1.2)'
                }}
              />
            </Box>
          </Fade>

          {/* Contact Details Section */}
          <Fade in={true} timeout={2500}>
            <Paper
              elevation={0}
              sx={{
                flex: 1,
                bgcolor: 'white',
                p: { xs: 4, md: 6 },
                borderRadius: '24px',
                boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  color: 'var(--primary)',
                  mb: 4,
                }}
              >
                Contact Details
              </Typography>

              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress sx={{ color: 'var(--accent)' }} />
                </Box>
              ) : (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {contactItems.map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box sx={{
                        bgcolor: 'var(--neutral-100)',
                        p: 1.5,
                        borderRadius: '50%',
                        color: 'var(--primary)',
                        display: 'flex'
                      }}>
                        {item.icon}
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" sx={{ color: 'var(--accent-secondary)', fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', mb: 0.5 }}>
                          {item.label}
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'var(--neutral-800)', fontWeight: 500, fontFamily: 'var(--font-body)' }}>
                          {item.value}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </Paper>
          </Fade>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;