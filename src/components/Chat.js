import { useState, useEffect } from 'react'
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore"; 
import { db } from '../firebase'
import Signout from './Signout'
import SendMessage from './SendMessage';

const Chat = () => {
    const [messages, setmessages] = useState([])
    useEffect(() => {
        const messagesRef = collection(db, "messages")
        const msg_query = query(messagesRef, orderBy("createdAt"), limit(50));
        const unsub = onSnapshot(msg_query, snapshot => {
            setmessages(snapshot.docs.map(doc => doc.data()))
        }) 
    }, [])
    return (
        <div>
            <Signout />
            {messages.map(({ id, text, photoURL}) => (
                <div key={id}>
                    <img src={photoURL} alt="profile" />
                    <p>{text}</p>
                </div>
            ))}
            <SendMessage />
        </div>
    )
}

export default Chat
