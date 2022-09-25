import { Navigate, Route, Routes } from 'react-router-dom';
import { useState, useEffect, useCallback } from "react";

import './App.css';
import Converter from './pages/Converter';

type CurrencyData = {
  success: boolean;
  symbols: object;
}

type Query = {
  from: string;
  to: string;
  amount: number;
}

type ExchangeData = {
  date: string;
  info: object;
  query: Query;
  result: number;
  success: boolean;
}

const INITIAL_CURRENCIES: ConvertCurrencies[] = [];

function App() {

  const [result, setResult] = useState<number>();
  const [currencies, setCurrency] = useState<AllCurencies[]>([]);
  const [items, setItems] = useState(INITIAL_CURRENCIES);
  const apiKey: string = (process.env.REACT_APP_EXCHANGE as string);

  const addCurrencyHandler = (loadedConvert: ConvertCurrencies) => {
      setItems((prevCurrencies: ConvertCurrencies[]) => {
        return [loadedConvert, ...prevCurrencies];
      })
  }

  const fetchCurrencyHandler = useCallback(async () => {

      const myHeaders: Headers = new Headers();
      myHeaders.append("apikey", apiKey);

      const requestOption: RequestInit = {
          method: "GET",
          redirect: "follow",
          headers: myHeaders
      }

      const url: string = "https://api.apilayer.com/exchangerates_data/symbols";

      try{
          const response: Response = await fetch(url, requestOption);
          if(!response.ok) {
              throw new Error('error');
          }
          const data: CurrencyData = await response.json();
          const loadedCurrency: AllCurencies[] = [];

          for(const key in data.symbols){
              loadedCurrency.push({
                  symbols: key,
                  name: data.symbols,
              });
          }
          setCurrency(loadedCurrency);
          
      } catch(error: any) {
          alert(error.message);
      }
  }, []);

  useEffect(() => {
  fetchCurrencyHandler();
  }, [fetchCurrencyHandler]);

  const fetchExchangeHandler = useCallback(async (toCurrency: string, fromCurrency: string, amount: number) => {
      
      const myHeaders: Headers = new Headers();
      myHeaders.append("apikey", apiKey);

      const requestOption: RequestInit  = {
          method: 'GET',
          redirect: 'follow',
          headers: myHeaders
      }
      const fromCurrencyValue: string = encodeURIComponent(fromCurrency);
      const toCurrencyValue: string = encodeURIComponent(toCurrency);
      const amountValue: string = encodeURIComponent(amount);
      const url: string = `https://api.apilayer.com/exchangerates_data/convert?to=${toCurrencyValue}&from=${fromCurrencyValue}&amount=${amountValue}`;

      try{
          const response: Response = await fetch(url, requestOption);
          if(!response.ok) {
              throw new Error('error');
          }
          const data: ExchangeData = await response.json();

          const loadedConvert: ConvertCurrencies = {         
              date: data.date,
              result: data.result,
              from: data.query.from,
              to: data.query.to,
              amount: data.query.amount,
              success: data.success
          }; 
          setResult(data.result);
          addCurrencyHandler(loadedConvert);
          
      } catch(error: any) {
          alert(error.message);
      }
  }, []);

  return (
    <div className='currencyPage'>
    
      <main>
        <section className='converter'>
          <Routes>
          <Route path="/converter/*" element={
              <Converter 
                onSubmitData={fetchExchangeHandler} 
                result={result} 
                currencies={currencies}
                convert={items}
                />
          }/>
          <Route path="*" element={<Navigate replace to="/converter/"/>}/>
          </Routes>
        </section>
      </main>
    </div>
  );
}

export default App;
