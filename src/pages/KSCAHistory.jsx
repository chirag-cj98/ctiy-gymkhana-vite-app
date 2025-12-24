import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, Divider, Fade, CircularProgress } from '@mui/material';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import ReactMarkdown from 'react-markdown';
import { strapiApiUrl } from '../config/api';

const KSCAHistory = () => {
    const [historyData, setHistoryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch(`${strapiApiUrl}/history?populate=*`);
                if (!response.ok) {
                    throw new Error('Failed to fetch history data');
                }
                const data = await response.json();
                setHistoryData(data.data);
            } catch (err) {
                console.error('Error fetching history:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
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
                <Typography color="error" variant="h6">Error loading history: {error}</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ bgcolor: 'var(--neutral-100)', pt: '100px', pb: 8, minHeight: '100vh' }}>
            <Container maxWidth="lg">
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
                            KSCA <span className="gradient-text">History</span>
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                fontFamily: 'var(--font-body)',
                                color: 'text.secondary',
                                maxWidth: '800px',
                                mx: 'auto'
                            }}
                        >
                            Our journey and affiliation with the Karnataka State Cricket Association.
                        </Typography>
                    </Box>
                </Fade>

                <Fade in={true} timeout={1500}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 4, md: 8 },
                            borderRadius: '24px',
                            boxShadow: '0 20px 40px -10px rgba(0,0,0,0.05)',
                            background: 'white',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <Box sx={{
                            position: 'absolute',
                            top: -50,
                            right: -50,
                            opacity: 0.05,
                            transform: 'rotate(15deg)'
                        }}>
                            <SportsCricketIcon sx={{ fontSize: '400px', color: 'var(--primary)' }} />
                        </Box>

                        <Box sx={{
                            '& h1, & h2, & h3, & h4': {
                                fontFamily: 'var(--font-heading)',
                                color: 'var(--primary)',
                                fontWeight: 700,
                                mb: 2,
                                mt: 4
                            },
                            '& h1:first-of-type, & h2:first-of-type, & h3:first-of-type, & h4:first-of-type': {
                                mt: 0
                            },
                            '& p': {
                                fontSize: '1.1rem',
                                lineHeight: 1.8,
                                color: 'var(--neutral-700)',
                                mb: 3
                            },
                            '& ul': {
                                pl: 3,
                                mb: 3,
                                fontSize: '1.1rem',
                                color: 'var(--neutral-700)'
                            },
                            '& li': {
                                mb: 1
                            }
                        }}>
                            <ReactMarkdown>
                                {historyData?.historyText || 'No history data available.'}
                            </ReactMarkdown>
                        </Box>

                        <Divider sx={{ my: 4, borderColor: 'var(--accent)', borderWidth: 2, width: '100px' }} />

                    </Paper>
                </Fade>
            </Container>
        </Box>
    );
};

export default KSCAHistory;
