import React from "react";
import classes from "./MyDialog.module.css";

const MyDialog = ({ ...props }) => {
    return (
        <div className={classes.dialog}>
            {props.message
                .slice()
                .reverse()
                .map((messageElement) => {
                    if (props.active === messageElement.userId) {
                        return (
                            <div
                                key={messageElement.messageId}
                                className={
                                    messageElement.isMe
                                        ? classes.container
                                        : classes.container__reversed
                                }
                            >
                                <div
                                    className={
                                        messageElement.isMe
                                            ? classes.message
                                            : classes.message__reversed
                                    }
                                >
                                    <div className={classes.text}>
                                        {messageElement.text}
                                    </div>
                                    <div
                                        className={
                                            messageElement.isMe
                                                ? classes.time
                                                : classes.time_reversed
                                        }
                                    >
                                        {messageElement.time}
                                    </div>
                                </div>
                            </div>
                        );
                    }
                })}
        </div>
    );
};

export default MyDialog;
