import React, { useEffect, useState } from "react";
import MessageItem from "@chatapp/shared";
import { getMessages } from "./services/messageServices";
import axios from "axios";

const MessagesPage = () => {
  const [messageText, setMessageText] = useState("");
  const [messages, setMessages] = useState<MessageItem[] | []>();
  const [error, setError] = useState<string | undefined>();

  // vvv Can't find a way to update messages state from services vvv
  const createMessage = (messageText: string): void => {
    const messageItem: MessageItem = {
      text: messageText,
      timeStamp: new Date(),
      user: "populated userId",
    };
    axios
      .post<MessageItem[]>("/messages", messageItem)
      .then((response) => setMessages(response.data));
  };
  // ^^^ Function placed here awaiting fix depending on time ^^^

  useEffect(() => {
    getMessages()
      .then(setMessages)
      .catch((error) => {
        setMessages(undefined);
        setError("Couldn't find any messages...");
      });
  }, []);

  const output = () => {
    if (error) {
      return <div>{error}</div>;
    } else if (messages) {
      return (
        <div className="messageBubble">
          {messages.map((item) => {
            return (
              <div className="messageInfo" key={item.id}>
                <p>{item.user}</p>
                <p>{item.text}</p>
                <>{item.timeStamp}</>
              </div>
            );
          })}
        </div>
      );
    } else {
      return <div>"Looking for messages..."</div>;
    }
  };

  return (
    <>
      <div className="messageContainer">{output()}</div>
      <section className="sendMessage">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <button onClick={(e) => createMessage(messageText)}>Send</button>
      </section>
    </>
  );
};

export default MessagesPage;
