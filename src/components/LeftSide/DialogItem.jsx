import React from "react";
import classes from "./LeftSide.module.css";

const DialogItem = ({ user, dialogs, key, currentDialog }) => {
    return (
        <div
            key={key}
            className={classes.dialogs}
            onClick={() => currentDialog(user.id)}
        >
            <div className={classes.names}>{user.username}</div>

            <div className={classes.text}>
                {dialogs.map((el) => {
                    if (el.userId === user.userId) {
                        return el.lstMsg;
                    }
                })}
            </div>
        </div>
    );
};

export default DialogItem;
