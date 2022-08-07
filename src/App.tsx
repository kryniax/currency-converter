import { Route, Routes } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from "react";

import './App.css';
import Converter from './pages/Converter';

const INITIAL_CURRENCIES: any = [];

function App() {

  const [result, setResult] = useState();
  const [convert, setConvert] = useState();
  const [currencies, setCurrency] = useState<any[]>([]);
  const [items, setItems] = useState(INITIAL_CURRENCIES);

    const addCurrencyHandler = (loadedConvert: any) => {
        setItems((prevCurrencies: any) => {
          return [loadedConvert, ...prevCurrencies];
        })
    }
    console.log(items);
    const fetchCurrencyHandler = useCallback(async () => {

        const myHeaders = new Headers();
        myHeaders.append("apikey", "ACYoBZBGakoe5iXrsfRXgkyuMYkvyhFd");
    
        const requestOption: {} = {
            method: "GET",
            redirect: "follow",
            headers: myHeaders
        }

        try{
            const response = await fetch("https://api.apilayer.com/exchangerates_data/symbols", requestOption);
            if(!response.ok) {
                throw new Error('error');
            }
            const data = await response.json();
            const loadedCurrency: any = [];

            for(const key in data.symbols){
                loadedCurrency.push({
                    symbols: key,
                    name: data.symbols[key],
                });
            }
            setCurrency(loadedCurrency);
            console.log(loadedCurrency);
            
        } catch(error: any) {

        }
    }, []);

    useEffect(() => {
    fetchCurrencyHandler();
    }, [fetchCurrencyHandler]);

    const fetchExchangeHandler = useCallback(async (toCurrency: any, fromCurrency: any, amount: any) => {
        
        const myHeaders = new Headers();
        myHeaders.append("apikey", "ACYoBZBGakoe5iXrsfRXgkyuMYkvyhFd");

        const requestOption: {} = {
            method: 'GET',
            redirect: 'follow',
            headers: myHeaders
        }

        try{
            const response = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`, requestOption);
            if(!response.ok) {
                throw new Error('error');
            }
            const data = await response.json();

            const loadedConvert: any = {
          
                date: data.date,
                result: data.result,
                from: data.query.from,
                to: data.query.to,
                amount: data.query.amount,
            };
                      
            setResult(data.result);
            //setConvert(loadedConvert);
            addCurrencyHandler(loadedConvert);
            
        } catch(error: any) {
            
        }
    }, []);

  return (
    <div className='currencyPage'>
    
      <main>
        <section className='converter'>
          <Routes>
          <Route index element={<Converter />} />
          <Route path="/converter/*" element={
              <Converter 
                onSubmitData={fetchExchangeHandler} 
                result={result} 
                currencies={currencies}
                convert={items}
                />
          }/>
          </Routes>
        </section>
      </main>
    </div>
  );
}

export default App;
