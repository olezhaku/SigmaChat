import React, { useState, useRef } from "react";
import MyInput from "../../components/UI/Input/MyInput";
import MyButton from "../../components/UI/Button/MyButton";
import classes from "./Login.module.css";
import { Link } from "react-router-dom";

function Login() {
    //hooks
    const [inputValues, setInputValues] = useState({
        login: "",
        password: "",
    });
    const [send, setSend] = useState({
        login: null,
        password: null,
    });
    const [hasError, setHasError] = useState({
        login: false,
        password: false,
    });
    const [isActive, setIsActive] = useState(0);
    const inputRefs = useRef([]);

    //validation
    const toggleActive = (index) => {
        setIsActive(index);

        setInputValues({
            login: "",
            password: "",
        });
    };

    const getClassName = (index, cls) => {
        return index === isActive ? `${cls} ${classes.active}` : cls;
    };

    const isValid = () => {
        return (
            inputValues.login.trim() !== "" &&
            inputValues.password.trim() !== ""
        );
    };

    const handleInputChange = (event, inputName) => {
        setInputValues({
            ...inputValues,
            [inputName]: event.target.value.trim().split(" ").join(""),
        });
        setHasError({
            ...hasError,
            [inputName]: event.target.value.trim().length === 0,
        });
    };

    //enter
    const handleKeyDown = (event, index) => {
        if (event.key === "Enter") {
            event.preventDefault();
            const nextIndex = index + 1;
            if (inputRefs.current[nextIndex]) {
                inputRefs.current[nextIndex].focus();
            }
        }
    };

    //button
    const handleClick = (path) => {
        setIsActive(path);
    };

    const handleClickButton = (send) => {
        setSend(send);
        console.log(inputValues);
    };

    return (
        <div className={classes.login_back}>
            <div className={classes.head}>
                <h1 className={getClassName(0, classes.login)}>Вход</h1>
                <Link
                    onClick={() => handleClick("/register")}
                    className={getClassName("/register", classes.register)}
                    to="/register"
                >
                    Регистрация
                </Link>
            </div>

            <label htmlFor="login">Логин</label>
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

            <label htmlFor="password">Пароль</label>
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

            <MyButton
                style={{
                    marginTop: "20px ",
                }}
                disabled={!isValid()}
                onClick={() => handleClickButton(inputValues)}
            >
                Войти
            </MyButton>
        </div>
    );
}
export default Login;
