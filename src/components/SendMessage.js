import { Input, Button } from "@material-ui/core"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { useState } from "react"
import { auth, db } from "../firebase"

const SendMessage = () => {
    const [msg, setmsg] = useState("")
    const sendMessage = async (e) => {
        e.preventDefault()
        const {uid, photoURL} = auth.currentUser
        const createdAt = new serverTimestamp()
        await addDoc(collection(db, "messages"), {
            text : msg,
            photoURL,
            uid,
            createdAt
        })
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
