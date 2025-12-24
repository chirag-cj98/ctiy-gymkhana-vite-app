import React, { useState, useEffect } from 'react';
import { AppBar, Container, Box, Toolbar, Typography, IconButton, Drawer, List, ListItem, Avatar, Link, Menu, MenuItem, useScrollTrigger } from '@mui/material';
import { NavLink as RouterNavLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import InstagramIcon from '@mui/icons-material/Instagram';
import logo from '../../assets/cgca.jpg';
import { strapiApiUrl } from '../../config/api';
import './Nav.css';

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [detailsData, setDetailsData] = useState({
    scheduleLink: '/schedule',
    feedbackLink: 'https://docs.google.com/forms/u/0/'
  });

  // Fetch dynamic links
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`${strapiApiUrl}/other-detail?populate=*`);
        if (response.ok) {
          const data = await response.json();
          if (data.data) {
            setDetailsData({
              scheduleLink: data.data.scheduleLink || '/schedule',
              feedbackLink: data.data.feedbackLink || 'https://docs.google.com/forms/u/0/'
            });
          }
        }
      } catch (error) {
        console.error("Failed to fetch other details:", error);
      }
    };
    fetchDetails();
  }, []);

  // Handling scroll for navbar transparency effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const timeoutRef = React.useRef(null);

  const handleMenuOpen = (event) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    timeoutRef.current = setTimeout(() => {
      setAnchorEl(null);
    }, 200);
  };

  const handleMenuEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Facility', path: '/facility' },
    { title: 'Events', path: '/events' },
    { title: 'Achievements', path: '/achievments' },
    { title: 'Gallery', path: '/gallery' },
    { title: 'Supporters', path: '/supporters' },
    { title: 'KSCA history', path: '/ksca-history' },
  ];

  const detailsLinks = [
    { title: 'Schedule', path: detailsData.scheduleLink, isExternal: true },
    { title: 'Contact', path: '/contact-us' },
    { title: 'Feedback', path: detailsData.feedbackLink, isExternal: true },
  ];

  return (
    <AppBar
      position="fixed"
      className={`transition-all duration-300 ${scrolled ? 'glass-dark py-2' : 'bg-transparent py-4'}`}
      sx={{
        boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.1)' : 'none',
        background: scrolled ? 'rgba(15, 23, 42, 0.95)' : 'rgba(15, 23, 42, 0.95)', // Always dark for contrast or transparent if we want over banner
        backdropFilter: 'blur(12px)',
        color: 'white',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar className="flex items-center justify-between">
          {/* Logo & Title Section */}
          <Box
            component={RouterNavLink}
            to="/"
            sx={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}
          >
            <Avatar
              src={logo}
              alt="City Gymkhana Logo"
              sx={{
                width: { xs: 45, md: 55 },
                height: { xs: 45, md: 55 },
                border: '2px solid var(--accent)',
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'rotate(10deg)' }
              }}
            />

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h5" sx={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                letterSpacing: '1px',
                lineHeight: 1,
                color: 'white',
                textTransform: 'uppercase',
                fontSize: { xs: '1.2rem', md: '1.5rem' }
              }}>
                City <span style={{ color: 'var(--accent)' }}>Gymkhana</span>
              </Typography>
            </Box>
          </Box>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: '2rem' }}>
            <Box sx={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              {navLinks.map((link) => (
                <Link
                  key={link.title}
                  component={RouterNavLink}
                  to={link.path}
                  underline="none"
                  sx={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    color: location.pathname === link.path ? 'var(--accent)' : 'rgba(255,255,255,0.8)',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    '&:hover': {
                      color: 'var(--accent)',
                      transform: 'translateY(-2px)'
                    },
                    '&::after': location.pathname === link.path ? {
                      content: '""',
                      position: 'absolute',
                      bottom: -4,
                      left: 0,
                      width: '100%',
                      height: '2px',
                      background: 'var(--accent)',
                      borderRadius: '2px'
                    } : {}
                  }}
                >
                  {link.title}
                </Link>
              ))}

              <Box
                component="span"
                onMouseEnter={handleMenuOpen}
                onMouseLeave={handleMenuClose}
                sx={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '0.95rem',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.8)',
                  transition: 'color 0.3s ease',
                  '&:hover': { color: 'var(--accent)' }
                }}
                aria-controls={openMenu ? 'details-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? 'true' : undefined}
              >
                Details
              </Box>
              <Menu
                id="details-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                  onMouseEnter: handleMenuEnter,
                  onMouseLeave: handleMenuClose,
                }}
                sx={{
                  pointerEvents: 'none',
                  '& .MuiPaper-root': {
                    pointerEvents: 'auto',
                    backgroundColor: 'rgba(15, 23, 42, 0.95)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: 'white',
                    mt: 1,
                    minWidth: 150,
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px -10px rgba(0,0,0,0.5)'
                  }
                }}
              >
                {detailsLinks.map((link) => (
                  <MenuItem
                    key={link.title}
                    onClick={handleMenuClose}
                    sx={{
                      fontSize: '0.9rem',
                      fontFamily: 'var(--font-body)',
                      '&:hover': {
                        backgroundColor: 'rgba(251, 191, 36, 0.1)',
                        color: 'var(--accent)'
                      }
                    }}
                  >
                    {link.isExternal ? (
                      <Link
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        color="inherit"
                        underline="none"
                        sx={{ width: '100%' }}
                      >
                        {link.title}
                      </Link>
                    ) : (
                      <Link
                        component={RouterNavLink}
                        to={link.path}
                        color="inherit"
                        underline="none"
                        sx={{ width: '100%' }}
                      >
                        {link.title}
                      </Link>
                    )}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <IconButton
              onClick={() => window.open('https://www.instagram.com/city.gymkhana', '_blank')}
              sx={{
                color: 'white',
                background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                '&:hover': { transform: 'scale(1.1)' },
                transition: 'transform 0.3s ease',
                width: 40,
                height: 40,
              }}
            >
              <InstagramIcon sx={{ fontSize: 24 }} />
            </IconButton>
          </Box>

          {/* Mobile Menu Button */}
          <Box sx={{ display: { xs: 'flex', lg: 'none' } }}>
            <IconButton
              onClick={toggleDrawer}
              sx={{ color: 'var(--accent)' }}
            >
              <MenuIcon fontSize="large" />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: '300px',
            background: 'var(--primary)',
            color: 'white'
          }
        }}
      >
        <Box sx={{ p: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
            <Avatar
              src={logo}
              sx={{ width: 80, height: 80, border: '2px solid var(--accent)' }}
            />
          </Box>
          <List>
            {navLinks.map((link) => (
              <ListItem key={link.title} disablePadding sx={{ mb: 2 }}>
                <Link
                  component={RouterNavLink}
                  to={link.path}
                  onClick={toggleDrawer}
                  underline="none"
                  sx={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: location.pathname === link.path ? 'var(--accent)' : 'white',
                    width: '100%',
                    textAlign: 'center'
                  }}
                >
                  {link.title}
                </Link>
              </ListItem>
            ))}
            {detailsLinks.map((link) => (
              <ListItem key={link.title} disablePadding sx={{ mb: 2 }}>
                <Link
                  href={link.isExternal ? link.path : undefined}
                  component={link.isExternal ? 'a' : RouterNavLink}
                  to={!link.isExternal ? link.path : undefined}
                  target={link.isExternal ? "_blank" : undefined}
                  rel={link.isExternal ? "noopener noreferrer" : undefined}
                  onClick={toggleDrawer}
                  underline="none"
                  sx={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    color: 'rgba(255,255,255,0.7)',
                    width: '100%',
                    textAlign: 'center'
                  }}
                >
                  {link.title}
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Nav;
