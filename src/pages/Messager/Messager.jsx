import React, { useState } from "react";
import MyInput from "../../components/UI/Input/MyInput";
import MyButton from "../../components/UI/Button/MyButton";
import classes from "./Messager.module.css";
import { users } from "../../components/dataPosts";

const Messager = () => {
    //hooks
    const [inputValue, setInputValue] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [message, setMessage] = useState([]);
    const [dialogs, setDialogs] = useState([]);
    const [isActive, setIsActive] = useState(null);

    //search
    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    //dialogs
    const createDialog = (id) => {
        if (searchValue.trim() !== "") {
            const existingDialog = dialogs.find(
                (dialog) => dialog.userID === users[id].userID
            );

            if (!existingDialog) {
                const newDialog = {
                    dialogID: dialogs.length,
                    isCurrent: true,
                    userIDme: 0,
                    userID: users[id].userID,
                    name: users[id].username,
                };

                const updatedDialogs = [...dialogs, newDialog];
                updatedDialogs.forEach((dialog) => {
                    if (dialog.dialogID !== newDialog.dialogID) {
                        dialog.isCurrent = false;
                    }
                });
                setDialogs(updatedDialogs);
            } else {
                const updatedDialogs = dialogs.map((dialog) => {
                    if (dialog.userID === users[id].userID) {
                        dialog.isCurrent = true;
                    } else {
                        dialog.isCurrent = false;
                    }
                    return dialog;
                });
                setDialogs(updatedDialogs);
            }

            setSearchValue("");
        }
    };

    //isActive
    const currentDialog = (id) => {
        setIsActive(id);

        const updatedDialogs = dialogs.map((dialog) => ({
            ...dialog,
            isCurrent: dialog.userID === id,
        }));

        setDialogs(updatedDialogs);

        createDialog(id);
    };

    //input message
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const hendleKeyPress = (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    };

    //time
    const time =
        new Date().toLocaleTimeString().slice(0, -3) +
        " Σ " +
        new Date().toLocaleDateString().slice(0, -5);

    //message
    const sendMessage = () => {
        if (inputValue.trim() !== "") {
            const newMessage = {
                messageID: message.length,
                userIDme: 0,
                userID: isActive,
                isMe: true,
                text: inputValue,
                time: time,
            };

            dialogs.map((dialog) => {
                if (dialog.userID === isActive) {
                    dialog.lstMsg = newMessage.text;
                }
            });

            setMessage([...message, newMessage]);
            setInputValue("");
        }
    };

    //validation
    const isValid = () => {
        return isActive !== null;
    };

    return (
        <div className="back">
            <div className={classes.grid_container}>
                <div className={classes.left_side}>
                    <div className={classes.search_input}>
                        <MyInput
                            value={searchValue}
                            onChange={handleSearchChange}
                        />
                    </div>

                    <div className={classes.field}>
                        <div className={classes.dialogs}>
                            {searchValue
                                ? users.map((userElement) => {
                                      if (
                                          userElement.username.includes(
                                              searchValue
                                          )
                                      ) {
                                          return (
                                              <div
                                                  key={userElement.userID}
                                                  className={classes.my_dialogs}
                                                  onClick={() =>
                                                      currentDialog(
                                                          userElement.userID
                                                      )
                                                  }
                                              >
                                                  <div
                                                      className={
                                                          classes.my_dialogs_names
                                                      }
                                                  >
                                                      {userElement.username}
                                                  </div>
                                                  <div
                                                      className={
                                                          classes.my_dialogs_text
                                                      }
                                                  >
                                                      {dialogs.map((el) => {
                                                          if (
                                                              el.userID ===
                                                              userElement.userID
                                                          ) {
                                                              return el.lstMsg;
                                                          }
                                                      })}
                                                  </div>
                                              </div>
                                          );
                                      }
                                  })
                                : dialogs.slice().map((dialogElement) => {
                                      return (
                                          <div
                                              key={dialogElement.dialogID}
                                              className={
                                                  dialogElement.isCurrent
                                                      ? classes.my_dialogs_current
                                                      : classes.my_dialogs
                                              }
                                              onClick={() =>
                                                  currentDialog(
                                                      dialogElement.userID
                                                  )
                                              }
                                          >
                                              <div
                                                  className={
                                                      classes.my_dialogs_names
                                                  }
                                              >
                                                  {dialogElement.name}
                                              </div>
                                              <div
                                                  className={
                                                      classes.my_dialogs_text
                                                  }
                                              >
                                                  {dialogElement.lstMsg}
                                              </div>
                                          </div>
                                      );
                                  })}
                        </div>
                    </div>
                </div>

                <div className={classes.right_side}>
                    <div className={classes.field}>
                        <div className={classes.open_dialog}>
                            {message
                                .slice()
                                .reverse()
                                .map((messageElement) => {
                                    if (isActive === messageElement.userID) {
                                        return (
                                            <div
                                                key={messageElement.messageID}
                                                className={
                                                    messageElement.isMe
                                                        ? classes.message_container
                                                        : classes.message_container_reversed
                                                }
                                            >
                                                <div
                                                    className={
                                                        messageElement.isMe
                                                            ? classes.message
                                                            : classes.message_reversed
                                                    }
                                                >
                                                    <div
                                                        className={
                                                            classes.message_text
                                                        }
                                                    >
                                                        {messageElement.text}
                                                    </div>
                                                    <div
                                                        className={
                                                            messageElement.isMe
                                                                ? classes.message_time
                                                                : classes.message_time_reversed
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
                    </div>

                    <div className={classes.input_conteiner}>
                        <div className={classes.message_input}>
                            <MyInput
                                value={inputValue}
                                onChange={handleInputChange}
                                onKeyPress={hendleKeyPress}
                                disabled={!isValid()}
                            />
                        </div>

                        <div className={classes.send_button}>
                            <MyButton onClick={sendMessage}>/\</MyButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messager;
