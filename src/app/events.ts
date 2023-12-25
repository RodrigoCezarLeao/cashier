// Occurs when a sale is inserted from cashier
export const ADD_SALE_EVENT = "ADD_SALE_EVENT";

// Change page language
export const CHANGE_LANGUAGE = "CHANGE_LANGUAGE";


export interface HubEvent {
    eventId: string;
    function: Function;
    args?: any;
};