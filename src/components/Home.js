import { useState } from 'react'
import Navbar from './Navbar'
import Chat from './Chat'
import Friendslist from './Friendslist'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexFlow: "column",
        minHeight: "100vh",
    },
    container: {
        flex: "1 1 auto"
    }
}))

const Home = () => {
    const classes = useStyles()
    const [receiver_email, setreceiver_email] = useState(null)
    return (
        <div className={classes.root}>
            <Navbar />
            <Grid container wrap="nowrap" spacing={0} className={classes.container}>
                <Grid item xs={12} md={4}>
                    <Friendslist setreceiver_email={setreceiver_email} />
                </Grid>
                <Grid item xs={12} md={8}>
                    {receiver_email ?
                    <Chat receiver_email={receiver_email} /> :
                    <p>nothing yet</p>
                    }
                </Grid>
            </Grid>
        </div>
    )
}

export default Home
