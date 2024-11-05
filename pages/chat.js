"use client"
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

let socket

export default function Chat() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  console.log(1)
  useEffect(() => {
    initSocket()
    return () => {
      socket.off('message');
    };
  }, []);
  console.log(2)

  const initSocket = async () => {
    await fetch("/api/socket");
    socket = io(undefined, {
      path: "/api/socket_io",
    });
    socket.on("connect", () => {
      console.log("Połączono")
    });
    socket.on("message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg])
    })
  };
  console.log(3)

  const sendMessage = () => {
    socket.emit('message', message);
    setMessage('');
  };
  console.log(4)

  return (
    <div>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}