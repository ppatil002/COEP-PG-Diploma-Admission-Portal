import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import HeaderLogo from '../components/images/header.jpg'
import PGDLogo from '../components/images/pgdcoep.PNG';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';
import { Paper } from "@material-ui/core";
import './landingPage.css';
import AdvertisementEng from '../components/images/ad_eng.jpeg';
import AdvertisementMar from '../components/images/ad_mar.jpeg';
import Grid from "@mui/material/Grid";
import howToApply from '../docs/how-to-apply.pdf'
import SBPdf from '../docs/SB-CollectProcedure.pdf'
import selfDec from '../docs/Self-Declaration.pdf'
import declaration from '../docs/declaration.pdf'
import undertaking from '../docs/undertaking.pdf'
import contacts from '../docs/contacts.pdf'
import { Table, TableContainer, TableHead, TableRow, TableCell, Button } from '@mui/material';

const drawerWidth = 280;

function Sidebar(props) {
    const [cards] = useState([
        {
            title: 'COEP PG Diploma Admissions Website',
            text: 'PG Diploma Admissions are not open now.',
            name: howToApply,
        },
    ])
    const downloadFile = (index, downloadName) => {
        const aTag = document.createElement('a');
        aTag.href = cards[index].name
        aTag.setAttribute('download', downloadName);
        document.body.appendChild(aTag);
        aTag.click();
        document.body.removeChild(aTag);
    }
    const navigate = useNavigate();

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div style={{ backgroundColor: '#FFFFE0', minHeight: '100vh' }}>
            <Toolbar />
            <List>
                {props.options &&
                    Object.keys(props.options).map((text, index) => (
                        <ListItem key={text}>
                            <ListItemButton onClick={() => navigate(props.options[text])}>
                                <ListItemIcon>
                                    {index === 0 && (
                                        <HomeIcon />
                                    )}
                                    {index === 1 && (
                                        <AppRegistrationIcon />
                                    )
                                    }
                                    {index === 2 && (
                                        <LoginIcon />
                                    )
                                    }
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <Box sx={{ display: 'flex', height: '120px' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                        backgroundColor: '#00ABE4',
                    }}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <MenuIcon />
                        </IconButton>

                        <div className='landing-page-header-container'>
                            <Typography variant="h6" component="div" className='title' style={{ fontWeight: "600", color: "black" }}>
                                COEP Technological University
                                <br />
                                PG - Diploma Admission Portal
                            </Typography>
                            <div className="landing-page-header-container2">
                                <img src={HeaderLogo} alt="" id="logo1" />
                                <img src={PGDLogo} alt="" id="logo2" />
                            </div>
                        </div>

                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer>
                </Box>
                <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
                    <Toolbar />
                    {/* <Outlet /> */}

                    <Paper component={Box} p={2} className='landing-page-main'>
                        <Box mt={1} mb={2}>
                            <div className='cards'>
                                {
                                    cards.map((card, i) => (
                                        <div key={i} className='card'>
                                            <h style={{ fontWeight: "600" }}>
                                                {card.title}
                                            </h>
                                            <p>
                                                {card.text}
                                            </p>
                                        </div>
                                    ))
                                }
                            </div>
                        </Box>
                    </Paper>

                    
                </Box>
            </Box>
        </>

    );
}

const Page404 = () => {
    const options = { "Home": "/" }

    return (
        <>
            <Sidebar options={options} />
        </>
    );
};

export default Page404;
