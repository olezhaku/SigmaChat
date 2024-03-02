import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import classes from "./MyNavbar.module.css";

const Navbar = () => {
    //hooks
    const location = useLocation();
    const [isActive, setIsActive] = useState(location.pathname);
    useEffect(() => {
        setIsActive(location.pathname);
    }, [location]);

    //handle
    const handleClick = (path) => {
        setIsActive(path);
    };

    //active
    const getClassName = (path, cls) => {
        return isActive === path ? `${cls} ${classes.active}` : cls;
    };

    return (
        <div className={classes.navbar}>
            <Link
                onClick={() => handleClick("/messager")}
                className={getClassName("/messager", classes.messager)}
                to="/messager"
            >
                Чат
            </Link>
            <Link
                onClick={() => handleClick("/posts")}
                className={getClassName("/posts", classes.posts)}
                to="/posts"
            >
                Посты
            </Link>
            <Link
                onClick={() => handleClick("/feedback")}
                className={getClassName("/feedback", classes.feedback)}
                to="/feedback"
            >
                Отзыв
            </Link>
        </div>
    );
};

export default Navbar;
