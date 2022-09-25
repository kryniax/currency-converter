import { useState } from 'react';
import classes from './CurrencyHistory.module.css';

type Props = {
    convert: ConvertCurrencies[];
}

const CurrencyHistory = (props: Props) => {

    console.log(props.convert);
    
    return(
        <div>
            <table className={classes.table}>
                <thead>
                    <tr>
                        <th className={classes.tableHead}>Data</th>
                        <th className={classes.tableHead}>Przed konwersją</th>
                        <th className={classes.tableHead}></th>
                        <th className={classes.tableHead}>Po konwersji</th>
                    </tr>
                </thead>
                <tbody>
                {props.convert.map((convert: ConvertCurrencies, index: number) => (
                    <tr key={index}>
                        <th className={classes.tableBody}>{convert.date}</th>
                        <th className={classes.tableBody}>{convert.amount+" "+convert.from}</th>
                        <th className={classes.tableBody}>{">"}</th>
                        <th className={classes.tableHead}>{convert.result.toFixed(2)+" "+convert.to}</th>
                        
                    </tr>
                ))}

            </tbody>
            </table>
        </div>
    )
}

export default CurrencyHistory;
