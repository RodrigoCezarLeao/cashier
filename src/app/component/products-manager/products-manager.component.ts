import { ChangeDetectorRef, Component } from '@angular/core';
import { getCachedProducts } from 'src/app/helpers/products';
import { createEmptyProduct, emptyProduct, product } from 'src/app/interfaces/product';
import { sales } from 'src/app/interfaces/sales';
import { HubService } from 'src/app/service/hub.service';
import { ProductService } from 'src/app/service/product.service';
import { SaleService } from 'src/app/service/sale.service';
import { TranslateService } from 'src/app/service/translate.service';


@Component({
  selector: 'app-products-manager',
  templateUrl: './products-manager.component.html',
  styleUrls: ['./products-manager.component.css']
})
export class ProductsManagerComponent {
  products: product[] = [];
  salesList: sales[] = [];

  constructor(private hubService: HubService, private productService: ProductService, private saleService: SaleService, public translateService: TranslateService){
    this.salesList = saleService.getSales();
    this.products = productService.getProducts();
  }
  

  addProduct(){
    this.products.push(createEmptyProduct());
  }

  update(){
    this.productService.editProducts(this.products);
    alert(this.translateService.translate('alert-products-updated'));
  }

  checkIfUpdateIsNeeded(){
    const cachedProducts = getCachedProducts();
    
    if (this.products.length !== cachedProducts.length)
      return true;
    else {
      for(let product of this.products){
        let obs_product = cachedProducts.find((x: product) => x.id === product.id);
        if (!obs_product || product.name !== obs_product.name || product.price !== obs_product.price)
          return true;
      }

      return false;
    }    
  }

  deleteProduct(prodId: string){    
    let prod = this.products.find(x => x.id === prodId);
    let userAnswer = prompt(this.translateService.translateWithParams('alert-product-confirm-product-delete', [prod?.name ?? ""]));
    if(prod && (userAnswer === 'deletar' || userAnswer === 'delete')){
      if (this.salesList.find(x => x.productId === prodId))
        alert(this.translateService.translate('alert-product-already-selled'));
      else{
        this.products = this.products.filter(x => x.id !== prodId);        
      }
    }
  }

}
