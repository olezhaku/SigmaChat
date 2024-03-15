import React from "react";
import MyInput from "../UI/Input/MyInput";
import classes from "./LeftSide.module.css";
import DialogList from "./DialogList";
import "../../styles/App.css";

const LeftSide = ({
    searchValue,
    users,
    dialogs,
    handlerSearchChange,
    currentDialog,
}) => {
    return (
        <div className={classes.left__side}>
            <div className={classes.search__input}>
                <MyInput value={searchValue} onChange={handlerSearchChange} />
            </div>

            <div className="field">
                {users && users.length > 0 && (
                    <DialogList
                        searchValue={searchValue}
                        users={users}
                        dialogs={dialogs}
                        currentDialog={currentDialog}
                    />
                )}
            </div>
        </div>
    );
};

export default LeftSide;
