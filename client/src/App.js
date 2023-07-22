import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState }  from 'react';
import "./App.css";
import io from 'socket.io-client';

const socket = io.connect("http://localhost:3001")


function App() {

  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const sendMessage = () => {
    socket.emit("send_message", { message })
  };


  useEffect(() => {
      socket.on("receive_message", (data) => {
            setMessageReceived(data.message)
      })
  }, []);

  return (
    <>
      <div className="App">
        <input placeholder="enter your message" onChange={(event) => {
          setMessage(event.target.value)
        }} />
        <button onClick={sendMessage}>Send Message</button>
        <p>Message: {messageReceived}</p>
      </div>
    </>

  )

}

export default App;

