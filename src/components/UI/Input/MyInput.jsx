import React from "react";
import classes from "./MyInput.module.css";

const MyInput = React.forwardRef((props, ref) => {
    return (
        <div className={classes.section_input}>
            <input ref={ref} className={classes.inpt} type="text" {...props} />
        </div>
    );
});

export default MyInput;
