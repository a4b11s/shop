import React from "react";

import classes from "./Button.module.css";

interface IProps {
  children: JSX.Element | string;
  onClick: Function;
  disabled?: boolean;
}
const Button = ({ disabled, onClick, children }: IProps) => {
  return (
    <button
      disabled={disabled}
      onClick={(e) => {
        onClick(e);
      }}
      className={classes.button}
    >
      {children}
    </button>
  );
};

export default Button;
