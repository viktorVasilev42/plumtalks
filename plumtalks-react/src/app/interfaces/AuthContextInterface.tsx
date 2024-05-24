interface AuthContextInterface {
    authToken: string;
    userId: string;
    displayName: string;
    isLoading: boolean;
    handleLogin: (username: string, password: string) => Promise<boolean>;
    handleLogout: () => void;
    handleRegister: (username: string, password: string) => Promise<boolean>;
}