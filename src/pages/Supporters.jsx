import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Box, Fade, CircularProgress } from '@mui/material';
import { strapiApiUrl } from '../config/api';
import './Supporters.css';

const Supporters = () => {
    const [supporters, setSupporters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSupporters = async () => {
            try {
                const response = await fetch(`${strapiApiUrl}/supporters?populate=*`);
                if (!response.ok) {
                    throw new Error('Failed to fetch supporters data');
                }
                const data = await response.json();
                setSupporters(data.data);
            } catch (err) {
                console.error('Error fetching supporters:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSupporters();
    }, []);

    const getImageUrl = (image) => {
        if (!image) return 'https://placehold.co/400x400?text=No+Image';

        // Handle direct object or array
        const imgData = Array.isArray(image) ? image[0] : image;
        if (!imgData) return 'https://placehold.co/400x400?text=No+Image';

        const url = imgData.formats?.medium?.url || imgData.url;

        if (url && url.startsWith('/')) {
            return `${strapiApiUrl.replace('/api', '')}${url}`;
        }
        return url;
    };

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
                <Typography color="error" variant="h6">Error loading supporters: {error}</Typography>
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
                                color: 'var(--primary)',
                                textTransform: 'uppercase',
                                letterSpacing: '-1px',
                            }}
                        >
                            Our <span className="gradient-text">Supporters</span>
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
                            We are grateful for the generous support from our community members who help us grow and thrive.
                        </Typography>
                    </Box>
                </Fade>

                <Grid container spacing={4}>
                    {supporters.map((supporter, index) => (
                        <Grid item key={supporter.id} xs={12} sm={6} md={3}>
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
                                        bgcolor: 'white',
                                        overflow: 'hidden'
                                    }}
                                >
                                    <Box sx={{ overflow: 'hidden', height: '300px' }}>
                                        <CardMedia
                                            component="img"
                                            height="100%"
                                            image={getImageUrl(supporter.supporterImage)}
                                            alt={supporter.supporterName}
                                            sx={{
                                                objectFit: 'cover',
                                                transition: 'transform 0.5s ease',
                                                '&:hover': { transform: 'scale(1.05)' }
                                            }}
                                        />
                                    </Box>
                                    <CardContent sx={{ flexGrow: 1, textAlign: 'center', p: 3 }}>
                                        <Typography gutterBottom variant="h5" component="h2" sx={{
                                            fontWeight: 700,
                                            fontFamily: 'var(--font-heading)',
                                            color: 'var(--primary)'
                                        }}>
                                            {supporter.supporterName}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'var(--neutral-600)', lineHeight: 1.6 }}>
                                            {supporter.supporterDescription}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Fade>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Supporters;
