import React from "react";
import classes from "./LeftSide.module.css";
import DialogItem from "./DialogItem";

const DialogList = ({ searchValue, dialogs, users, currentDialog }) => {
    //serch users need test!!!
    const filteredUsers = users.filter((user) => {
        return user.username.includes(searchValue);
    });

    //
    return (
        <div className={classes.container}>
            {searchValue
                ? filteredUsers.map((user) => (
                      <DialogItem
                          key={user.id}
                          user={user}
                          dialogs={dialogs}
                          currentDialog={currentDialog}
                      />
                  ))
                : dialogs.slice().map((dialogElement) => {
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

export default DialogList;
