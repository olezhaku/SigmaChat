import React, { useEffect, useState } from "react";

import "../../styles/App.css";

import { dataFetching } from "../../api/dataFetching";
import LeftSide from "../../components/LeftSide/LeftSide";
import RightSide from "../../components/RightSide/RightSide";
import { createMessage } from "../../store/messageSlice";
import { useDispatch } from "react-redux";

const Messager = () => {
    //hooks
    const [inputValue, setInputValue] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [dialogs, setDialogs] = useState([]);
    const [isActive, setIsActive] = useState(null);
    const [users, setUsers] = useState([]);
    const dispatch = useDispatch();

    //message send
    const sendMessage = () => {
        if (inputValue.trim() !== "") {
            dispatch(createMessage(inputValue, isActive));
            setInputValue("");
        }
    };

    //search
    const handlerSearchChange = (event) => {
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
    }, []);

    //dialogs
    const createDialog = (id) => {
        if (searchValue.trim() !== "") {
            const existingDialog = dialogs.find(
                (dialog) => dialog.userId === users[id].id
            );

            if (!existingDialog) {
                const newDialog = {
                    dialogId: dialogs.length + 1,
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
    const currentDialog = (id) => {
        setIsActive(id);

        const updatedDialogs = dialogs.map((dialog) => ({
            ...dialog,
            isCurrent: dialog.userId === id,
        }));

        setDialogs(updatedDialogs);

        createDialog(id);
    };

    //input message
    const handlerInputChange = (event) => {
        setInputValue(event.target.value);
    };

    return (
        <div className="back">
            <div className="grid__container">
                <LeftSide
                    searchValue={searchValue}
                    users={users}
                    dialogs={dialogs}
                    handlerSearchChange={handlerSearchChange}
                    currentDialog={currentDialog}
                />

                <RightSide
                    isActive={isActive}
                    inputValue={inputValue}
                    handlerInputChange={handlerInputChange}
                    sendMessage={sendMessage}
                />
            </div>
        </div>
    );
};

export default Messager;
