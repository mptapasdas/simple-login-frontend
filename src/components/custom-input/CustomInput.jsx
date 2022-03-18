import React from "react";
import TextField from "@mui/material/TextField";

const CustomInput = (props) => {
    const { value, hasError, label, type, errorText, onChangeHandler } = props;
    return (
        <TextField
            sx={{ input: { color: "black" } }}
            InputLabelProps={{
                style: {
                    fontSize: "0.8rem",
                },
            }}
            className='mt-3 col-12'
            type={type || "text"}
            value={value}
            error={hasError}
            label={label ? label : "label"}
            helperText={errorText}
            onChange={onChangeHandler}
            variant='standard'
        />
    );
};

export default CustomInput;
