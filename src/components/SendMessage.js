import { Input, Button } from "@material-ui/core"
import { collection, addDoc, serverTimestamp, doc, setDoc } from "firebase/firestore"
import { useState } from "react"
import { auth, db } from "../firebase"

const SendMessage = () => {
    const [msg, setmsg] = useState("")
    const sendMessage = async (e) => {
        e.preventDefault()
        const sender_email = auth.currentUser.email
        const receiver_email = "weberdavison@gmail.com"
        const createdAt = new serverTimestamp()
        await addDoc(collection(db, "messages"), {
            text : msg,
            sender_email,
            receiver_email,
            createdAt
        })
        console.log("good now")
        const usersRef = doc(db, 'users', sender_email, 'receivers', receiver_email)
        await setDoc(usersRef, {
            last_conv_time : createdAt
        },
        { merge: true })
        console.log("perfect")
        setmsg("")
    }
    return (
        <div>
            <form onSubmit={sendMessage}>
                <Input value={msg} onChange={(e) => setmsg(e.target.value)} placeholder="Message..." />
                <Button type="submit">send</Button>
            </form>
        </div>
    )
}

export default SendMessage
