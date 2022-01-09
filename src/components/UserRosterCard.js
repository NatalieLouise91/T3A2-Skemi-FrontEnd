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
import { makeStyles } from "@material-ui/styles";


const useStyles = makeStyles({
    root: {
      background: '#45B39D',
    },
  });

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
    
    const classes = useStyles();
    const date = new Date(); 
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();

    const currentDay = new Date(year, month, day)
    let dates = [];

    function getDates(startDate, daysToAdd) {
        
        for (let i = 0; i <= daysToAdd; i++) {
            let currentDate = new Date();
            currentDate.setDate(startDate.getDate() + i);
            let oldFormat = (currentDate.getFullYear() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getDate());
            let date = new Date(oldFormat)
            let dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
            .toISOString()
            .split("T")[0];
            dates.push(dateString)
        }
    
        return dates;
    }

    console.log(getDates(currentDay, 3));

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
    setExpanded(!expanded);
    };

    const [occasion, setOccasion] = useState();
    const [message, setMessage] = useState();
    
    const id = roster.event_id
    
    useEffect(() => {
        getOccasionById(id)
            .then((occasion) => setOccasion(occasion))
            .catch((error) => console.log(error));
    }, [id]);

    useEffect(() => {
        if (dates[0]) {
            setMessage("Event is on Today")
        }
    }, []);

    if (!occasion) return null;


    return (
        <div>
            <Card elevation={1}>
                <Divider component="CardHeader">
                    {occasion.date === dates[0]?

                    <CardHeader className={classes.root}
                        subheader={message}
                    />      
                    : 
                    <CardHeader
                        subheader={occasion.date}
                    />
                }
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