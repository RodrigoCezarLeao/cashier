import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { product } from '../interfaces/product';
import { sales } from '../interfaces/sales';
import { getCachedProducts, saveCacheProducts } from '../helpers/products';
import { getCachedSales, saveCacheSales } from '../helpers/sale';
import { HubEvent } from '../events';

@Injectable({
  providedIn: 'root'
})
export class HubService {
  events: HubEvent[] = [];
  
  constructor() {
  }

  subscribe(event: string, f: Function){
      let ev: HubEvent = {eventId: event, function: f};
      this.events.push(ev);    
  }

  notify(event: string){
    let eventsSubscribed = this.events.filter(x => x.eventId === event);    
    for(let ev of eventsSubscribed){
      ev.function();
    }
  }

  notifyArgs(event: string, args: any){
    let eventsSubscribed = this.events.filter(x => x.eventId === event);    
    for(let ev of eventsSubscribed){
      ev.function(args);
    }
  }

}
