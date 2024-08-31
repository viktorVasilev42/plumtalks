import axios from "axios"
import { useContext } from "react"
import { AuthContext } from "../layout"
import { useRouter } from "next/navigation";

export default function useSettings() {
    const authContext = useContext(AuthContext);
    const router = useRouter();

    const updateDisplayName = (newDisplayName: string) => {
        axios.post("http://plumtalks.local/api/user/displayName", 
        {
            "displayName": newDisplayName
        },
        {
            headers: { Authorization: `Bearer ${authContext?.authToken}` }
        })
        .then((res) => {
            router.push("/");
        })
        .catch((e) => {
            router.push("/login")
        });
    }

    return {
        updateDisplayName
    }
}
