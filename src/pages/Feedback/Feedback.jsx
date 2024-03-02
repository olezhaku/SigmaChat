import React, { useState, useRef } from "react";
import MyInput from "../../components/UI/Input/MyInput";
import MyButton from "../../components/UI/Button/MyButton";
import classes from "./Feedback.module.css";
import MySelect from "../../components/UI/Select/MySelect";

const Feedback = () => {
    //hooks
    const [inputValues, setInputValues] = useState({
        name: "",
        text: "",
        select: "",
    });
    const [send, setSend] = useState({
        name: null,
        poblem: null,
        select: null,
    });
    const [hasError, setHasError] = useState({
        name: false,
        text: false,
    });
    const inputRefs = useRef([]);

    //input
    const handleKeyDown = (event, index) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const nextIndex = index + 1;
            if (inputRefs.current[nextIndex]) {
                inputRefs.current[nextIndex].focus();
            }
        }
    };

    const handleInputChange = (event, inputName) => {
        setInputValues({ ...inputValues, [inputName]: event.target.value });
        setHasError({
            ...hasError,
            [inputName]: event.target.value.trim().length === 0,
        });
    };

    // select
    const handleSelectChange = (option) => {
        setInputValues({ ...inputValues, select: option });
    };

    //button
    const handleClick = (send) => {
        setSend(send);
    };

    const isFormValid = () => {
        return (
            inputValues.name.trim() !== "" &&
            inputValues.text.trim() !== "" &&
            inputValues.select !== ""
        );
    };

    return (
        <div className="back">
            <h2>Обратная связь</h2>
            <form>
                <label htmlFor="name">Ваше имя</label>
                <MyInput
                    id="name"
                    value={inputValues.name}
                    style={{
                        margin: "12px 0 25px 0",
                        border: hasError.name ? " solid red" : null,
                    }}
                    onChange={(event) => handleInputChange(event, "name")}
                    ref={(ref) => (inputRefs.current[0] = ref)}
                    onKeyDown={(event) => handleKeyDown(event, 0)}
                />

                <label htmlFor="text">Текст</label>
                <MyInput
                    id="text"
                    value={inputValues.text}
                    style={{
                        margin: "12px 0 25px 0",
                        border: hasError.text ? " solid red" : null,
                    }}
                    onChange={(event) => handleInputChange(event, "text")}
                    ref={(ref) => (inputRefs.current[1] = ref)}
                    onKeyDown={(event) => handleKeyDown(event, 1)}
                />

                <p style={{ margin: "0 0 12px 12px" }}>Причина обращения</p>
                <MySelect
                    defaultOption="Выберете причину"
                    options={["Ошибка", "Баг", "Нужна помощь", "Предложения"]}
                    onChange={(option) => handleSelectChange(option)}
                />

                <MyButton
                    style={{
                        position: "absolute",
                        bottom: "10px",
                    }}
                    disabled={!isFormValid()}
                    onClick={() => handleClick(inputValues)}
                >
                    Отправить
                </MyButton>
            </form>
        </div>
    );
};

export default Feedback;
