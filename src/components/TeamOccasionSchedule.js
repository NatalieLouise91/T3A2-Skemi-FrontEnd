//import required dependencies and components
import { useGlobalState } from "../utils/stateContext";
import { Grid, Container } from "@material-ui/core";
import UserRosterCard from "./UserRosterCard";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@mui/material/Avatar";
import { blueGrey } from "@mui/material/colors";

//function to render a users occassion schedule
export default function TeamOccasionSchedule({ user }) {
   const { store } = useGlobalState();
   const { rosters } = store;

   // sets initials variable with users first and last initial 
   let initials = user.first_name.charAt(0) + user.last_name.charAt(0);

   return (
      <Container>
         <Grid container spacing={4}>
            <Grid item xs={12} s={6} md={3}>
               <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                     avatar={
                        <Avatar
                           sx={{ bgcolor: blueGrey[500] }}
                           aria-label="Initials"
                        >
                           {initials}
                        </Avatar>
                     }
                     title={user.first_name}
                     subheader={user.email}
                  />
                  <CardContent>{user.phone}</CardContent>
               </Card>
            </Grid>
            {rosters.map((roster) =>
               roster.user_id === user.id ? (
                  <Grid key={roster.id} item xs={12} sm={5} md={2}>
                     <UserRosterCard roster={roster} />
                  </Grid>
               ) : null
            )}
         </Grid>
      </Container>
   );
}
