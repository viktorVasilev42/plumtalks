interface MessageInterface {
    messageId: number;
    senderId: number;
    receiverId: number;
    content: string;
    timestamp: Date;
}