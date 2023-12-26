import { product } from "../interfaces/product";

const CACHE_KEY = "products-cashier";

export const getProductName = (prodId: string, products: product[]) => {
    return products.find(x => x.id === prodId)?.name;
}

export const getProductPrice = (prodId: string, products: product[]) => {
    return products.find(x => x.id === prodId)?.price;
}


export const getCachedProducts = () => {
    return JSON.parse(localStorage.getItem(CACHE_KEY) ?? "[]");
}

export const saveCacheProducts = (products: product[]) => {
    try{
        localStorage.setItem(CACHE_KEY, JSON.stringify(products));
        return true;
    }
    catch(e){
        console.log(e);
        return false;
    }
}