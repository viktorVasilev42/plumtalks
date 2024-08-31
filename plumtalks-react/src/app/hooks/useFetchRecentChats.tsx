import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../layout";
import axios from "axios";
import { ChatMapContext } from "../page";

export default function useFetchRecentChats() {
    const [recentChats, setRecentChats] = useState<Array<RecentChatInterface>>([]);
    const [isLoading, setIsLoading] = useState(true);
    const authContext = useContext(AuthContext);
    const chatMapContext = useContext(ChatMapContext);

    useEffect(() => {
        setIsLoading(true);
        const fetchRecentChats = () => {
            axios.get("http://plumtalks.local/api/user/chat/recent", {
                headers: { Authorization: `Bearer ${authContext?.authToken}` }
            })
            .then((res) => {
                setRecentChats(res.data);
                setIsLoading(false);
            })
            .catch((e) => {
                console.log(e);
            })
        }

        fetchRecentChats();
    }, [authContext?.authToken, chatMapContext?.chatMap]);

    return {
        recentChats,
        isLoading
    }
}
