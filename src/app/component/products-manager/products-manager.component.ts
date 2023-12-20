import { Component } from '@angular/core';
import { addAndSaveProduct, deleteAndSaveProduct, getHighestIndex, getProducts, saveProducts } from 'src/app/helpers/products';
import { emptyProduct, product } from 'src/app/interfaces/product';


@Component({
  selector: 'app-products-manager',
  templateUrl: './products-manager.component.html',
  styleUrls: ['./products-manager.component.css']
})
export class ProductsManagerComponent {
  products: product[] = [];

  constructor() {
    this.products = getProducts();
  }

  addNewProduct(){
    const newProduct = {...emptyProduct};

    const cachedHighestIdx = getHighestIndex();
    const memoryHighestIdx = Math.max(...this.products.map(x => x.id));
    newProduct.id =  memoryHighestIdx > cachedHighestIdx ? memoryHighestIdx + 1 : cachedHighestIdx + 1;
    this.products.push(newProduct);
  }

  saveProduct(prod: product){
    if (!prod.name || !prod.price)
      return;
    
    const values = getProducts();
    if (!values.find(x => x.name === prod.name && x.price === prod.price))
    {
      if (values.find(x => x.id === prod.id)){
        deleteAndSaveProduct(values.find(x => x.id === prod.id)?.id ?? 0);
        addAndSaveProduct(prod);
      }        
      else
        addAndSaveProduct(prod);

    }
  }
  
  formatCurrencyValue(prod: product){
    prod.price = Math.trunc(prod.price*Math.pow(10, 2))/Math.pow(10, 2);
  }

  saveProductAndFormat(prod: product){
      this.saveProduct(prod);
      this.formatCurrencyValue(prod);
  }



  deleteProduct(id: number){
    deleteAndSaveProduct(id);
    location.reload();
  }

  formatMoney(price: number){
    return price.toFixed(2);
  }
}
