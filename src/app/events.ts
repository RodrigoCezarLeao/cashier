// Occurs when a sale is inserted from cashier
export const ADD_SALE_EVENT = "ADD_SALE_EVENT";


export interface HubEvent {
    eventId: string;
    function: Function;
    args?: any;
};