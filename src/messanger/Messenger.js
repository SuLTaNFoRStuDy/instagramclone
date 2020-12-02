import "./Messenger.css";
import React, { useEffect, useState } from "react";
import { FormControl, Input } from "@material-ui/core";
import firebase from "firebase";
import Message from "./Message";
import { db } from "../firebase";
import FlipMove from "react-flip-move";
// style button
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";
function Messenger({ username }) {
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  const sendMessage = (event) => {
    // in here all the logic
    event.preventDefault();
    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };
  return (
    <div className="app">
      <img
        src="https://sun9-49.userapi.com/c846320/v846320178/8126f/IqvsBgCAXmk.jpg"
        alt=""
        width='150px'
        height='150px'
      />
      
      

      <form className="app__form">
        <FormControl className="app__formControl">
          <Input
            className="app__input"
            placeholder="Enter a Message ..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />

          <IconButton
            className="app__iconButton"
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
}

export default Messenger;
