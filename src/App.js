import Signin from './components/Signin'
import Home from './components/Home'
import usestyles from './App.styles'
import { auth } from './firebase'
import { useAuthState } from 'react-firebase-hooks/auth' 

const App = () => {
  const classes = usestyles()
  const [ user ] = useAuthState(auth)
  return (
    <div className={classes.main_container}>
      {user ? <Home /> : <Signin />}
    </div>
  );
}

export default App;