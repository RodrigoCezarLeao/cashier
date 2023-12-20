export interface sales {
    idDate: string,
    product_id: number;
    amount: number;
    partial_value: string;
}

export const emptySale = {
    idDate: "",
    product_id: 0,
    amount: 0,
    partial_value: ""
};