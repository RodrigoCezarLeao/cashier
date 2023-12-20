import { Component } from '@angular/core';
import { getProducts } from 'src/app/helpers/products';
import { addAndSaveSales } from 'src/app/helpers/sale';
import { product } from 'src/app/interfaces/product';
import { emptySale, sales } from 'src/app/interfaces/sales';

@Component({
  selector: 'app-sales-manager',
  templateUrl: './sales-manager.component.html',
  styleUrls: ['./sales-manager.component.css']
})
export class SalesManagerComponent {
  products: product[] = [];
  cashierProducts: sales[] = [];
  totalCashier = "0.00";
  
  constructor(){
    this.products = getProducts();
  }

  includeProduct(){
    const sale = {...emptySale};
    this.cashierProducts.push(sale);
    this.products = getProducts();
  }

  recalculateTotalCashier(){
    const result = [];
    let totalCashierValue = 0;

    for(let item of this.cashierProducts){
      const product = this.products.find(x => x.id === Number(item.product_id)) ?? {price: 0};
      totalCashierValue += (item.amount * product.price);
      item.partial_value = (item.amount * product.price).toFixed(2);
      result.push(item);
    }

    this.cashierProducts = result;
    this.totalCashier = totalCashierValue.toFixed(2);
  }

  saveSale(){
    this.aggroupSameProducts();

    addAndSaveSales(this.cashierProducts);

    alert("Venda registrada com sucesso!");
    location.reload();
  }

  aggroupSameProducts(){
    const result: sales[] = []
    const idxDate = new Date().toISOString();

    for (let idx of Array.from(new Set(this.cashierProducts.map(x => x.product_id)))){
      const productsInCashier = this.cashierProducts.filter(x => x.product_id === idx && x.amount > 0);
      if (productsInCashier.length === 0)
        continue;

      const totalProdAmount = productsInCashier.map(x => x.amount).reduce((a,b) => a+b);

      result.push({
        idDate: idxDate,
        product_id: idx,
        amount: totalProdAmount,
        partial_value: (totalProdAmount * (this.products.find(x => x.id === Number(idx))?.price ?? 0)).toFixed(2),
      });

    }

    this.cashierProducts = result;
  }
}
