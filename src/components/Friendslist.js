import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot } from "firebase/firestore"; 
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
    }
}))

const Friendslist = () => {
    const classes = useStyles()
    const [receivers, setreceivers] = useState([])
    useEffect(() => {
        const receiversRef = collection(db, "users", auth.currentUser.email, "receivers")
        const reciever_query = query(receiversRef, orderBy("last_conv_time", "Desc"))
        const unsub = onSnapshot(reciever_query, snapshot => {
            setreceivers(snapshot.docs.map(doc => ({id:doc.id, ...doc.data()}) ))
        }) 
    }, [])
    return (
        <>
            <List className={classes.root}>
                {receivers.map(({id, last_conv_time}) => (
                    <ListItem key={id} button>
                        <ListItemText primary={id}
                        secondary={last_conv_time.seconds} />
                    </ListItem>
                ))}
            </List>
        </>
    )
}

export default Friendslist
