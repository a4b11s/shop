import React, {ChangeEvent, useEffect, useState} from 'react';

import classes from './DoubleRange.module.scss';

export interface onChangeData {
    currentMin: number;
    currentMax: number;
}

interface IProps {
    min?: number;
    max?: number;
    valueMin?: number;
    valueMax?: number;
    valueGap?: number;
    defaultMin?: number;
    defaultMax?: number;
    onChange?: (data: onChangeData) => void

}

const DoubleRange = (props: IProps) => {
    const {
        min = 0,
        max = 100,
        valueGap = 1,
        valueMin,
        valueMax,
        defaultMin = min,
        defaultMax = max,
        onChange = () => {
        }
    } = props

    const [currentMin, setCurrentMin] = useState(defaultMin)
    const [currentMax, setCurrentMax] = useState(defaultMax)

    useEffect(() => {
        if (valueMin) setCurrentMin(valueMin);
        if (valueMax) setCurrentMax(valueMax);
    }, [valueMin, valueMax])

    useEffect(() => {
        onChange({currentMin, currentMax})
    }, [currentMin, currentMax, onChange])

    const onMinChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (parseInt(event.target.value) + valueGap <= currentMax) {
            setCurrentMin(parseInt(event.target.value))
        }
    }

    const onMaxChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (parseInt(event.target.value) - valueGap >= currentMin) {
            setCurrentMax(parseInt(event.target.value))
        }
    }

    const getProgressStyles = () => {
        const leftPercent = currentMin / max * 100
        const rightPercent = 100 - currentMax / max * 100
        return {left: leftPercent + '%', right: rightPercent + '%'}
    }

    return (
        <div className={classes.wrapper}>
            <input onChange={onMinChange} value={currentMin} min={min} max={max} className={classes.minInput}
                   type="range"/>
            <input onChange={onMaxChange} value={currentMax} min={min} max={max} className={classes.maxInput}
                   type="range"/>
            <div style={getProgressStyles()} className={classes.progress}/>
        </div>
    );
};

export default DoubleRange;