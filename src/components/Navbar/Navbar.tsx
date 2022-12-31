import { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { NavbarProps } from '../../helpers/interfaces';
import { getDownloadURL, ref } from "firebase/storage";
import { storage, auth } from '../../helpers/firebaseConfig';

const pages = ['Home', 'Search'];
// 1. Stwórz stan profilePhoto, otypuj go tak żeby mógł przechowywać string albo undefined, wartość początkowa '/'
// 2. Wywołaj useEffect, będzie działać tylko na pierwszym renderze
// W useEffect:
// 3. Stwórz referencje do storage (taka sama jak w poprzednim zadaniu)
// 4. Wywołaj funkcję getDownloadURL, funkcja przyjmuje jako argument referenecje z poprzedniego punktu i importuje się ją z firebase/storage
// 5. Na getDownloadURL popednij thena, w tym then'ie wywołaj funkcję aktualizującą stan profilePhoto (pkt 1) i wrzuć do tego stanu to, co zostało ci zwrócone przez getDownloadURL
// 6. Dopisz catcha, console.error(err.message)
// 7. W Avatarze (u mnie linia 120), ustaw atrybut src na stan profilePhoto

const Navbar: React.FC<NavbarProps> = ({ loggedIn }) => {
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [profilePhoto, setProfilePhoto] = useState<string | undefined>('/')

    useEffect(() => {
        if (loggedIn && auth.currentUser) {
            const storageRef = ref(storage, `/users/${auth.currentUser.uid}/profilePhoto`);

            getDownloadURL(storageRef)
                .then((url) => setProfilePhoto(url))
                .catch((err) => console.error(err.message));
            // lub
            // .catch((err) => setProfilePhoto(undefined)); do renderowania warunkowego
        }
    }, [loggedIn]); //useEffect powinien reagować na stan logowania!!! dlatego dopiasłam loggedIn

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    // const handleCloseUserMenu = () => {
    //     setAnchorElUser(null);
    // };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <Link to='/' style={{ textDecoration: "none", color: "black" }}>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">Home</Typography>
                                </MenuItem>
                            </Link>
                            <Link to='/search' style={{ textDecoration: "none", color: "black" }}>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">Search</Typography>
                                </MenuItem>
                            </Link>
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'Roboto',
                            fontWeight: 300,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none'
                        }}
                    >
                        SDA NEWS
                    </Typography>

                    <Box sx={{ flexGrow: 0 }}>
                        {/* W zależności od stanu loggedIn, ustaw atrybut "to" elementu <Link>. Jeżeli loggedIn jest równe true ustaw atrybut "to" na "/user", jeżeli loggedIn jest fałszywe ustaw "to" na "/login". Użyj turnary operator inlinowo w Linku*/}
                        <Link to={loggedIn ? '/user' : '/login'} style={{ textDecoration: "none" }}>
                            {/* Jeżeli loggedIn jest równe true wyświetl IconButton z Avatarem, jeżeli loggedIn jest równe false, wyświetl Button (z MUI, w sx'ach: my: 2, color white, display block) textContent Log in */}
                            {/* 1 sposób */}
                            {loggedIn ? <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src={profilePhoto} />
                            </IconButton> : <Button sx={{ my: 2, color: "white", display: "block" }}>Log in</Button>}
                            {/* 2 sposób */}
                            {/* {loggedIn && <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>}
                            {!loggedIn && <Button sx={{ my: 2, color: "white", display: "block" }}>Log in</Button>} */}
                        </Link>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar