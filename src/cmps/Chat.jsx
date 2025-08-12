import { useEffect, useState } from "react";
import imgUrl from "../assets/img/send.png";

export function Chat() {
  //   function handleChange({ target }) {
  //     const value = target.value;
  //     setLineToEdit(value);
  //   }
  const [chatLines, setChatLines] = useState([
    { text: "hello", sender: "bot" },
    { text: "Nice to chat with you", sender: "bot" },
    { text: "How can I help?", sender: "bot" },
  ]);
  const [lineToEdit, setLineToEdit] = useState("");

  function handleSubmit(ev) {
    ev.preventDefault();
    setChatLines((prevLines) => [
      ...prevLines,
      { text: ev.target.txt.value, sender: "user" },
    ]);
    setTimeout(() => {
      setChatLines((prevLines) => [
        ...prevLines,
        { text: "Sure thing, honey", sender: "bot" },
      ]);
    }, 5000);
  }

  return (
    <div className="chat-container">
      {chatLines.map((line, idx) => (
        <div key={idx} className={`line ${line.sender}`}>
          {line.text}
        </div>
      ))}
      <form
        onSubmit={(ev) => {
          handleSubmit(ev);
          setLineToEdit("");
        }}>
        <div className="input-send">
          <input
            autoFocus
            autoComplete="off"
            className="line-input"
            type="text"
            id="txt"
            value={lineToEdit}
            placeholder="Your answer... "
            onChange={(ev) => setLineToEdit(ev.target.value)}
          />
          <button>
            <img src={imgUrl} />
          </button>
        </div>
      </form>
    </div>
  );
}
