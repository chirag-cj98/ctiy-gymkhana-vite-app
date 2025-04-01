import './footer.css';
import { Box, Divider, IconButton } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {

return (
<footer className="footer">
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px', color: 'white', gap: {xs:5, sm:20, md:30} }}>
        <div>
            <h1>City Gymkhana</h1>
            <p>Address: Jnanakshi Vidyaniketan School, RR Nagar, Bangalore, India</p>
            <p>Phone: +91 12345 67890</p>
            <p>Email: info@citygymkhana.com</p>
        </div>
        <div>
            <IconButton color="inherit" onClick={() => window.open('https://www.instagram.com/city.gymkhana', '_blank')}>
                <InstagramIcon />
            </IconButton>
        </div>
    </Box>
    <Divider sx={{ backgroundColor: 'white', margin: '20px 0' }} variant='middle' flexItem />
    <div >
        © Copyright 2025. All Rights Reserved
    </div>
</footer>)
}

export default Footer;