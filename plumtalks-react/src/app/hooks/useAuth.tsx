import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useAuth() {
    const [authToken, setAuthToken] = useState("");
    const [userId, setUserId] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const fetchAuth = async () => {
            setIsLoading(true);
            if (pathname === "/login" || pathname === "/register") return;
            axios.get("http://localhost:8080/user", {
                headers: { Authorization: `Bearer ${authToken}` }
            })
            .then((res) => {
                setDisplayName(res.data);
                setIsLoading(false);
            })
            .catch((e) => {
                router.push("/login");
            });
        }

        fetchAuth();
    }, [authToken, router, pathname]);

    const handleLogin = (emailValue: string, passwordValue: string): Promise<boolean> => {
        return axios.post<JwtResponse>("http://localhost:8080/auth/login", {
            username: `${emailValue}`,
            password: `${passwordValue}`
        })
        .then((res) => {
            setAuthToken(res.data.jwt);
            setUserId(res.data.userId);
            router.push("/");
            return true;
        })
        .catch((e) => false)
    }

    const handleLogout = () => {
        setAuthToken("");
        setDisplayName("");
        setUserId("");
    }

    const handleRegister = (emailValue: string, passwordValue: string): Promise<boolean> => {
        return axios.post<boolean>("http://localhost:8080/auth/register", {
            username: `${emailValue}`,
            password: `${passwordValue}`
        })
        .then((res) => {
            setAuthToken("REGISTER")
            router.push("/login");
            return true;
        })
        .catch((e) => false);
    }


    return { 
        authToken, 
        isLoading,
        handleLogin,
        handleLogout,
        handleRegister,
        userId,
        displayName
    };
}

type JwtResponse = {
    jwt: string;
    userId: string;
}