import { sales } from "../interfaces/sales"


const sortSalesByIdDate = (sales: sales[]) => {
    return sales.sort((a, b) => a.idDate > b.idDate ? -1 : 1);
}

export const getSales = () => {
    const values = JSON.parse(window.localStorage.getItem('sales') ?? "[]");    
    return sortSalesByIdDate(values);
}

export const getGroupedSalesIds = () => {
    const sales = getSales();    
    return Array.from(new Set(sales.map((x: sales) => x.idDate)));
}

export const addAndSaveSales = (sales: sales[]) =>{
    const values = getSales();

    if(values.length > 0){
        window.localStorage.setItem('sales', JSON.stringify([...values, ...sales]));
    }else if (values.length === 0)
    {
        window.localStorage.setItem('sales', JSON.stringify(sales));
    }
}

export const saveSales = (sales: sales[]) => {
    window.localStorage.setItem('sales', JSON.stringify(sales));
}

export const deleteAndSaveSales = (sales: sales[]) => {
    const values = getSales();
    const aux = values.filter(x => x.idDate !== sales?.[0].idDate);

    return saveSales(aux);
}

