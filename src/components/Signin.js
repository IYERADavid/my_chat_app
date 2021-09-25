import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, getDoc, setDoc } from "firebase/firestore"
import { auth, db } from '../firebase.js'
import { Button, Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import profile from './images.jpeg' 

const usestyles = makeStyles(()=> ({
    signin_container : {
        minHeight : "100vh",
        display : "flex",
        justifyContent : "center",
        background : "black",
        alignItems : "center"
    },
    form : {
        textAlign : "center"
    },
    img : {
        border : "6px solid blue",
        borderRadius : "60px",
        marginBottom : "50px"
    }
}))

const Signin = ({ setuser }) => {
    const classes = usestyles()

    const signin_with_google = async () => {
        const provider = new GoogleAuthProvider()
        await signInWithPopup(auth, provider)
        if (auth.currentUser) {
            const docRef = doc(db, "users", auth.currentUser.email)
            const docSnap = await getDoc(docRef);
            if (!docSnap.exists()) {
                const usersRef = doc(db, 'users', auth.currentUser.email)
                await setDoc(usersRef, {})
            }
        } else {
            alert("Please try login again")
        }
    }
    return (
        <>
            <Container maxWidth="sm" className={classes.signin_container}>
                <div className={classes.form}>
                    <img className={classes.img} src={profile} alt="site_profile" />
                    <Button variant="outlined" size="large" color="primary" fullWidth={true}
                    onClick={signin_with_google}>SIGNIN WITH GOOGLE</Button>
                </div>
            </Container>
        </>
    )
}

export default Signin
