import React, { useEffect, useState } from "react";
import MessageItem from "@chatapp/shared";
import { getMessages } from "./services/messageServices";

const MessagesPage = () => {
  const [message, setMessage] = useState<MessageItem | undefined>();
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    getMessages()
      .then(setMessage)
      .catch((error) => {
        setMessage(undefined);
        setError("Couldn't find any messages...");
      });
  }, []);

  const output = () => {
    if (error) {
      return <>{error}</>;
    } else if (message) {
      return (
        <div className="messageBubble">
          <p>{message.user}</p>
          <p>{message.text}</p>
          <>{message.timeStamp}</>
        </div>
      );
    } else {
      return <>"Looking for messages..."</>;
    }
  };

  return <div>{output()}</div>;
};

export default MessagesPage;
