import React, { useState } from 'react';
import { Box, Typography, Container, Fade, CircularProgress } from '@mui/material';
import './Contact.css'; // Import the Contact-specific CSS file

const Contact = () => {
  const [mapLoaded, setMapLoaded] = useState(false);

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  return (
    <Box className="contact-container">
      <Container maxWidth="xl">
        <Fade in={true} timeout={1500}>
          <Box className="contact-content">
            <Typography variant="h4" className="contact-title glowing-text" sx={{fontFamily: "Open Sans, sans-serif", fontOpticalSizing: "auto", fontWeight: 700, fontVariationSettings: "wdth 100"}}>
              Find Us
            </Typography>
            <Typography variant="h6" className="contact-description glowing-text">
              Visit us at our location and become a part of the City Gymkhana School of Cricket!
            </Typography>
          </Box>
        </Fade>

        <Box className="contact-details-container">
          {/* Map Section */}
          <Box className="map-container">
            {!mapLoaded && (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '400px',
                  backgroundColor: 'rgba(26, 26, 26, 0.8)',
                  borderRadius: '12px',
                }}
              >
                <CircularProgress color="secondary" /> {/* Loading spinner */}
              </Box>
            )}
            <iframe
              width="100%"
              height="400"
              src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Jnanakshi%20Vidyaniketan%20school,%20Rr%20nagar+(City%20Gymkhana%20School%20of%20Cricket)&t=&z=14&ie=UTF8&iwloc=B&output=embed"
              title="Google Map Location"
              className="map-iframe"
              onLoad={handleMapLoad}
              style={{ display: mapLoaded ? 'block' : 'none' }} // Hide iframe until loaded
            ></iframe>
          </Box>

          {/* Contact Details Section */}
          <Box className="contact-info">
            <Typography variant="h4" className="info-title glowing-text" sx={{fontFamily: "Open Sans, sans-serif", fontOpticalSizing: "auto", fontWeight: 600, fontVariationSettings: "wdth 100"}}>
              Contact Details
            </Typography>
            <Typography variant="body1" className="info-text">
              <strong>Address:</strong> Jnanakshi Vidyaniketan School, RR Nagar, Bangalore, India
            </Typography>
            <Typography variant="body1" className="info-text">
              <strong>Phone:</strong> +91 12345 67890
            </Typography>
            <Typography variant="body1" className="info-text">
              <strong>Email:</strong> info@citygymkhana.com
            </Typography>
            <Typography variant="body1" className="info-text">
              <strong>Timings:</strong> Mon-Sat, 9:00 AM - 6:00 PM
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Contact;