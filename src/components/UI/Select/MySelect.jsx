import React, { useState } from "react";
import classes from "./MySelect.module.css";

const MySelect = ({ defaultOption, options, onChange }) => {
    const [selectedOption, setSelectedOption] = useState(defaultOption);
    const [isActive, setIsActive] = useState(false);
    const [isCustomOption, setIsCustomOption] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        onChange(option);
        setIsActive(false);
        setIsCustomOption(true);
    };

    return (
        <div>
            <div
                className={`${classes.select} ${
                    isActive ? classes.active : ""
                } ${isCustomOption ? classes.selected : ""}`}
                onClick={handleClick}
            >
                <div className={classes.option_default}>{selectedOption}</div>
                {isActive && (
                    <div>
                        {options.map((option, index) => (
                            <div
                                key={index}
                                className={`${classes.option} ${
                                    isActive ? classes.active : ""
                                }`}
                                onClick={() => handleOptionClick(option)}
                            >
                                <p>{option}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MySelect;
