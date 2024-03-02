import React from "react";
import classes from "./MyModal.module.css";

const MyModal = ({ ...props }) => {
    return (
        <div className={classes.modal} {...props}>
            <div className={classes.modal_content}>{props.children}</div>
        </div>
    );
};

export default MyModal;
