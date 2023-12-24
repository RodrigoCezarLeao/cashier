import { sales } from "../interfaces/sales"

const CACHE_KEY = "sales-cashier";

export const getCachedSales = (): sales[] => {
    return JSON.parse(localStorage.getItem(CACHE_KEY) ?? "[]");
}


export const saveCacheSales = (sales: sales[]) => {
    try{
        localStorage.setItem(CACHE_KEY, JSON.stringify(sales));
        return true;
    }
    catch(e){
        console.log(e);
        return false;
    }
}