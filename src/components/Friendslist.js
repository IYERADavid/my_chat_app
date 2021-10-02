import { useState, useEffect } from 'react'
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore"; 
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { db, auth } from '../firebase'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      height: "100%",
      maxHeight: "100vh"
    }
}))

const Friendslist = ({setreceiver_email}) => {
    const classes = useStyles()
    const [receivers, setreceivers] = useState([])
    useEffect(() => {
        const user_email = auth.currentUser.email
        const friendsRef = collection(db, "friends")
        const friends_query = query(friendsRef, where("friender_email","==",user_email), orderBy("last_conv_time", "desc"))
        const unsub = onSnapshot(friends_query, snapshot => {
            setreceivers(snapshot.docs.map(doc => ({id:doc.id, ...doc.data()}) ))
        }) 
    }, [])
    return (
        <>
            <List className={classes.root}>
                {receivers.map(({id, friend_email, last_conv_time}) => (
                    <ListItem key={id} button 
                    onClick={() => setreceiver_email(friend_email)}>
                        <ListItemText primary={friend_email}
                        secondary={last_conv_time ? last_conv_time.seconds : null} />
                    </ListItem>
                ))}
            </List>
        </>
    )
}

export default Friendslist
