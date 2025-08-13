import React, { useEffect, useState } from "react";
import { Link, Outlet, useOutlet } from "react-router-dom";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [lastMessages, setLastMessages] = useState({}); // Store last message for each user
  const outlet = useOutlet(); // 👈 to check if a child route is active

 useEffect(() => {
    axios.get("http://localhost:4000/api/users")
      .then((res) => {
        setUsers(res.data.data);
        // Fetch last message for each user
        res.data.data.forEach(user => {
          axios.get(`http://localhost:4000/api/messages/latest/${user.wa_id}`)
            .then(res => {
              setLastMessages(prev => ({
                ...prev,
                [user.wa_id]: res.data.data?.text || ""
              }));
            })
            .catch(() => {
              setLastMessages(prev => ({
                ...prev,
                [user.wa_id]: ""
              }));
            });
        });
      })
      .catch(err => {
        console.error("Failed to fetch users:", err);
      });
  }, []);

  const getInitial = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase();
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>Chats</div>
        {users.length === 0 && <p style={{ padding: "1rem" }}>No users found</p>}

        {users.map((user) => (
          <Link
            to={`/chat/${user.wa_id}`}
            key={user.wa_id}
            style={styles.chatItem}
          >
            <div style={styles.avatar}>{getInitial(user.name)}</div>
            <div style={styles.userInfo}>
              <div style={styles.userName}>{user.name}</div>
              <div style={styles.lastMessage}>{lastMessages[user.wa_id]
    ? lastMessages[user.wa_id].substring(0, 10) + (lastMessages[user.wa_id].length > 10 ? "..." : "")
    : "No messages yet"}</div>
            </div>
          </Link>
        ))}
      </div>

      <div style={styles.chatArea}>
        {outlet || (
  <div style={styles.placeholder}>
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
      alt="WhatsApp Logo"
      style={styles.logo}
    />

    <h2 style={styles.heading}>Welcome to WhatsApp</h2>

    <p style={styles.desc}>
      Send and receive messages securely.
    </p>
    <p style={styles.desc}>
      Connect with friends and family instantly.
    </p>

    <div style={styles.footer}>
      <span role="img" aria-label="lock">🔒</span> End-to-end encrypted
    </div>
  </div>
)}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",  
    height: "100vh",
    backgroundColor: "#f0f2f5",
    fontFamily: "Arial, sans-serif",
  },
  sidebar: {
    width: "30%",
    backgroundColor: "#fff",
    borderRight: "1px solid #ddd",
    display: "flex",
    flexDirection: "column",
  },
  sidebarHeader: {
    padding: "1rem",
    fontWeight: "bold",
    fontSize: "18px",
    borderBottom: "1px solid #ddd",
    backgroundColor: "#ededed",
  },
  chatItem: {
    display: "flex",
    alignItems: "center",
    padding: "0.8rem 1rem",
    textDecoration: "none",
    color: "black",
    borderBottom: "1px solid #f0f0f0",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "#4caf50",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "20px",
    fontWeight: "bold",
    marginRight: "1rem",
    flexShrink: 0,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontWeight: "bold",
    fontSize: "16px",
    marginBottom: "4px",
  },
  lastMessage: {
    fontSize: "14px",
    color: "#555",
  },
  chatArea: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
placeholder: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    textAlign: "center",
    height: "100%",
    color: "#41525d",
    position: "relative",
  },
  logo: {
    marginTop: 100,
    width: 100,
    height: 100,
    marginBottom: 20,
    opacity: 0.9,
  },
  heading: {
    margin: 0,
    fontSize: 28,
    fontWeight: 400,
    marginBottom: 10,
  },
  desc: {
    fontSize: 14,
    color: "#667781",
    margin: "2px 0",
  },
  footer: {
    position: "absolute",
    bottom: 20,
    fontSize: 12,
    color: "#8696a0",
  }

};

export default UsersList;
