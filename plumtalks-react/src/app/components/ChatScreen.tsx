import { Button, Divider, Input } from "@mui/joy";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ChatBubble from "./ChatBubble";
import { ChangeEvent, KeyboardEvent, useContext, useEffect, useState } from "react";
import { ChatMapContext, ContactContext } from "../page";
import useFetchChat from "../hooks/useFetchChat";
import SendIcon from '@mui/icons-material/Send';
import useChatSocket from "../hooks/useChatSocket";
import { AuthContext } from "../layout";

export default function ChatScreen() {
    const contactContext = useContext(ContactContext);
    const authContext = useContext(AuthContext);
    const chatMapContext = useContext(ChatMapContext);
    const fetchChat = useFetchChat();
    const [currMessage, setCurrMessage] = useState("");
    const chatSocket = useChatSocket();

    const handleSendMessage = () => {
        if (!chatSocket?.stompClient) return;
        if (currMessage.length == 0 || contactContext?.selectedContact == -1) return;

        let newMsg: MessageInterface = {
            messageId: 0,
            senderId: Number(authContext?.userId),
            receiverId: (contactContext?.selectedContact == undefined ? -1 : contactContext.selectedContact),
            content: currMessage,
            timestamp: new Date()
        };
        chatSocket.stompClient.send("/app/message", {}, JSON.stringify(newMsg));
        if (chatMapContext?.chatMap.get(contactContext?.selectedContact!)) {
            chatMapContext.chatMap.get(contactContext?.selectedContact!)?.push(newMsg);
            chatMapContext.setChatMap(new Map(chatMapContext.chatMap));
        }
        else {
            let list = [];
            list.push(newMsg);
            chatMapContext?.chatMap.set(contactContext?.selectedContact!, list);
            chatMapContext?.setChatMap(new Map(chatMapContext.chatMap));
        }
        handleOnCurrMessageChange("");
    }

    const handleOnCurrMessageChange = (newValue: string) => {
        if (!chatSocket?.stompClient) return;
        let wasTyping = (currMessage.length > 0);
        let currIsTyping = (newValue.length > 0);
        setCurrMessage(newValue);

        if (wasTyping == currIsTyping) return;

        let newTypingDTO: TypingDTOInterface = {
            isTyping: currIsTyping,
            receiverId: contactContext?.selectedContact,
            senderId: Number(authContext?.userId)
        };
        chatSocket.stompClient.send("/app/typing", {}, JSON.stringify(newTypingDTO));
    }

    const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSendMessage();
        }
    }

    useEffect(() => {
        setCurrMessage("");
        let newTypingDTO: TypingDTOInterface = {
            isTyping: false,
            receiverId: contactContext?.prevContact,
            senderId: Number(authContext?.userId)
        }
        chatSocket?.stompClient?.send("/app/typing", {}, JSON.stringify(newTypingDTO))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contactContext?.selectedContact])

    return (
        <div className="chatScreen">
            <div className="chatToolBar">
                <Input 
                    variant="soft"
                    startDecorator={<SearchIcon style={{fontSize: "1.2vw"}} />} 
                    endDecorator={<ClearIcon style={{fontSize: "1.2vw"}} />}
                    placeholder="Search..."
                    sx={{
                        height: "4vh", width: "15vw", fontSize: "0.8vw",
                        "--Input-minHeight": "4vh",
                        "--Input-radius": "8vw",
                        "--Input-gap": "0.3vw",
                        "--Input-paddingInline": "0.5vw"
                    }} 
                />
                <div style={{
                    height: "8vh", width: "8vh",
                    backgroundColor: "rgba(16, 136, 255, 0.9)",
                    display: "flex", justifyContent: "center", alignItems: "center",
                    cursor: "pointer"
                }}>
                    <ArrowForwardIosIcon style={{fontSize: "5vh", color: "white"}} />
                </div>
            </div>
            <div className="gradientDivider"></div>
            <div className="messagesContainer">
                {(chatSocket?.typingMap.get(contactContext?.selectedContact!) == true) && (
                    <ChatBubble 
                        direction="left"
                        text={"..."}
                        key={"-1"}
                    />
                )}
                <div>
                    {chatMapContext?.chatMap.get(contactContext?.selectedContact!)?.map((cm: MessageInterface) => (
                        <ChatBubble 
                            direction={(cm.senderId == contactContext?.selectedContact) ? "left" : "right"}
                            text={cm.content}
                            key={chatMapContext.chatMap.get(contactContext?.selectedContact!)?.indexOf(cm)}
                        />
                    ))}
                </div>
                <Divider style={{ marginInline: "1vw", height: "0.15vh" }} />
                {fetchChat.chatMessages.get(contactContext?.selectedContact!)?.map((cm) => (
                    <ChatBubble 
                        direction={(cm.senderId == contactContext?.selectedContact) ? "left" : "right"}
                        text={cm.content}
                        key={fetchChat.chatMessages.get(contactContext?.selectedContact!)?.indexOf(cm)}
                    />
                ))}
            </div>
            <div className="sendBar">
                <Input 
                    variant="outlined"
                    placeholder="Send message..."
                    value={currMessage}
                    onChange={(event) => handleOnCurrMessageChange(event.target.value)}
                    onKeyDown={(event) => handleEnter(event)}
                    sx={{
                        height: "5vh", width: "56.5vw", fontSize: "0.8vw", borderWidth: "0.1vw",
                        "--Input-minHeight": "5vh",
                        "--Input-radius": "8vw",
                        "--Input-gap": "0.3vw",
                        "--Input-paddingInline": "0.8vw",
                    }} 
                />
                <Button 
                    startDecorator={<SendIcon style={{fontSize: "1vw"}} />}
                    disabled={contactContext?.selectedContact == -1}
                    sx={{
                        height: "5vh", width: "6vw", fontSize: "0.8vw", 
                        padding: "0vh",
                        "--Button-minHeight": "5vh",
                        "--Button-radius": "8vw",
                        "--Button-gap": "0.5vw",
                        "--Input-paddingInline": "0vw"
                    }}
                    onClick={handleSendMessage}
                >
                    Send
                </Button>
            </div>
        </div>
    );
}