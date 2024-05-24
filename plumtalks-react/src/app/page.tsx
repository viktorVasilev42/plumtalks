"use client"
import { createContext, useContext, useEffect, useState } from 'react';
import AppBar from './components/AppBar';
import ChatScreen from './components/ChatScreen';
import MessagesBar from './components/MessagesBar';
import './homepage.css';
import { CircularProgress } from '@mui/joy';
import { AuthContext } from './layout';
import { ChatSocketInterface } from './interfaces/ChatSocketInterface';

export const AppBarContext = createContext<AppBarContextInterface | null>(null);
export const ContactContext = createContext<ContactContextInterface | null>(null);
export const ChatMapContext = createContext<ChatMapContextInterface | null>(null);

export default function Home() {
  const authContext = useContext(AuthContext);
  const [selectedAppBar, setSelectedAppBar] = useState(1);
  const [selectedContact, setSelectedContact] = useState(-1);
  const [prevContact, setPrevContact] = useState(-1);
  const [chatMap, setChatMap] = useState(new Map<number, Array<MessageInterface>>());

  return (
    <div>
      {authContext?.isLoading ? (
        <div style={{display: "flex", width: "100vw", height: "100vh", justifyContent: "center", alignItems: "center"}}>
          <CircularProgress size="lg" />
        </div>
      ) : (
        <div className="mainContainer">
          <AppBarContext.Provider value={{selectedAppBar, setSelectedAppBar}}>
          <ContactContext.Provider value={{selectedContact, setSelectedContact, prevContact, setPrevContact}}>
          <ChatMapContext.Provider value={{chatMap, setChatMap}}>
            <AppBar />
            <MessagesBar />
            <ChatScreen />
          </ChatMapContext.Provider>
          </ContactContext.Provider>
          </AppBarContext.Provider>
       </div>
      )}
    </div>
  );
}
