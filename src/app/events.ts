// Occurs when a sale is inserted from cashier
export const ADD_SALE_EVENT = "ADD_SALE_EVENT";

// Occurs when language is changed
export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE";


export interface HubEvent {
    eventId: string;
    function: Function;
    args?: any;
};