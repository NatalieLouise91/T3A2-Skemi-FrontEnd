import React, {useState, useEffect} from "react";
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { Typography } from '@material-ui/core';
import { getOccasionById } from "../services/occasionServices";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
    }),
  }));
  

export default function UserRosterCard({ roster }) {

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
    setExpanded(!expanded);
    };

    const [occasion, setOccasion] = useState();

    const id = roster.event_id
    
    useEffect(() => {
        getOccasionById(id)
            .then((occasion) => setOccasion(occasion))
            .catch((error) => console.log(error));
    }, [id]);

    if (!occasion) return null;

    return (
        <div>
            <Card elevation={1}>
                <Divider component="CardHeader">
                    <CardHeader
                        subheader={occasion.date}
                    />
                </Divider>
                    <CardContent>
                        <Typography variant="body1" color="textSecondary">
                            <strong>{occasion.event_name}</strong>
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            {roster.role}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            {roster.start_time} - {roster.end_time}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>

                    <Divider>
                        <Typography variant="body2" color="textSecondary">
                            <strong>Details</strong>
                        </Typography>
                    </Divider>
                        <CardContent>
                            <Typography variant="body2" color="textSecondary">
                                <strong>Event Location: </strong>{occasion.location}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                <strong>Contact: </strong>{occasion.contact_name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                <strong>Phone:</strong> {occasion.contact_phone}
                            </Typography>
                        </CardContent>
                    </Collapse>
            </Card>
        </div>
    )
}