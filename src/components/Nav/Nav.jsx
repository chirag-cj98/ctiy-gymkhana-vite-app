import React, { useState } from 'react';
import { AppBar, Container, Box, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Avatar } from '@mui/material';
import { NavLink } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import InstagramIcon from '@mui/icons-material/Instagram';
import './Nav.css';  // Assuming you want to keep custom CSS
import logo from '../../assets/cgca.jpeg'

const Nav = () => {
  const [open, setOpen] = useState(false);

  // Toggle Drawer open/close
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        boxShadow: '0 4px 8px rgba(255, 255, 255, 0.49)', 
        backgroundColor: 'rgb(37, 35, 35)', // Yellow background
        color: 'red',
        marginTop: '-8px',
        width: '100%',
        padding: '10px',
        marginX: '0',
        opacity: 1, 
      }  
    }
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Logo */}
            <Avatar
              src={logo} // Use your logo here
              alt="City Gymkhana Logo"
              sx={{ 
                width: 50, 
                height: 50, 
                borderRadius: '50%', // Circular logo
                border: '2px solid #FFD700', // Gold border
              }}
            />

            {/* Title */}
            <Typography variant="h4" sx={{
              fontSize: {
                xs: '1.2rem', // Font size for mobile
                sm: '2rem', // Font size for small screens
              }, 
              fontWeight: '700', 
              backgroundImage: 'linear-gradient(to right, red 0%, yellow 70%, gold 30%)', 
              WebkitBackgroundClip: 'text', 
              backgroundClip: 'text', 
              color: 'transparent', 
              fontFamily: 'Charm, cursive'}}>

                City Gymkhana {/* Gold Text */}

            </Typography>
          </Box>

            {/* NavLinks for Desktop */}
          <Box className="nav-links" sx={{ display: { xs: 'none', sm: 'flex' }, gap: 3 }}>
            <NavLink to="/" className="nav-link" style={{paddingLeft: '2rem'}}>Home</NavLink>
            <NavLink to="/about" className="nav-link">About</NavLink>
            <NavLink to="/facility" className="nav-link">Facility</NavLink>
            <NavLink to="/contact-us" className="nav-link">Contact</NavLink>
            <NavLink to="/achievments" className="nav-link">Achievments</NavLink>
            <NavLink to="/gallery" className="nav-link">Gallery</NavLink>
            <NavLink
              to="https://docs.google.com/forms/d/e/1FAIpQLScMGUDhw1aR9925FckHcPAE1xcwxLHf_nEZmmW4d6PHKYblhg/viewform" // Replace with your Google Form URL
              className="nav-link"
              target="_blank"
              rel="noopener noreferrer"
              style={{paddingRight: '2rem'}}
            >
            Feedback 
            </NavLink>
          </Box>

          {/* Instagram Icon */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" onClick={() => window.open('https://www.instagram.com/city.gymkhana', '_blank')}>
              <InstagramIcon />
            </IconButton>
          </Box>

          {/* Hamburger Menu - visible only on mobile */}
          <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
            <IconButton color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Drawer for Hamburger Menu (Mobile View) */}
      <Drawer 
        anchor="right" 
        open={open} 
        onClose={toggleDrawer} 
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: '#c70404',  // Dark background for the drawer
            color: 'white',  // White text
            width: 250,  // Drawer width
            transition: 'all 0.3s ease',  // Smooth transition
          }
        }}
      >
        <Box role="presentation" onClick={toggleDrawer}>
          <List>
            <ListItem button>
              <ListItemText>
                <NavLink to="/" className="nav-link" onClick={toggleDrawer}>Home</NavLink>
              </ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemText>
                <NavLink to="/about" className="nav-link" onClick={toggleDrawer}>About</NavLink>
              </ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemText>
                <NavLink to="/facility" className="nav-link" onClick={toggleDrawer}>Facility</NavLink>
              </ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemText>
                <NavLink to="/contact-us" className="nav-link" onClick={toggleDrawer}>Contact</NavLink>
              </ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemText>
                <NavLink to="/achievments" className="nav-link" onClick={toggleDrawer}>Achievements</NavLink>
              </ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemText>
                <NavLink to="/gallery" className="nav-link" onClick={toggleDrawer}>Gallery</NavLink>
              </ListItemText>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Nav;
