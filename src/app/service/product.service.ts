import { Injectable } from '@angular/core';
import { product } from '../interfaces/product';
import { getCachedProducts, saveCacheProducts } from '../helpers/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor() { }

  getProducts(){
    let products = getCachedProducts();
    return products;
  }

  addProduct(product: product){
    let products = this.getProducts();
    products.push(product);
    saveCacheProducts(products);
  }

  editProducts(products: product[]){    
    saveCacheProducts(products);
  }

  deleteProduct(product: product){
    let products = this.getProducts();
    products = products.filter((x: product) => x.id !== product.id);
    this.editProducts(products);
  }

}
