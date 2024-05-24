import { Client } from "stompjs";

export interface ChatSocketInterface {
    stompClient: Client | null;
    typingMap: Map<number, boolean>;
    disconnectClient: () => void;
}