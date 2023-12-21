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