import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '../firebase.js'
import { Button } from '@material-ui/core'

const Signin = () => {
    const signin_with_google = () => {
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth, provider)
    }
    return (
        <div>
            <Button onClick={signin_with_google}>Signin with google</Button>
        </div>
    )
}

export default Signin
