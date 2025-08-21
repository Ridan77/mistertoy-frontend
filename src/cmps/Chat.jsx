import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import SendIcon from "@mui/icons-material/Send";
import { TextField } from "@mui/material";
import {
  socketService,
  SOCKET_EMIT_SEND_MSG,
  SOCKET_EMIT_SET_TOPIC,
  SOCKET_EVENT_ADD_MSG,
} from "../services/socket.service.js";
import { toyService } from "../services/toy.service.js";

export function Chat({ toyId }) {
  const user = useSelector((storeState) => storeState.userModule.loggedInUser);
  const [chat, setChat] = useState([]);
  useEffect(() => {
    socketService.on(SOCKET_EVENT_ADD_MSG, (msg) => {
      console.log("GOT from socket", msg);
      setChat((prevChat) => [...prevChat, msg]);
    });
    socketService.emit(SOCKET_EMIT_SET_TOPIC, toyId);
    loadToy(toyId);
    return () => {
      socketService.off(SOCKET_EMIT_SET_TOPIC);
    };
  }, []);

  const [lineToEdit, setLineToEdit] = useState("");

  async function loadToy(toyId) {
    const toy = await toyService.getById(toyId);
    setChat(toy.chat)
  }
  function handleSubmit(ev) {
    ev.preventDefault();
    const msg = { text: ev.target.txt.value, sender: user.fullname };
    socketService.emit(SOCKET_EMIT_SEND_MSG, msg);
    setLineToEdit("");
  }
  return (
    <div className="chat-container">
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
            onChange={(ev) => setLineToEdit(ev.target.value)}
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
