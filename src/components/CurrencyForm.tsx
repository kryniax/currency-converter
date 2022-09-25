import { useState, useRef } from "react";
import { Link } from "react-router-dom";

import classes from './CurrencyForm.module.css';

const CurrencyForm = (props: any) => {

    const [isValid, setIsValid] = useState(true);
    const [button, setToggleButton] = useState(false);

    const fromCurrencyRef: any = useRef();
    const toCurrencyRef: any = useRef();
    const amountRef: any = useRef();

    const buttonHandler = () => {
        setToggleButton(!button);
    }

    const formHandler = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();
        const enteredFromCurrency: string = fromCurrencyRef.current.value;
        const enteredToCurrency: string = toCurrencyRef.current.value;
        const enteredAmount: string = amountRef.current.value;
        const regex = /^[0-9\b]+$/;

        if(enteredAmount.trim() === '' || !regex.test(enteredAmount)){
            setIsValid(false);
        }else{
            setIsValid(true);
            props.onSubmitData(enteredToCurrency, enteredFromCurrency, enteredAmount);
        }
    }

    return(
        <section>
        <form onSubmit={formHandler}>
            <div className={classes.formBody}>
                <div className={classes.row}>
                    <div className={classes.inputGroup}>
                        <label htmlFor="fromCurrency">Przelicz z:</label>
                            <select id="firstCurrency" ref={fromCurrencyRef}>
                                {props.currencies.map((currency: any) => (
                                    <option 
                                        value={currency.symbols} 
                                        key={currency.symbols}>
                                            {currency.symbols}
                                    </option>
                                ))}
                            </select>
                    </div>
                    <div className={classes.inputGroup}>
                        <label htmlFor="toCurrency">Przelicz na:</label>
                            <select id="secondCurrency" ref={toCurrencyRef}>
                                {props.currencies.map((currency: any) => (
                                    <option 
                                        value={currency.symbols} 
                                        key={currency.symbols}>
                                            {currency.symbols}
                                    </option>
                                ))}
                            </select>
                    </div>
                    <div className={classes.inputGroup}>
                        <label>Kwota</label>
                        <input 
                            className={isValid ? '' : classes.errorInput}
                            type="text" 
                            placeholder="Wpisz kwotę" 
                            ref={amountRef} 
                        />
                        <p className={classes.errorP}>{isValid ? '' : 'Nieprawidłowa wartość'}</p>
                    </div>
                    <div className={classes.inputGroup}>
                        <label>Wynik</label>
                        <input 
                            type="text" 
                            placeholder="Wynik" 
                            value={props.result} 
                        />
                    </div>
                </div>
                <div className={classes.rowReverse}>
                    <input 
                        type="submit" 
                        value="Konwertuj"
                    />
                    <button 
                        className={classes.historyButton}
                        onClick={buttonHandler}>
                            {button ? <Link to="/converter/history">Historia</Link> : <Link to="/converter/">Ukyj historie</Link>}
                            
                    </button>
                </div>
            </div>
        </form>
        </section>
    )
}

export default CurrencyForm;