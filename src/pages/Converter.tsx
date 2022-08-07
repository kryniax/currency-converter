import { Link, Route, Routes } from 'react-router-dom';

import classes from './Converter.module.css';
import CurrencyHistory from './CurrencyHistory';
import CurrencyForm from '../components/CurrencyForm';

const Converter = (props: any) => {

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
                    <Route path="history" element={<CurrencyHistory/>}/>
                </Routes>
            </section> 
        </main>
    );
}
export default Converter;