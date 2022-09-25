import { Route, Routes } from 'react-router-dom';

import classes from './Converter.module.css';
import CurrencyHistory from '../components/CurrencyHistory';
import CurrencyForm from '../components/CurrencyForm';

type Props = {
    onSubmitData: (toCurrency: string, fromCurrency: string, amount: number) => Promise<void>;
    result: number | undefined;
    currencies: AllCurencies[];
    convert: ConvertCurrencies[];
}

const Converter = (props: Props) => {

    return (    
        <main>
            <h1 className={classes.title}>Konwerter walut</h1>
            <section className={classes.form}>
                <CurrencyForm 
                    onSubmitData={props.onSubmitData} 
                    result={props.result} 
                    currencies={props.currencies}
                />
                <Routes>
                    <Route path="history" element={
                    <CurrencyHistory
                        convert={props.convert}/>}/>
                </Routes>
            </section> 
        </main>
    );
}
export default Converter;