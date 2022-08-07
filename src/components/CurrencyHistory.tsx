import { useState } from 'react';
import classes from './CurrencyHistory.module.css';

const CurrencyHistory = (props: any) => {

    console.log(props.convert);
    
    return(
        <section>
            <table className={classes.table}>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Przed konwersją</th>
                        <th></th>
                        <th>Po konwersji</th>
                    </tr>
                </thead>
                <tbody>
                {props.convert.map((convert: any, index: any) => (
                    <tr>
                        <th>{convert.date}</th>
                        <th>{convert.amount+" "+convert.from}</th>
                        <th>{"--"}</th>
                        <th>{convert.result+" "+convert.to}</th>
                        
                    </tr>
                ))}

            </tbody>
            </table>
        </section>
    )
}

export default CurrencyHistory;
