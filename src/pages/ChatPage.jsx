import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import io from 'socket.io-client';
import UserList from '../components/UserList';

const ChatPage = () => {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [users, setUsers] = useState([]);

  const roomName = 'General';

  useEffect(() => {
    const newSocket = io('https://back-chat-room.onrender.com');
    setSocket(newSocket);
    newSocket.emit('joinRoom', { roomName, user });
    newSocket.on('updateUserList', (userList) => {
      setUsers(userList);
    });
    newSocket.on('newMessage', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    return () => newSocket.disconnect();
  }, [user, roomName]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (currentMessage.trim() && socket) {
      socket.emit('chatMessage', {
        room: roomName,
        message: currentMessage,
        user: { name: user.name, id: user._id },
      });
      setCurrentMessage('');
    }
  };

  return (
    <div>
      <h1>Chat Room: {roomName}</h1>
      <div className="chat-container" style={{ display: 'flex', height: '70vh', backgroundColor: '#1e1e1e', color: 'white' }}>
        <UserList users={users} />
        <div className="chat-main" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <div className="chat-window" style={{ flexGrow: 1, border: '1px solid #444', overflowY: 'scroll', padding: '10px' }}>
            {messages.map((msg, index) => (
              <div key={index} style={{ marginBottom: '10px' }}>
                <strong style={{ color: '#5ea2e8' }}>{msg.user.name}: </strong>
                <span>{msg.message}</span>
                <span style={{ fontSize: '0.7em', color: '#888', marginLeft: '10px' }}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} style={{ display: 'flex', padding: '10px' }}>
            <input
              type="text"
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Type a message..."
              style={{
                flexGrow: 1,
                padding: '10px',
                marginRight: '10px',
                borderRadius: '5px',
                border: 'none',
                backgroundColor: '#3a3a3c',
                color: 'white'
              }}
            />
            <button type="submit" style={{
              padding: '10px 15px',
              borderRadius: '5px',
              border: 'none',
              backgroundColor: '#0a84ff',
              color: 'white',
              cursor: 'pointer'
            }}>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;