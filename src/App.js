import Signin from './components/Signin'
import Chat from './components/Chat'
import { auth } from './firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import usestyles from './App.styles'

const App = () => {
  const classes = usestyles()
  const [user] = useAuthState(auth)
  return (
    <div className={classes.main_container}>
      {user ? <Chat /> : <Signin />}
    </div>
  );
}

export default App;