interface RecentChatInterface {
    messageId: number;
    senderId: number;
    receiverId: number;
    content: string;
    timestamp: Date;
    otherUserId: number;
    displayName: string;
}