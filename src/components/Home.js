import { useState } from 'react'
import Navbar from './Navbar'
import Chat from './Chat'
import Friendslist from './Friendslist'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      maxHeight: "100%",
    }
}))

const Home = () => {
    const classes = useStyles()
    const [receiver_email, setreceiver_email] = useState(null)
    return (
        <div className={classes.root}>
            <Navbar />
            {receiver_email ?
            <Chat /> :
            <Friendslist />
            }
        </div>
    )
}

export default Home
