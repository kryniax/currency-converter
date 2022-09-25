export {};

declare global {

    type AllCurencies = {
        name: object;
        symbols: string;
      }
    
    type ConvertCurrencies = {
        amount: number;
        date: string;
        from: string;
        result: number;
        success: boolean;
        to: string;
    }
}