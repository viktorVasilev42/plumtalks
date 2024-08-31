import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../layout";
import { useRouter } from "next/navigation";

export default function useFetchProfiles() {
    const [profiles, setProfiles] = useState<ProfileInterface[]>([]);
    const authContext = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        const fetchProfiles = () => {
            axios.get("http://plumtalks.local/api/user/profile", {
                headers: { Authorization: `Bearer ${authContext?.authToken}` }
            })
            .then((res) => {
                setProfiles(res.data);
            })
            .catch((e) => {
                router.push("/login");
            })
        }

        fetchProfiles();
    }, [authContext?.authToken, router])

    return {
        profiles
    }
}
