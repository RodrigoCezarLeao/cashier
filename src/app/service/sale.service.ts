import { Injectable } from '@angular/core';
import { getCachedSales, saveCacheSales } from '../helpers/sale';
import { sales } from '../interfaces/sales';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  constructor() { }

  getSales() {
    const sales = getCachedSales();
    return sales;
  }

  addSales(sale: sales[]) {
    let sales = this.getSales();
    sales = sales.concat(sale);
    saveCacheSales(sales);
  }

  editSales(sales: sales[]){
    saveCacheSales(sales);
  }

  deleteSales(sales: sales[]){
    let allSales = this.getSales();
    allSales = allSales.filter((x: sales) => x.idDate !== sales?.[0]?.idDate);
    this.editSales(allSales);
  }
}
