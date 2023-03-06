import React, { useState } from "react";

import classes from "./DropDown.module.css";

interface IProps {
  options: Array<string>;
  disabled?: boolean;
  onSelected?: Function;
  defaultValue?: string;
}

const calcWidth = (array: Array<string>): number => {
  const wordLength = Math.max(...array.map((el) => el.length)); // calc length of the largest word in the array

  return wordLength * 10;
};

const DropDown = (props: IProps) => {
  const {
    disabled = false,
    options,
    defaultValue = options[0],
    onSelected,
  } = props;

  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [isSelecting, setIsSelecting] = useState(false);

  const dropDownWidth = calcWidth([...options, defaultValue]); //width DropDown, based on the largest option

  const handleClickOnItem = (value: string) => {
    setSelectedValue(value);
    setIsSelecting(!isSelecting);

    if (onSelected) {
      onSelected(value);
    }
  };

  const handleClickOnDropDownBtn = () => setIsSelecting(!isSelecting);

  return (
    <div
      className={[classes.dropDown, isSelecting && classes.dropDownActive].join(
        " "
      )}
    >
      <button
        disabled={disabled}
        onClick={handleClickOnDropDownBtn}
        style={{ width: dropDownWidth }}
        className={classes.button}
      >
        {selectedValue}
      </button>
      <ul className={classes.optionsList}>
        {options.map((option, index) => {
          return (
            <li
              style={{ width: dropDownWidth }}
              className={[
                classes.optionsListItem,
                option === selectedValue && classes.optionsListItemActive,
              ].join(" ")}
              key={option + index.toString()}
              onClick={() => handleClickOnItem(option)}
            >
              {option}
            </li>
          );
        })}
      </ul>

      <input
        readOnly
        className={classes.input}
        type="text"
        value={selectedValue}
      />
    </div>
  );
};

export default DropDown;
