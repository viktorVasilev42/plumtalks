interface ChatMapContextInterface {
    chatMap: Map<number, Array<MessageInterface>>;
    setChatMap: (newMapValue: Map<number, Array<MessageInterface>>) => void;
}