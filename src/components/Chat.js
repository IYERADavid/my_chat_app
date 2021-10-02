import { useState, useEffect } from 'react'
import { collection, query, where, orderBy, limit, onSnapshot } from "firebase/firestore"
import { auth, db } from '../firebase'
import SendMessage from './SendMessage'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    msg_container: {
        marginTop: " 25px",
        marginBottom: "25px",
        width: "100%"
    },
    user: {
        marginLeft: "15px",
        padding: "8px",
        backgroundColor : "rgb(150, 166, 218)",
        borderRadius : "0px 30px 30px 30px"
    },
    users: {
        marginRight: "15px",
        padding: "7px",
        backgroundColor : "rgb(156, 197, 204)",
        borderRadius : "30px"
    }
}))

const Chat = ({receiver_email}) => {
    const classes = useStyles()
    const [messages, setmessages] = useState([])
    useEffect(() => {
        const user_email = auth.currentUser.email
        const first_option = user_email + "_" + receiver_email
        const second_option = receiver_email + "_" + user_email
        const messagesRef = collection(db, "messages")
        const msg_query = query(messagesRef, where("sender_receiver", "in" ,[first_option, second_option]), orderBy("createdAt", "desc"), limit(50))
        const unsub = onSnapshot(msg_query, snapshot => {
            const msgs = snapshot.docs.map(doc => ({ id:doc.id, ...doc.data()})) 
            setmessages(msgs.reverse())
        }) 
    }, [receiver_email])
    return (
        <div>
            {messages.map(({ id, owner, text }) => (
                <div key={id}>
                    <p className={classes.msg_container}>
                        <span className={owner === auth.currentUser.email ? classes.user : classes.friend } >{text}</span>
                    </p>
                </div>
            ))}
            <SendMessage receiver_email={receiver_email} />
        </div>
    )
}

export default Chat
