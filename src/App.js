
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Chat from './Pages/Chat';
import UserChat from './components/UserChat';
import UserBar from './components/UserBar';


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
          <Route  element={<UserBar />} >
            <Route path="/chat/:wa_id" element={<UserChat />} />
          </Route>
       
      </Routes>
    </div>
  );
}

export default App;
