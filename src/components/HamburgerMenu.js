import React, { useState } from "react";
import { 
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemText,
    makeStyles
} from '@material-ui/core';

// import MenuIcon from '@mui/icons-material/Menu';

import { Link } from "react-router-dom";

const HamburgerMenu = ({loggedInUser, setLoggedInUser}) => {

    const useStyles = makeStyles(() => ({
        link:{
            textDecoration:"none",
            color: "blue",
            fontSize: "20px",
        },
        icon: {
            color: "white"
        }
    }));

    const classes = useStyles();
    const [openDrawer, setOpenDrawer] = useState(false);

    return(
        <>
            <Drawer
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}
                >
                <List>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to="/">Home</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to="/">Home</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to="/">Home</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to="/">Home</Link>
                        </ListItemText>
                    </ListItem>
                    <ListItem onClick={() => setOpenDrawer(false)}>
                        <ListItemText>
                            <Link to="/">Home</Link>
                        </ListItemText>
                    </ListItem>
                </List>
            </Drawer>
            <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
                {/* <MenuIcon /> */}
            </IconButton>
        </>
    );
}

export default HamburgerMenu;