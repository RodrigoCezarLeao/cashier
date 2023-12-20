import { product } from "../interfaces/product";


const sortProductsByName = (products: product[]) => {
    return products.sort((a, b) => a.name > b.name ? 1 : -1);
}

export const getProducts = () => {
    const values = JSON.parse(window.localStorage.getItem('products') ?? "[]");
    return sortProductsByName(values);
}

export const getHighestIndex = () => {
    const products = getProducts();    
    const maxIndex = Math.max(...products.map((x: product) => x.id));
    return maxIndex !== -Infinity ? maxIndex : 0;
}

export const addAndSaveProduct = (product: product) => {
    const products = getProducts();
    products.push(product);

    return window.localStorage.setItem('products', JSON.stringify(products));
}

export const saveProducts = (products: product[]) => {
    return window.localStorage.setItem('products', JSON.stringify(products));
}

export const deleteAndSaveProduct = (id: number) => {
    const products = getProducts();
    const result = products.filter((x: product) => x.id !== id);

    return saveProducts(result);
}