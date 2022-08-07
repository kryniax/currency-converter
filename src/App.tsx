import { Route, Routes } from 'react-router-dom';
import React, { useState, useEffect, useCallback } from "react";

import './App.css';
import Converter from './pages/Converter';


function App() {

  const [result, setResult] = useState();
  const [currencies, setCurrency] = useState<any[]>([]);
    
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
            setCurrency(loadedCurrency)
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
            setResult(data.result);
            console.log(data);
            
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
                />
          }/>
          </Routes>
        </section>
      </main>
    </div>
  );
}

export default App;
