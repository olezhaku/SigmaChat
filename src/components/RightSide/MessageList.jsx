import React from "react";
import MessageItem from "./MessageItem";
import classes from "./RightSide.module.css";
import { useSelector } from "react-redux";

const MessageList = ({ isActive }) => {
    const messages = useSelector((state) => state.messages.messages);

    return (
        <div className={classes.dialog}>
            {messages
                .slice()
                .reverse()
                .map((message) => (
                    // if (isActive === message.userId) {
                    <MessageItem key={message.id} {...message} />
                    // }
                ))}
        </div>
    );
};

export default MessageList;
