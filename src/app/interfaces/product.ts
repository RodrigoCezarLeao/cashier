import { generateUUID } from "../helpers/general";

export interface product {
    id: string;
    name: string;
    price: number;
}

export const emptyProduct = {
    id: '',
    name: "",
    price: 0,
}

export const createEmptyProduct = () => {
    return {
        id: generateUUID(),
        name: '',
        price: 0
    };
}

export const exampleProducts : product[] = [
    {id: 'c6900ae3-3c7d-4d81-b20f-a2f61d96be18', name: 'Refrigerante', price: 5},
    {id: 'b0bbaaa6-cf31-4eb5-8961-81f848153e03', name: 'Bolo', price: 5},
    {id: 'de0db8d2-7e20-4735-aa5e-7640edc0fe3a', name: 'Salgado', price: 7},
    {id: '513cc2ab-e1ad-4bd3-9373-1a43769c86a5', name: 'Água', price: 2},
    {id: '5d4c22aa-ff83-4173-9768-06612be28a70', name: 'Pipoca', price: 3},
];