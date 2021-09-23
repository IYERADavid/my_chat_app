import { auth } from '../firebase.js'
import { Button } from '@material-ui/core'

const Signout = () => {
    return (
        <div>
            <Button onClick={() => auth.signOut()}>sign out</Button>
        </div>
    )
}

export default Signout
