import { product } from "../interfaces/product";


export const getProductName = (prodId: string, products: product[]) => {
    return products.find(x => x.id === prodId)?.name;
}

export const getProductPrice = (prodId: string, products: product[]) => {
    return products.find(x => x.id === prodId)?.price;
}
