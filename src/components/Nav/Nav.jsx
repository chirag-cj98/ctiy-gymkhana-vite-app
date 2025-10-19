import React, { useState } from 'react';
import { AppBar, Container, Box, Toolbar, Typography, IconButton, Drawer, List, ListItem, Avatar, Link } from '@mui/material';
import { NavLink as RouterNavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import InstagramIcon from '@mui/icons-material/Instagram'; 
import logo from '../../assets/cgca.jpg'

const Nav = () => {
  const [open, setOpen] = useState(false);

  // MUI-compatible sx prop for desktop navigation links
  const desktopLinkStyles = {
    color: 'white',
    fontSize: '1.25rem', // equiv. to text-xl
    fontWeight: 'bold',
    fontFamily: 'Poppins, sans-serif',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      color: '#ffdd00',
      transform: 'scale(1.1)',
    },
    // Style for the active NavLink
    '&.active': {
      color: '#ffdd00',
    },
  };

  // MUI-compatible sx prop for mobile drawer links
  const drawerLinkStyles = {
    display: 'block',
    width: '100%',
    padding: '12px 16px',
    color: 'rgb(31 41 55)', // text-gray-800
    textDecoration: 'none',
    fontWeight: 'bold',
    fontFamily: 'Poppins, sans-serif',
    fontSize: '1.125rem', // text-lg
    '&:hover': {
      color: '#2563eb', // text-blue-600
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
    '&.active': {
      color: '#2563eb', // text-blue-600
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
    },
  };

  // Toggle Drawer open/close
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <AppBar 
      position="sticky" 
      // Apply modern UI styles: semi-transparent background, backdrop blur, and a bottom border
      className="w-full transition-colors duration-300 ease-in-out"
      sx={{
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(200, 200, 200, 0.5)',
        color: '#2c3e50', // Set default text/icon color for the AppBar
      }}
    >
      <Container maxWidth="xl">
        <Toolbar className="flex items-center justify-between px-8 py-4">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Logo */}
            <Avatar
              src={logo} // Use your logo here
              alt="City Gymkhana Logo"
              className="h-[50px] w-[50px] rounded-full border-2 border-[#FFD700]"
            />

            {/* Title */}
            <Typography variant="h4" sx={{
              fontSize: {
                xs: '1.2rem', // Font size for mobile
                sm: '2rem', // Font size for small screens
              }, 
              fontWeight: '700',
              fontFamily: 'Rubik Distressed, system-ui',
              background: 'linear-gradient(45deg, #ffdd00 20%, #c70404 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
                City Gymkhana
            </Typography>
          </Box>

          {/* Right side of Navbar */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {/* NavLinks for Desktop */}
            <Box
              sx={{
                display: { xs: 'none', sm: 'flex' },
                alignItems: 'center',
                gap: '2rem',
                backgroundColor: '#c70404',
                padding: '0.75rem 1.5rem', // Equivalent to py-3 px-6
                borderRadius: '2rem',
                border: '3px solid #ffdd00',
              }}
            >
              <Link component={RouterNavLink} to="/" sx={desktopLinkStyles}>Home</Link>
              <Link component={RouterNavLink} to="/about" sx={desktopLinkStyles}>About</Link>
              <Link component={RouterNavLink} to="/facility" sx={desktopLinkStyles}>Facility</Link>
              <Link component={RouterNavLink} to="/contact-us" sx={desktopLinkStyles}>Contact</Link>
              <Link component={RouterNavLink} to="/events" sx={desktopLinkStyles}>Events</Link>
              <Link component={RouterNavLink} to="/achievments" sx={desktopLinkStyles}>Achievements</Link>
              <Link component={RouterNavLink} to="/gallery" sx={desktopLinkStyles}>Gallery</Link>
              <Link
                href="https://docs.google.com/forms/d/e/1FAIpQLScMGUDhw1aR9925FckHcPAE1xcwxLHf_nEZmmW4d6PHKYblhg/viewform" // Replace with your Google Form URL
                target="_blank"
                rel="noopener noreferrer"
                sx={desktopLinkStyles}
              >
              Feedback 
              </Link>
            </Box>

            {/* Instagram Icon */}
            <Box>
              <IconButton
                color="inherit"
                onClick={() => window.open('https://www.instagram.com/city.gymkhana', '_blank')}
                sx={{
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <InstagramIcon />
              </IconButton>
            </Box>

            {/* Hamburger Menu - visible only on mobile */}
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <IconButton color="inherit" onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </Container>

      {/* Drawer for Hamburger Menu (Mobile View) */}
      <Drawer 
        anchor="right" 
        open={open} 
        onClose={toggleDrawer} 
        slotProps={{
          paper: {
            className: 'w-[250px] transition-all duration-300 ease-in-out',
            sx: {
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
            },
          },
        }}
      >
        <Box role="presentation" onClick={toggleDrawer}>
          <List>
            <ListItem disablePadding>
              <Link component={RouterNavLink} to="/" sx={drawerLinkStyles}>Home</Link>
            </ListItem>
            <ListItem disablePadding>
              <Link component={RouterNavLink} to="/about" sx={drawerLinkStyles}>About</Link>
            </ListItem>
            <ListItem disablePadding>
              <Link component={RouterNavLink} to="/facility" sx={drawerLinkStyles}>Facility</Link>
            </ListItem>
            <ListItem disablePadding>
              <Link component={RouterNavLink} to="/contact-us" sx={drawerLinkStyles}>Contact</Link>
            </ListItem>
            <ListItem disablePadding>
              <Link component={RouterNavLink} to="/events" sx={drawerLinkStyles}>Events</Link>
            </ListItem>
            <ListItem disablePadding>
              <Link component={RouterNavLink} to="/achievments" sx={drawerLinkStyles}>Achievements</Link>
            </ListItem>
            <ListItem disablePadding>
              <Link component={RouterNavLink} to="/gallery" sx={drawerLinkStyles}>Gallery</Link>
            </ListItem>
            <ListItem disablePadding>
              <Link href="https://docs.google.com/forms/d/e/1FAIpQLScMGUDhw1aR9925FckHcPAE1xcwxLHf_nEZmmW4d6PHKYblhg/viewform" target="_blank" rel="noopener noreferrer" sx={drawerLinkStyles}>
                Feedback
              </Link>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Nav;
