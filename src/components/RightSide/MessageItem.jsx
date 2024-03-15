import React from "react";
import classes from "./RightSide.module.css";

const MessageItem = ({ text, id, time, isMe }) => {
    return (
        <div
            key={id}
            className={isMe ? classes.container : classes.container__reversed}
        >
            <div className={isMe ? classes.message : classes.message__reversed}>
                <div className={classes.text}>{text}</div>
                <div className={isMe ? classes.time : classes.time_reversed}>
                    {time}
                </div>
            </div>
        </div>
    );
};

export default MessageItem;
