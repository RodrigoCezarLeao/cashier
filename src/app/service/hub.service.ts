import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { product } from '../interfaces/product';
import { sales } from '../interfaces/sales';
import { getCachedProducts, saveCacheProducts } from '../helpers/products';
import { getCachedSales, saveCacheSales } from '../helpers/sale';

@Injectable({
  providedIn: 'root'
})
export class HubService {
  products_list: product[] = [];
  sales_list: sales[] = [];

  sales_events: any[] = [];
  
  constructor() { 
    this.products_list = getCachedProducts();
    this.sales_list = getCachedSales();
  }

  subscribe(event: string, f: Function){
    if (event === "sales_event"){
      this.sales_events.push(f);
    }
  }

  notify(event: string){
    if (event === "sales_event"){
      for(let f of this.sales_events){
        f();
      }
    }
  }
  notifyArgs(event: string, args: any){
    if (event === "sales_event"){
      for(let f of this.sales_events){
        f(args);
      }
    }
  }

  getProducts(){
    const products = of(this.products_list);
    return products;
  }

  addProduct(product: product){
    this.products_list.push(product);
    saveCacheProducts(this.products_list);
  }

  editProducts(products: product[]){
    this.products_list = products;
    saveCacheProducts(this.products_list);
  }

  deleteProduct(product: product){
    this.products_list = this.products_list.filter(x => x.id !== product.id);
    saveCacheProducts(this.products_list);
  }

  getSales() {
    const sales = of(this.sales_list);
    return sales;
  }

  addSale(sale: sales) {
    this.sales_list.push(sale);
    saveCacheSales(this.sales_list);
  }

  addSales(sale: sales[]) {
    this.sales_list = this.sales_list.concat(sale);
    saveCacheSales(this.sales_list);
  }

  editSales(sales: sales[]){
    this.sales_list = sales;
    saveCacheSales(this.sales_list);
  }

  deleteSales(sales: sales[]){
    this.sales_list = this.sales_list.filter(x => x.idDate !== sales?.[0]?.idDate);
    this.editSales(this.sales_list);
  }
}
