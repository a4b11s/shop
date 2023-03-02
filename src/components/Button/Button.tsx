import React from "react";
import classes from "./Button.module.css";

interface IProps {
  children: JSX.Element | string;
  onClick: Function;
}
const Button = (props: IProps) => {
  return (
    <button
      onClick={(e) => {
        props.onClick(e);
      }}
      className={classes.button}
    >
      {props.children}
    </button>
  );
};

export default Button;
