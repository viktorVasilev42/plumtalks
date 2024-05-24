import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../layout";
import { ChatMapContext, ContactContext } from "../page";
import { Client, Frame, Message, Subscription, over } from 'stompjs';
import { useRouter } from "next/navigation";
import SockJS from "sockjs-client";

export default function useChatSocket() {
    const authContext = useContext(AuthContext);
    const contactContext = useContext(ContactContext);
    const [stompClient, setStompClient] = useState<Client | null>(null);
    const router = useRouter();
    const chatMapContext = useContext(ChatMapContext);
    const [typingMap, setTypingMap] = useState(new Map<number, boolean>());
    const [clientSubs, setClientSubs] = useState<Array<Subscription>>([]);

    useEffect(() => {
        const onError = (error: any) => {
            setStompClient(null);
            router.push("/login");
        }

        const onConnected = (newStompClient: Client) => {
            if (!newStompClient) return;
            setStompClient(newStompClient);
            let msgSub = newStompClient?.subscribe(`/user/${authContext?.userId}/private`, onPrivateMessageRecieved);
            let typeSub = newStompClient?.subscribe(`/user/${authContext?.userId}/typing`, onTypingReceived)

            clientSubs.push(msgSub);
            clientSubs.push(typeSub);
            setClientSubs([...clientSubs]);
        }

        const onPrivateMessageRecieved = (payload: Message) => {
            let jsonPayload = JSON.parse(payload.body);
            let payloadData: MessageInterface = {
                messageId: jsonPayload.messageId,
                senderId: jsonPayload.senderId,
                receiverId: jsonPayload.receiverId,
                content: jsonPayload.content,
                timestamp: jsonPayload.timestamp
            }
            if (chatMapContext?.chatMap.has(payloadData.senderId)) {
                chatMapContext.chatMap.get(payloadData.senderId)?.push(payloadData);
                chatMapContext.setChatMap(new Map(chatMapContext.chatMap));
            }
            else {
                let list = [];
                list.push(payloadData);
                chatMapContext?.chatMap.set(payloadData.senderId, list);
                chatMapContext?.setChatMap(new Map(chatMapContext.chatMap));
            }
        }

        const onTypingReceived = (payload: Message) => {
            let payloadData = JSON.parse(payload.body);
            typingMap.set(payloadData.senderId, payloadData.isTyping);
            setTypingMap(new Map(typingMap));
        }

        const disconnectClient = () => {
            clientSubs.map((cs) => cs.unsubscribe());
            setStompClient(null);
        }
        
        let Sock: WebSocket | null = new SockJS("http://localhost:8080/ws");
        let newStompClient: Client | null = over(Sock);
        newStompClient?.connect({}, () => onConnected(newStompClient!), onError);

        return () => {
            Sock = null;
            newStompClient = null;
            clientSubs.forEach((cs) => cs.unsubscribe());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        stompClient,
        typingMap
    }
}