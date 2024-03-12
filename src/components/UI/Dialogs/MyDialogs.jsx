import React from "react";
import classes from "./MyDialogs.module.css";

const MyDialogs = ({ ...props }) => {
    const currentDialog = (id) => {
        props.setActive(id);

        const updatedDialogs = props.dialogs.map((dialog) => ({
            ...dialog,
            isCurrent: dialog.userId === id,
        }));

        props.setDialogs(updatedDialogs);

        props.createDialog(id);
    };

    return (
        <div className={classes.container}>
            {props.value
                ? props.users.map((userElement) => {
                      if (userElement.username.includes(props.value)) {
                          return (
                              <div
                                  key={userElement.id}
                                  className={classes.dialogs}
                                  onClick={() => currentDialog(userElement.id)}
                              >
                                  <div className={classes.names}>
                                      {userElement.username}
                                  </div>
                                  <div className={classes.text}>
                                      {props.dialogs.map((el) => {
                                          if (
                                              el.userId === userElement.userId
                                          ) {
                                              return el.lstMsg;
                                          }
                                      })}
                                  </div>
                              </div>
                          );
                      }
                  })
                : props.dialogs.slice().map((dialogElement) => {
                      return (
                          <div
                              key={dialogElement.dialogId}
                              className={
                                  dialogElement.isCurrent
                                      ? classes.dialogs__current
                                      : classes.dialogs
                              }
                              onClick={() =>
                                  currentDialog(dialogElement.userId)
                              }
                          >
                              <div className={classes.names}>
                                  {dialogElement.name}
                              </div>
                              <div className={classes.text}>
                                  {dialogElement.lstMsg}
                              </div>
                          </div>
                      );
                  })}
        </div>
    );
};

export default MyDialogs;
