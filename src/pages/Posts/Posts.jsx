import React from "react";
import classes from "./Posts.module.css";

const Posts = ({ title, description }) => {
    return (
        <div className={classes.post}>
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
};

export default Posts;
