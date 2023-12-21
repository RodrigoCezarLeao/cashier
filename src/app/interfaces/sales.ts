import { emptyProduct, product } from "./product";

export interface sales {
    idDate: string,
    productId: string;
    amount: number;
}

export const emptySale = {
    idDate: "",
    productId: "",
    amount: 0,    
};

export const createEmptySale = () => {
    return {
        idDate: new Date().toISOString(),
        productId: "",
        amount: 0,
    };
}