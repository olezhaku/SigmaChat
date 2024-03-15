import React from "react";
import MyButton from "../UI/Button/MyButton";
import MyInput from "../UI/Input/MyInput";
import classes from "./RightSide.module.css";
import "../../styles/App.css";
import MessageList from "../RightSide/MessageList";

const RightSide = ({
    isActive,
    inputValue,
    handlerInputChange,
    sendMessage,
}) => {
    //validation
    const isValid = () => {
        return isActive !== null;
    };

    //enter
    const handlerKeyPress = (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    };

    return (
        <div className={classes.right__side}>
            <div className="field">
                <MessageList isActive={isActive} />
            </div>

            <div className={classes.input__conteiner}>
                <div className={classes.message__input}>
                    <MyInput
                        value={inputValue}
                        onChange={handlerInputChange}
                        onKeyPress={handlerKeyPress}
                        // disabled={!isValid()}
                    />
                </div>

                <div className={classes.send__button}>
                    <MyButton onClick={sendMessage}>/\</MyButton>
                </div>
            </div>
        </div>
    );
};

export default RightSide;
