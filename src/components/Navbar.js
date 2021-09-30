import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { auth } from '../firebase'
const useStyles = makeStyles((theme) => ({
  root: {
    flex: "0 1 auto",
    paddingBottom: "10px"
  },
  title: {
    flexGrow: 1,
    marginLeft: theme.spacing(7),
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            iskipper
          </Typography>
          <Button onClick={() => auth.signOut()} color="secondary"
          variant="outlined">sign out</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
