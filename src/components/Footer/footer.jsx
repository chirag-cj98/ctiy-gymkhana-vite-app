import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import { NavLink as RouterNavLink } from 'react-router-dom';
import logo from '../../assets/cgca.jpg';
import { strapiApiUrl } from '../../config/api';

const Footer = () => {
  const [contactData, setContactData] = useState({
    address: 'City Gymkhana, Bangalore',
    phone: '',
    email: '',
  });

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const response = await fetch(`${strapiApiUrl}/other-detail?populate=*`);
        if (response.ok) {
          const data = await response.json();
          if (data.data) {
            setContactData({
              address: data.data.address || 'CITY GYMKHANA, Kenchena Halli Road, Rajarajeshwari Nagar, Bengaluru, Karnataka 560098',
              phone: `${data.data.contactPhone1}${data.data.contactPhone2 ? `, ${data.data.contactPhone2}` : ''}`,
              email: data.data.contactEmail || 'Gymkhanacity@gmail.com',
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch footer contact details:", error);
      }
    };
    fetchContactDetails();
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Facility', path: '/facility' },
    { name: 'Achievements', path: '/achievments' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact-us' },
  ];

  const linkStyles = {
    color: '#e0e0e0',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#FFD700',
    },
    display: 'block',
    mb: 1,
    fontFamily: 'Poppins, sans-serif',
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1a1a1a',
        color: '#e0e0e0',
        py: { xs: 4, md: 6 },
        borderTop: '3px solid #c70404',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={5} justifyContent="space-between">
          {/* Column 1: Brand and Contact */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                component="img"
                src={logo}
                alt="City Gymkhana Logo"
                sx={{ height: 50, width: 50, borderRadius: '50%', mr: 2 }}
              />
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: 'bold', color: '#FFD700', fontFamily: 'Poppins, sans-serif' }}
              >
                City Gymkhana
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 1, fontFamily: 'Poppins, sans-serif' }}>
              Address: {contactData.address}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1, fontFamily: 'Poppins, sans-serif' }}>
              Phone: {contactData.phone || '+91 9901029957, +91 9972278833'}
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: 'Poppins, sans-serif' }}>
              Email: {contactData.email}
            </Typography>
          </Grid>

          {/* Column 2: Quick Links */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', mb: 2, textTransform: 'uppercase' }}>
              Quick Links
            </Typography>
            {navLinks.map((link) => (
              <Link component={RouterNavLink} to={link.path} key={link.name} sx={linkStyles}>
                {link.name}
              </Link>
            ))}
          </Grid>

          {/* Column 3: Social Media */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', mb: 2, textTransform: 'uppercase' }}>
              Follow Us
            </Typography>
            <IconButton
              color="inherit"
              aria-label="Instagram"
              onClick={() => window.open('https://www.instagram.com/city.gymkhana', '_blank')}
              sx={{
                color: 'white',
                '&:hover': { color: '#FFD700', transform: 'scale(1.1)' },
                transition: 'all 0.3s ease',
              }}
            >
              <InstagramIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ fontFamily: 'Poppins, sans-serif' }}>
            © Copyright City Gymkhana {new Date().getFullYear()}. All Rights Reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;