import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import SendIcon from "@mui/icons-material/Send";
import { TextField } from "@mui/material";
import {
  socketService,
  SOCKET_EMIT_SEND_MSG,
  SOCKET_EMIT_SET_TOPIC_AND_ID,
  SOCKET_EVENT_ADD_MSG,
  USER_TYPING, USER_STOP_TYPING
} from "../services/socket.service.js";
import { toyService } from "../services/toy.service.js";
import { useRef } from "react";
import { utilService } from "../services/util.service.js";

export function Chat({ toyId }) {
  const user = useSelector((storeState) => storeState.userModule.loggedInUser);
  const [chat, setChat] = useState([]);
  const [whoIsTyping, setWhoIsTyping] = useState(null);

  const onStopTypingDebounce = useRef(
    utilService.debounce(onStopTyping, 3000)
  ).current;



  useEffect(() => {
    socketService.on(SOCKET_EVENT_ADD_MSG, (msg) => {
      console.log("GOT from socket", msg);
      setChat((prevChat) => [...prevChat, msg]);
    });
    socketService.on(USER_TYPING, (msg) => {
      console.log("GOT msg typing from socket", msg);
      setWhoIsTyping(msg);
    });
      socketService.on(USER_STOP_TYPING, (msg) => {
      console.log("GOT msg typing from socket", msg);
      setWhoIsTyping(null);
    });
    socketService.emit(SOCKET_EMIT_SET_TOPIC_AND_ID, {
      toyId,
      userId: user._id,
    });
    loadToy(toyId);
    return () => {
      socketService.off(SOCKET_EVENT_ADD_MSG);
      socketService.off(USER_TYPING);
    };
  }, []);

  const [lineToEdit, setLineToEdit] = useState("");

  async function loadToy(toyId) {
    const toy = await toyService.getById(toyId);
    setChat(toy.chat);
  }
  
  function onStopTyping() {
    console.log("Stop typing");
    socketService.emit(USER_STOP_TYPING, {});
    setWhoIsTyping(null)

  }
  function handleChange(ev) {
    socketService.emit(USER_TYPING, { sender: user.fullname });
    onStopTypingDebounce();
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    const msg = { text: ev.target.txt.value, sender: user.fullname };
    socketService.emit(SOCKET_EMIT_SEND_MSG, msg);
    setLineToEdit("");
  }
  return (
    <div className="chat-container">
      <p>
        <span className="who-is-typing">
          {whoIsTyping && `${whoIsTyping.sender} is typing`}
        </span>
      </p>
      {chat.map((msg, idx) => (
        <div
          key={idx}
          className={`msg ${msg.sender === user.fullname ? "user" : "bot"}`}>
          {`${msg.sender}: ${msg.text}`}
        </div>
      ))}
      <form
        onSubmit={(ev) => {
          handleSubmit(ev);
        }}>
        <div className="input-send">
          <TextField
            className="aline-input"
            sx={{ m: 0 }}
            name="txt"
            onChange={(ev) => {
              handleChange(ev);
              setLineToEdit(ev.target.value);
            }}
            value={lineToEdit}
            id="filled-basic"
            variant="filled"
            label="Your answer..."
            autoComplete="off"
          />
          {/* <input
            autoFocus
            autoComplete="off"
            className="line-input"
            type="text"
            id="txt"
            value={lineToEdit}
            placeholder="Your answer... "
            onChange={(ev) => setLineToEdit(ev.target.value)}
          /> */}
          <button>
            <SendIcon></SendIcon>
          </button>
        </div>
      </form>
    </div>
  );
}
