import Signin from './components/Signin'
import Chat from './components/Chat'
import { auth } from './firebase.js'
import { useAuthState } from 'react-firebase-hooks/auth'

const App = () => {
  const [user] = useAuthState(auth)

  return (
    <>
      {user ? <Chat /> : <Signin />}
    </>
  );
}

export default App;