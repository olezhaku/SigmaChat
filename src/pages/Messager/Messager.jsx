import React, { useEffect, useState } from "react";
import MyInput from "../../components/UI/Input/MyInput";
import MyButton from "../../components/UI/Button/MyButton";
import classes from "./Messager.module.css";
import MyDialog from "../../components/UI/Dialog/MyDialog";

import { dataFetching } from "../../api/dataFetching";
import MyDialogs from "../../components/UI/Dialogs/MyDialogs";

const Messager = () => {
    //hooks
    const [inputValue, setInputValue] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [dialogs, setDialogs] = useState([]);
    const [isActive, setIsActive] = useState(null);
    const [message, setMessage] = useState([]);
    //
    const [users, setUsers] = useState([]);

    //search
    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    //users
    useEffect(() => {
        async function dataUsers() {
            try {
                setUsers(await dataFetching());
            } catch (error) {
                // console.error(error);
            }
        }
        dataUsers();
    }, [users]);

    //dialogs
    const createDialog = (id) => {
        if (searchValue.trim() !== "") {
            const existingDialog = dialogs.find(
                (dialog) => dialog.userId === users[id].id
            );

            if (!existingDialog) {
                const newDialog = {
                    dialogId: dialogs.length,
                    isCurrent: true,
                    userId: users[id].id,
                    name: users[id].username,
                };

                const updatedDialogs = [...dialogs, newDialog];
                updatedDialogs.forEach((dialog) => {
                    if (dialog.dialogId !== newDialog.dialogId) {
                        dialog.isCurrent = false;
                    }
                });
                setDialogs(updatedDialogs);
            } else {
                const updatedDialogs = dialogs.map((dialog) => {
                    if (dialog.userId === users[id].id) {
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
                messageId: message.length,

                userId: isActive,
                isMe: true,
                text: inputValue,
                time: time,
            };

            dialogs.map((dialog) => {
                if (dialog.userId === isActive) {
                    return (dialog.lstMsg = newMessage.text);
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
                        <MyDialogs
                            value={searchValue}
                            users={users}
                            dialogs={dialogs}
                            setDialogs={setDialogs}
                            setActive={setIsActive}
                            createDialog={createDialog}
                        />
                    </div>
                </div>

                <div className={classes.right_side}>
                    <div className={classes.field}>
                        <MyDialog message={message} active={isActive} />
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
