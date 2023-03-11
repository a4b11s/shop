import React from "react";

import classes from "./Alert.module.css";
import errorIcon from "./icons/error.svg";
import warningIcon from "./icons/warning.svg";
import infoIcon from "./icons/info.svg";
import successIcon from "./icons/success.svg";

const icons = {
  error: errorIcon,
  warning: warningIcon,
  info: infoIcon,
  success: successIcon,
};

interface IProps {
  isOpen: boolean;
  message: string | null;
  type: "error" | "warning" | "info" | "success";
}

const Alert = ({ type, isOpen, message }: IProps) => {
  if (isOpen) {
    return (
      <div className={classes.wrapper + " " + classes[type]}>
        <img className={classes.icon} src={icons[type]} alt="alert" />
        <span>{message ? message : "Error"}!</span>
      </div>
    );
  } else {
    return null;
  }
};

export default Alert;
