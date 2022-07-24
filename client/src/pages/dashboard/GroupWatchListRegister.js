import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';

export default function GroupWatchListRegister() {
    const [showAlert, setShowAlert] = useState(null);
    const [isMakingRequesting, setIsMakingRequesting] = useState(false);
    const groupNameRef = useRef();
    const groupDescriptionRef = useRef();
    const navigate = new useNavigate();

    async function attemptRegister(event) {
        event.preventDefault();

        setIsMakingRequesting(true);
        const res = await axios.post('/groups/register', {
            name: groupNameRef.current.value,
            description: groupDescriptionRef.current.value,
        });
        setIsMakingRequesting(false);

        if (res.data.error)
            setShowAlert(res.data.error);
        else
            navigate('/dashboard');
    }

    return (
        isMakingRequesting ? <Loading />
            : <Container maxWidth="xs">
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOpenIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Register Group
                        </Typography>
                        <Box component="form" onSubmit={attemptRegister} sx={{ mt: 1 }}>
                            <TextField
                                inputRef={groupNameRef}
                                margin="normal"
                                required
                                fullWidth
                                name="Group Name"
                                label="Group Name"
                                type="Group Name"
                                id="Group Name"
                            />
                            <TextField
                                inputRef={groupDescriptionRef}
                                margin="normal"
                                required
                                fullWidth
                                name="Group Description"
                                label="Group Description"
                                type="Group Description"
                                id="Group Description"
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
                        </Box>
                    </>
                </Box>
                {showAlert && <Alert severity='error' onClose={() => setShowAlert(null)} > {showAlert} </Alert>}
            </Container>
    );
}
