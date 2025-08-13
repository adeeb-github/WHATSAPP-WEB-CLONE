import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserChat = () => {
  const { wa_id } = useParams(); 
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState(""); 
  const [userDetails, setUserDetails] = useState(null); // Store user name & phone

  useEffect(() => {
    if (!wa_id) return;

    // Fetch messages
    axios.get(`http://localhost:4000/api/messages/${wa_id}`)
      .then((res) => {
        setMessages(res.data.data);
      })
      .catch((err) => {
        console.error("Failed to fetch messages:", err);
      });

    // Fetch user details
    axios.get(`http://localhost:4000/api/users/${wa_id}`)
      .then((res) => {
        setUserDetails(res.data.data); // Make sure API returns { name, phone }
      })
      .catch((err) => {
        console.error("Failed to fetch user details:", err);
      });
  }, [wa_id]);

const handleSend = () => {
  if (!newMessage.trim()) return;

  axios.post(`http://localhost:4000/api/addmessage`, {
    wa_id,
    text: newMessage,
    from: "business",
    timestamp: new Date().toISOString()
  })
  .then(() => {
    setMessages((prev) => [
      ...prev,
      { text: newMessage, from: "business", timestamp: new Date().toISOString() }
    ]);
    setNewMessage("");
  })
  .catch((err) => console.error("Failed to send message:", err.response?.data || err.message));
};

  return (
    <div style={styles.wrapper}>
      {/* Header with user info */}
      <div style={styles.header}>
        {userDetails ? (
          <>
            <strong>{userDetails.name}</strong>
            <span style={styles.phone}>{userDetails.phoneNumber}</span>
          </>
        ) : (
          <span>Loading user...</span>
        )}
      </div>

      {/* Chat messages */}
      <div style={styles.chatContainer}>
        {messages.length === 0 ? (
          <p style={styles.noMessages}>No messages for this user</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              style={index === 0 ? styles.userMessage : styles.businessMessage}
            >
              <span>{msg.text}</span>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={styles.timestamp}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
              </div>
              <div style={styles.date}>
                {new Date(msg.timestamp).toLocaleDateString()}
              </div>
              </div>
              <div style={styles.status}> {msg.status}</div>
            </div>
          ))
        )}
      </div>

      {/* Input bar */}
      <div style={styles.inputBar}>
        <input
          type="text"
          placeholder="Type a message..."
          style={styles.input}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button style={styles.button} onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  header: {
    padding: "1rem",
    backgroundColor: "#ededed",
    borderBottom: "1px solid #ccc",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    fontSize: "1rem",
    fontWeight: "500",
  },
  phone: {
    fontSize: "0.9rem",
    color: "#555",
    marginTop: "0.2rem",
  },
  chatContainer: {
    flex: 1,
    padding: "1rem",
    overflowY: "auto",
  },
  noMessages: {
    textAlign: "center",
    marginTop: "2rem",
    color: "#666",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#fff",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    marginLeft: "0.3rem ",
    maxWidth: "60%",
    boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
  },
  businessMessage: {
  alignSelf: "flex-end",            // pushes message to right in a column flex container
  backgroundColor: "#dcf8c6",
  padding: "0.5rem 1rem",
  borderRadius: "8px",
  margin: "0.3rem 0",
  maxWidth: "60%",
  marginLeft: "2 rem",

  boxShadow: "0px 1px 3px rgba(0,0,0,0.1)",
     
  },
  timestamp: {
    fontSize: "0.7rem",
    color: "#999",
    marginTop: "0.2rem",
    textAlign: "right",
  },
  inputBar: {
    display: "flex",
    padding: "0.5rem",
    borderTop: "1px solid #ccc",
    backgroundColor: "#f0f0f0",
  },
  input: {
    flex: 1,
    padding: "0.5rem",
    borderRadius: "20px",
    border: "1px solid #ccc",
    outline: "none",
    marginRight: "0.5rem",
  },
  button: {
    padding: "0.5rem 1rem",
    borderRadius: "20px",
    border: "none",
    backgroundColor: "#4caf50",
    color: "white",
    cursor: "pointer",
  },
  status:{
    fontSize: "0.7rem",
    color: "#999",
    marginTop: "0.2rem",
    textAlign: "right",
  },
  date:{
    fontSize: "0.7rem",
    color: "#999",
    marginTop: "0.2rem",
    textAlign: "left",
  },
};

export default UserChat;
