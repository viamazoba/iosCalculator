/* eslint-disable curly */
import { useState } from 'react';


export const useCalculator = () => {

    const [number, setNumber] = useState('0');

    const clean = () => {
        setNumber('0');
    };

    const deleteOperation = () => {

        if (number === '0') return;

        if ((number.startsWith('-') && number.length === 2) || number.length === 1) {
            setNumber('0');
        } else {
            setNumber(number.substring(0, number.length - 1));
        }
    };

    const toggleSign = () => {
        if (number.includes('-')) {
            return setNumber(number.replace('-', ''));
        }

        setNumber('-' + number);
    };

    const buildNumber = (numberString: string) => {

        if (number.includes('.') && numberString === '.') return;

        if (number.startsWith('0') || number.startsWith('-0')) {
            if (numberString === '.') {
                return setNumber(number + numberString);
            }

            if (numberString === '0' && !number.includes('.')) {
                return;
            }

            if (numberString !== '0' && !number.includes('.') && number === '0') {
                return setNumber(numberString);
            }

            return setNumber(number + numberString);
        }

        if (numberString !== '0') {
            if (numberString === '.' && !number.includes('.')) {
                return setNumber(number + numberString);
            }
        }

        if (number === '0' && numberString !== '.') return;

        setNumber(number + numberString);
    };

    return {
        // Properties
        number,
        // Methods
        buildNumber,
        toggleSign,
        clean,
        deleteOperation,
    };
};
