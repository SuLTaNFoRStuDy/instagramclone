import {
  Avatar,
  Button,
  IconButton,
  Input,
  makeStyles,
  Modal,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { ChatBubbleOutline, Home,  Favorite, Brightness3 } from "@material-ui/icons";
import React, { useState } from "react";
import "./App.css";
import { auth } from "./firebase";
import Like from "./Like";
import Brightness5Icon from '@material-ui/icons/Brightness5';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    height: "300px",
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}


const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    height: 200,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
function Header({ user, username, setUsername }) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [likeOpen, setLikeOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [darkMode,setDarkMode]=useState(false)

  const handleRegister = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setRegisterOpen(false);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpen(false);
  };

  
  let className = '';
  if (darkMode===true) {
    className += 'darkmode';
  }

  return (
    <div className={`app  ${className}`}>
      {/* ============================Like Modal=========================================== */}

      <Modal open={likeOpen} onClose={() => setLikeOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <img
            className="like__image"
            src="https://st2.depositphotos.com/3757793/10979/v/950/depositphotos_109793622-stock-illustration-heart-app-icon-template-mobile.jpg"
            alt=""
          />
          <div className="like__container">
            <Like username={username} />
            
          </div>
        </div>
      </Modal>

      {/*===========================================Login Modals========================================================== */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__login">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>

            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleLogin}>Login</Button>
          </form>
        </div>
      </Modal>

      <Modal open={registerOpen} onClose={() => setRegisterOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <form className="app__login">
            <center>
              <img
                className="app__headerImage"
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
            </center>
            <Input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handleRegister}>Register</Button>
          </form>
        </div>
      </Modal>
      <div className="app__header">
        <Link to="">
          <img
            className="app__headerImage"
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
            alt=""
          />
        </Link>

        <div className="message__header">
          <Link to="">
            <IconButton>
              <Home />
            </IconButton>
          </Link>

          <Link to="message">
            <IconButton>
              <ChatBubbleOutline className="message__headerIconButton"></ChatBubbleOutline>
            </IconButton>
          </Link>

          
          <IconButton onClick={() => setLikeOpen(true)}>
            <Favorite />
          </IconButton>
          <IconButton onClick={()=>setDarkMode(false)}>
            <Brightness5Icon  />
          </IconButton>
          <IconButton onClick={()=>setDarkMode(true)}>
            <Brightness3  />
          </IconButton>
          <IconButton>
            <Avatar />
          </IconButton>
        </div>
        {user?.displayName ? (
          <div className="app__headerRight">
            <Button onClick={() => auth.signOut()}>Logout</Button>
          </div>
        ) : (
          <form className="app__loginHome">
            <Button onClick={() => setOpen(true)}>Login</Button>
            <Button onClick={() => setRegisterOpen(true)}>Sign Up</Button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Header;
