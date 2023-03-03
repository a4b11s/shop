import React from "react";

import classes from "./Alert.module.css";
import alertIcon from "./alert.svg";

interface IProps {
  isOpen: boolean;
  message: string | null;
}

const Alert = (props: IProps) => {
  const { isOpen, message } = props;
  if (isOpen) {
    return (
      <div className={classes.wrapper}>
        <img className={classes.icon} src={alertIcon} alt="alert" />
        <span>{message ? message : "Error"}!</span>
      </div>
    );
  } else {
    return null;
  }
};

export default Alert;
