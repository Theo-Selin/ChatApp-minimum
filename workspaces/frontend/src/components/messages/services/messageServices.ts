import MessageItem from "@chatapp/shared";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";

export const getMessages = async (): Promise<MessageItem> => {
    const response = await axios.get<MessageItem>("/messages");
    return response.data;
};