import { useState, useEffect } from 'react'
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore"; 
import { db } from '../firebase'
import SendMessage from './SendMessage';

const Chat = () => {
    const [messages, setmessages] = useState([])
    useEffect(() => {
        const messagesRef = collection(db, "messages")
        const msg_query = query(messagesRef, orderBy("createdAt"), limit(50));
        const unsub = onSnapshot(msg_query, snapshot => {
            setmessages(snapshot.docs.map(doc => ({ id:doc.id, ...doc.data()}) ))
        }) 
    }, [])
    return (
        <div>
            {messages.map(({ id, text }) => (
                <div key={id}>
                    <p>{text}</p>
                </div>
            ))}
            <SendMessage />
        </div>
    )
}

export default Chat
