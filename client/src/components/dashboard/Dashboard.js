import React,{useState , useContext,useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CryptoContext from '../../context/CryptographContext/cryptoContext'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#171717',
    },
    secondary: {
      main: '#7c0b20',
    },
  },
});
const useStyles = makeStyles((theme) => ({
    root: {
    maxWidth: 600,
    '& > * + *': {
        marginTop: theme.spacing(2),
    },
    },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const action = (
    <Button color="secondary" size="small" >
      Decrypt
    </Button>
  );
export default function SignIn(props) {
  const classes = useStyles();
  const {encrypt,encryptData} = useContext(CryptoContext)
    const [state, setState] = useState({palintext:''})
    const {plaintext} = state
    
  const HandleChange = e =>{
    setState({
          ...state,
      [e.target.name] : e.target.value
    })   
}
  const formSubmit = e =>{
    e.preventDefault()
    encryptData(state)
    setState({
      plaintext:''
    })
  }
  return (
    <Container component="main" maxWidth="xs">
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
         Cryptography
        </Typography>
        <form  noValidate className={classes.form} onSubmit={formSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="plaintext"
            label="plain text"
            name="plaintext"
            autoComplete="plaintext"
            value={plaintext}
            onChange={HandleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            encrypt 
          </Button>
          {/* encryption textfield  */}
          {encrypt && encrypt !== null ?
          <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="cryptographictext"
          name="encryptedtext"
          value={encrypt}
          disabled
          />
          :
          ''}
          {/* ecrypt button */}
          {encrypt && encrypt !== null ?
           <Button
           type="submit"
           fullWidth
           variant="contained"
           color="primary"
           className={classes.submit}
          >
            Decrypt 
          </Button>
           :
           ''}
        </form>
      </div>
      </ThemeProvider>
    </Container>
  );
}