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

export const exampleSales: sales[] = [
    {amount:2,idDate: "2023-12-21T20:45:21.602Z",productId: "b0bbaaa6-cf31-4eb5-8961-81f848153e03"},
    {amount:2,idDate:"2023-12-21T20:45:21.602Z",productId:"c6900ae3-3c7d-4d81-b20f-a2f61d96be18"},
    {amount:1,idDate: "2023-12-21T20:46:21.602Z",productId: "b0bbaaa6-cf31-4eb5-8961-81f848153e03"},
    {amount:3,idDate:"2023-12-21T20:46:21.602Z",productId:"c6900ae3-3c7d-4d81-b20f-a2f61d96be18"},
  ];