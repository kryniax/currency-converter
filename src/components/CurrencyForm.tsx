import { useState, useCallback, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

import classes from './CurrencyForm.module.css';

const CurrencyForm = (props: any) => {

    const fromCurrencyRef: any = useRef();
    const toCurrencyRef: any = useRef();
    const amountRef: any = useRef();

    const formHandler = (event: any) => {
        event.preventDefault();

        const enteredFromCurrency = fromCurrencyRef.current.value;
        const enteredToCurrency = toCurrencyRef.current.value;
        const enteredAmount = amountRef.current.value;
        props.onSubmitData(enteredToCurrency, enteredFromCurrency, enteredAmount);
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
                            <option value={currency.symbols} key={currency.symbols}>{currency.symbols}</option>
                            ))}
                            </select>
                    </div>
                    <div className={classes.inputGroup}>
                        <label htmlFor="toCurrency">Przelicz na:</label>
                            <select id="secondCurrency" ref={toCurrencyRef}>
                            {props.currencies.map((currency: any) => (
                            <option value={currency.symbols} key={currency.symbols}>{currency.symbols}</option>
                            ))}
                            </select>
                    </div>
                    <div className={classes.inputGroup}>
                        <label>Kwota</label>
                            <input type="text" placeholder="Wpisz kwotę" ref={amountRef} ></input>
                    </div>
                    <div className={classes.inputGroup}>
                        <label>Wynik</label>
                            <input type="text" placeholder="Wynik" value={props.result}></input>
                    </div>
                </div>
                <div className={classes.rowReverse}>
                    <input type="submit" value="Konwertuj"></input>
                    <button className={classes.historyButton}><Link to="/converter/history">Historia</Link></button>
                </div>
            </div>
        </form>
        </section>
    )
}

export default CurrencyForm;