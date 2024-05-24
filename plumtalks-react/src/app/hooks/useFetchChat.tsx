import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ChatMapContext, ContactContext } from "../page";
import { AuthContext } from "../layout";
import { useRouter } from "next/navigation";

export default function useFetchChat() {
    const [chatMessages, setChatMessages] = useState<Map<number, Array<MessageInterface>>>(new Map());
    const contactContext = useContext(ContactContext);
    const authContext = useContext(AuthContext);
    const chatMapContext = useContext(ChatMapContext);
    const router = useRouter();

    useEffect(() => {
        if (contactContext?.selectedContact == -1 || chatMessages.has(contactContext?.selectedContact!)) return;

        const fetchMessages = () => {
            axios.get<Array<MessageInterface>>(`http://localhost:8080/user/chatWith/${contactContext?.selectedContact}`, {
                headers: { Authorization: `Bearer ${authContext?.authToken}` }
            })
            .then((res) => {
                let tmpDate = new Date();
                chatMessages.set(
                    contactContext?.selectedContact!, 
                    res.data.slice(chatMapContext?.chatMap.get(contactContext?.selectedContact!)?.length)
                );
                setChatMessages(new Map(chatMessages));
            })
            .catch((e) => {
                router.push("/login");
            })
        }

        fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contactContext?.selectedContact])

    return {
        chatMessages
    }
}