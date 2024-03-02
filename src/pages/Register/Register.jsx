import React, { useState, useRef } from "react";
import classes from "./Register.module.css";
import MyButton from "../../components/UI/Button/MyButton";
import MyInput from "../../components/UI/Input/MyInput";
import { Link } from "react-router-dom";
import MyModal from "../../components/UI/Modal/MyModal";

const Register = () => {
    //hooks
    const [inputValues, setInputValues] = useState({
        login: "",
        password: "",
        repeat: "",
    });
    const [send, setSend] = useState({
        login: null,
        password: null,
        repeat: null,
    });
    const [hasError, setHasError] = useState({
        login: false,
        password: false,
        repeat: false,
    });
    const [isActive, setIsActive] = useState(0);
    const inputRefs = useRef([]);
    const [modal, setModal] = useState(true);

    //validation
    const getClassName = (index, cls) => {
        return index === isActive ? `${cls} ${classes.active}` : cls;
    };

    const inputValidation = (value) => {
        const regex = /^[\x21-\x7E]{6,}$/;
        return !regex.test(value);
    };

    const handleInputChange = (event, inputName) => {
        const value = event.target.value;
        setInputValues({
            ...inputValues,
            [inputName]: value,
        });
        setHasError({
            ...hasError,
            [inputName]: inputValidation(value),
        });
    };

    const isValid = () => {
        return (
            inputValues.login.trim() !== "" &&
            inputValues.password.trim() !== "" &&
            inputValues.repeat.trim() !== "" &&
            !hasError.login &&
            !hasError.password &&
            !hasError.repeat &&
            inputValues.password === inputValues.repeat
        );
    };

    //key settings
    const handleKeyDown = (event, index) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const nextIndex = index + 1;
            if (inputRefs.current[nextIndex]) {
                inputRefs.current[nextIndex].focus();
            }
        } else if (event.key === " ") {
            event.preventDefault();
        }
    };

    //button
    const handleClick = (path) => {
        setIsActive(path);
    };

    const handleClickButton = (send) => {
        setSend(send);
        console.log(inputValues);

        // setTimeout(() => {
        //     window.location.href = "/";
        // }, 50);
    };

    //modal
    const showModal = () => {
        setModal(!modal);
    };

    return (
        <div className={classes.login_back}>
            <div className={classes.head}>
                <Link
                    onClick={() => handleClick("/login")}
                    className={getClassName("/login", classes.login)}
                    to="/login"
                >
                    Вход
                </Link>
                <h1 className={getClassName(0, classes.register)}>
                    Регистрация
                </h1>
            </div>

            <label htmlFor="login">Придумайте логин</label>
            <MyInput
                id="login"
                style={{
                    margin: "10px 0",
                    border: hasError.login ? " solid red" : null,
                }}
                onChange={(event) => handleInputChange(event, "login")}
                ref={(ref) => (inputRefs.current[0] = ref)}
                onKeyDown={(event) => handleKeyDown(event, 0)}
            />

            <label htmlFor="password">Придумайте пароль</label>
            <MyInput
                id="password"
                style={{
                    margin: "10px 0",
                    border: hasError.password ? " solid red" : null,
                }}
                onChange={(event) => handleInputChange(event, "password")}
                ref={(ref) => (inputRefs.current[1] = ref)}
                onKeyDown={(event) => handleKeyDown(event, 1)}
            />

            <label htmlFor="repeat">Повторите пароль</label>
            <MyInput
                id="repeat"
                style={{
                    margin: "10px 0",
                    border: hasError.repeat ? " solid red" : null,
                }}
                onChange={(event) => handleInputChange(event, "repeat")}
                ref={(ref) => (inputRefs.current[2] = ref)}
                onKeyDown={(event) => handleKeyDown(event, 2)}
            />

            {inputValues.password !== inputValues.repeat && (
                <p className={classes.warning}>Пароли не совпадают</p>
            )}

            <MyButton
                style={{
                    marginTop: "30px ",
                }}
                disabled={!isValid()}
                onClick={() => handleClickButton()}
            >
                Зарегистрироваться
            </MyButton>
            {modal && (
                <MyModal>
                    <h2>Внимание!</h2>
                    <p className={classes.modal_content}>
                        Логин и пароль могут включать прописные и строчные
                        латинские буквы, спецсимволы и цифры. Минимальная длина
                        - 6 символов. Их нельзя изменить после регистрации.
                        Логин виден всем в 'Σ, σ, ς Чате'. При утере пароля
                        восстановление невозможно.
                    </p>
                    <div className={classes.modal_buttons}>
                        <MyButton onClick={() => showModal()}>Хорошо</MyButton>
                    </div>
                </MyModal>
            )}
        </div>
    );
};

export default Register;
