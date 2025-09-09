import { Box, Table, TableBody, TableRow, TableCell, Typography, TableContainer } from "@mui/material";

const CustomTable = () => {
    const cellStyles = {
        color: 'white',
        textAlign: 'center',
        py: 3,
        fontSize: {
            xs: '0.9rem',
            sm: '1.2rem',
        },
        fontFamily: 'Poppins, sans-serif',
        border: 0, // Remove default borders to have full control
    };

    return (
        <Box sx={{ my: 6, display: "flex", flexDirection: 'column', justifyContent: "center", alignItems: "center", gap: 4 }}>
            <Typography
                variant="h3"
                sx={{
                    color: '#c70404',
                    fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                    fontWeight: 'bold',
                    fontFamily: 'Poppins, sans-serif',
                    textTransform: 'uppercase',
                    letterSpacing: '1.5px',
                    textShadow: '1px 1px 4px rgba(0,0,0,0.5)',
                }}
            >
                Camp Schedule
            </Typography>
            <TableContainer
                sx={{
                    width: {
                        xs: '90%',
                        sm: '80%',
                        md: '60%',
                    },
                    maxWidth: '800px',
                    border: "2px solid #FFD700",
                    borderRadius: '12px',
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    boxShadow: '0px 8px 25px rgba(0, 0, 0, 0.3)',
                    overflow: 'hidden', // Ensures the content respects the border radius
                }}
            >
                <Table>
                    <TableBody>
                        <TableRow sx={{ borderBottom: '1px solid rgba(255, 215, 0, 0.3)' }}>
                            <TableCell sx={{
                                ...cellStyles,
                                color: '#FFD700',
                                fontWeight: 'bold',
                                borderRight: "1px solid rgba(255, 215, 0, 0.3)",
                            }}>
                                Weekday Camp (4 days)
                            </TableCell>
                            <TableCell sx={cellStyles}>
                                Monday : 4:30pm - 6:30pm <br /> 
                                Tuesday : 4:30pm - 6:30pm <br /> 
                                Wednesday : 4:30pm - 6:30pm <br /> 
                                Thursday : 4:30pm - 6:30pm <br />
                            </TableCell>
                        </TableRow>
                        <TableRow sx={{ borderBottom: '1px solid rgba(255, 215, 0, 0.3)' }}>
                            <TableCell sx={{
                                ...cellStyles,
                                color: '#FFD700',
                                fontWeight: 'bold',
                                borderRight: "1px solid rgba(255, 215, 0, 0.3)",
                            }}>
                                Full Week Camp (7 days)
                            </TableCell>
                            <TableCell sx={cellStyles}>
                                Monday : 4:30pm - 6:30pm <br /> 
                                Tuesday : 4:30pm - 6:30pm <br /> 
                                Wednesday : 4:30pm - 6:30pm <br /> 
                                Thursday : 4:30pm - 6:30pm <br />
                                Friday : 4:30pm - 6:30pm <br /> 
                                Saturday : 7am - 8:30am <br /> 
                                Sunday : 10:30am - 12pm
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell sx={{
                                ...cellStyles,
                                color: '#FFD700',
                                fontWeight: 'bold',
                                borderRight: "1px solid rgba(255, 215, 0, 0.3)",
                            }}>
                                Weekend Camp
                            </TableCell>
                            <TableCell sx={cellStyles}>
                                Saturday : 4pm - 6pm <br /> Sunday : 7am - 9am
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )
}

export default CustomTable;