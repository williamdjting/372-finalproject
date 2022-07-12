import * as React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';

export default function WatchLists() {
    function createWatchList(name, description, route) {
        return (
            <Card sx={{ mb: 3 }}>
                <Link underline='none' component={RouterLink} to={route}>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                {name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Card>
        )
    }

    return (
        <Container maxWidth="lg" sx={{ my: 3 }}>
            <Typography gutterBottom variant="h5">Personal WatchList</Typography>
            {createWatchList("Personal WatchList", "This is your personal watchlist", "/dashboard2")}

            <Typography gutterBottom variant="h5">Group WatchLists</Typography>
            {createWatchList("Tech Grind", "This is a tech related watchlist", "/dashboard/groups/view/Name")}
        </Container>
    )
}
