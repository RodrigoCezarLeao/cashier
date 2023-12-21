import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { product } from '../interfaces/product';
import { sales } from '../interfaces/sales';

@Injectable({
  providedIn: 'root'
})
export class HubService {
  // products_list: product[] = [];
  products_list: product[] = [
    {id: 'c6900ae3-3c7d-4d81-b20f-a2f61d96be18', name: 'Refrigerante', price: 5},
    {id: 'b0bbaaa6-cf31-4eb5-8961-81f848153e03', name: 'Bolo', price: 5},
    {id: 'de0db8d2-7e20-4735-aa5e-7640edc0fe3a', name: 'Salgado', price: 7},
    {id: '513cc2ab-e1ad-4bd3-9373-1a43769c86a5', name: 'Água', price: 2},
    {id: '5d4c22aa-ff83-4173-9768-06612be28a70', name: 'Pipoca', price: 3},
  ];

  // sales_list: sales[] = [];
  sales_list: sales[] = [
    {amount:2,idDate: "2023-12-21T20:45:21.602Z",productId: "b0bbaaa6-cf31-4eb5-8961-81f848153e03"},
    {amount:2,idDate:"2023-12-21T20:45:21.602Z",productId:"c6900ae3-3c7d-4d81-b20f-a2f61d96be18"},
    {amount:1,idDate: "2023-12-21T20:46:21.602Z",productId: "b0bbaaa6-cf31-4eb5-8961-81f848153e03"},
    {amount:3,idDate:"2023-12-21T20:46:21.602Z",productId:"c6900ae3-3c7d-4d81-b20f-a2f61d96be18"},
  ];
  
  constructor() { }

  getProducts(){
    const products = of(this.products_list);
    return products;
  }

  addProduct(product: product){
    this.products_list.push(product);
  }

  editProducts(products: product[]){
    this.products_list = products;
  }

  getSales() {
    const sales = of(this.sales_list);
    return sales;
  }

  addSale(sale: sales) {
    this.sales_list.push(sale);
  }

  addSales(sale: sales[]) {
    this.sales_list = this.sales_list.concat(sale);
  }

  editSales(sales: sales[]){
    this.sales_list = sales;
  }
}
