import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

function Login() {
    const [showAlert, setShowAlert] = useState(null);
    const [isViewingLogin, setIsViewingLogin] = useState(true);
    const [isMakingRequesting, setIsMakingRequesting] = useState(false);
    const emailRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const { login, register } = useAuth();
    const navigate = new useNavigate();

    async function attemptLogin(event) {
        event.preventDefault();

        setIsMakingRequesting(true);
        const res = await login(emailRef.current.value, passwordRef.current.value);
        setIsMakingRequesting(false);

        if (res.data.error)
            setShowAlert(res.data.error);
        else
            navigate('/dashboard');
    }

    async function attemptRegister(event) {
        event.preventDefault();

        setIsMakingRequesting(true);
        const res = await register(emailRef.current.value, usernameRef.current.value, passwordRef.current.value);
        setIsMakingRequesting(false);

        if (res.data.error)
            setShowAlert(res.data.error);
        else
            setIsViewingLogin(true);
    }

    function loginPage() {
        return (
            <>
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockOpenIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={attemptLogin} sx={{ mt: 1 }}>
                    <TextField
                        inputRef={emailRef}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        inputRef={passwordRef}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isMakingRequesting}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="#" onClick={() => { setIsViewingLogin(false) }} variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </>
        );
    }

    function registerPage() {
        return (
            <>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOpenIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <Box component="form" onSubmit={attemptRegister} sx={{ mt: 1 }}>
                    <TextField
                        inputRef={usernameRef}
                        margin="normal"
                        required
                        fullWidth
                        name="username"
                        label="Username"
                        type="username"
                        id="username"
                    />
                    <TextField
                        inputRef={emailRef}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        inputRef={passwordRef}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isMakingRequesting}
                    >
                        Register
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="#" onClick={() => { setIsViewingLogin(true) }} variant="body2">
                                {"Return to login!"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </>
        );
    }

    return (
        isMakingRequesting ? <Loading />
            : <Container maxWidth="xs">
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    {isViewingLogin ? loginPage() : registerPage()}
                </Box>
                {showAlert && <Alert severity='error' onClose={() => setShowAlert(null)} > {showAlert} </Alert>}
            </Container>
    );
}

export default Login;
