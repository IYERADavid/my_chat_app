import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../firebase.js'
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

const Signin = () => {
    const classes = usestyles()

    const signin_with_google = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
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
