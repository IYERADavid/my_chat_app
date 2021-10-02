import { Input, Button } from "@material-ui/core"
import { collection, addDoc, serverTimestamp, doc, setDoc } from "firebase/firestore"
import { useState } from "react"
import { auth, db } from "../firebase"
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    input: {
        marginRight: "100px",
        width: "100%"
    },
    button: {
        float: "right",
        width: "100px"
    }
}))

const SendMessage = ({receiver_email}) => {
    const classes = useStyles()
    const [msg, setmsg] = useState("")
    const sendMessage = async (e) => {
        e.preventDefault()
        if(msg) {
            const user_email = auth.currentUser.email
            const sender_receiver = user_email + "_" + receiver_email
            const createdAt = new serverTimestamp()
            await addDoc(collection(db, "messages"), {
                text : msg,
                owner : user_email,
                sender_receiver,
                createdAt
            })
            const usersRef = doc(db, 'friends', sender_receiver)
            await setDoc(usersRef, {
                last_conv_time : createdAt
            },
            { merge: true })
            console.log("perfect")
            setmsg("")
        }
    }
    return (
        <div>
            <form onSubmit={sendMessage}>
                <Input value={msg} className={classes.input}
                onChange={(e) => setmsg(e.target.value)} placeholder="Message..." />
                <Button type="submit" className={classes.button}>send</Button>
            </form>
        </div>
    )
}

export default SendMessage
