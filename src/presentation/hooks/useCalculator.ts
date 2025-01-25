/* eslint-disable curly */
import { useEffect, useRef, useState } from 'react';


enum Operator {
    add = '+',
    subtract = '-',
    multiply = 'x',
    divide = '÷',
}

export const useCalculator = () => {

    const [formula, setFormula] = useState('');
    const [number, setNumber] = useState('0');
    const [prevNumber, setPrevNumber] = useState('0');

    const lastOperation = useRef<Operator>();

    useEffect(() => {
        if (lastOperation.current) {
            const firstFormulaPart = formula.split(' ').at(0);
            setFormula(`${firstFormulaPart} ${lastOperation.current} ${number}`);
        } else {
            setFormula(number);
        }
        setFormula(number);
    }, [number]);

    const clean = () => {
        setNumber('0');
        setPrevNumber('0');
        lastOperation.current = undefined;
        setFormula(' ');
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

    const setLastNumber = () => {

        if (number.endsWith('.')) {
            setPrevNumber(number.slice(0, -1));
        } else {
            setPrevNumber(number);
        }

        setNumber('0');
    };

    const divideOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.divide;
    };


    const multiplyOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.multiply;
    };


    const subtractOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.subtract;
    };


    const addOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.add;
    };

    const calculateResult = () => {
        const result = calculaSubResult();
        setFormula(`${result}`);

        lastOperation.current = undefined;

        setPrevNumber('0');
    };

    const calculaSubResult = (): number => {

        const [firstValue, operation, secondValue] = formula.split(' ');

        const num1 = Number(firstValue);
        const num2 = Number(secondValue);

        if (isNaN(num2)) return num1;

        switch (operation) {

            case Operator.add:
                return num1 + num2;

            case Operator.subtract:
                return num1 - num2;


            case Operator.divide:
                return num1 / num2;

            case Operator.multiply:
                return num1 * num2;

            default:
                throw new Error('Operation not implemented');
        }
    };

    return {
        // Properties
        number,
        prevNumber,
        formula,
        // Methods
        buildNumber,
        toggleSign,
        clean,
        deleteOperation,
        divideOperation,
        multiplyOperation,
        subtractOperation,
        addOperation,
        calculateResult,
    };
};
