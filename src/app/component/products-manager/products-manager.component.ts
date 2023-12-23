import { ChangeDetectorRef, Component } from '@angular/core';
import { getCachedProducts } from 'src/app/helpers/products';
import { createEmptyProduct, emptyProduct, product } from 'src/app/interfaces/product';
import { sales } from 'src/app/interfaces/sales';
import { HubService } from 'src/app/service/hub.service';


@Component({
  selector: 'app-products-manager',
  templateUrl: './products-manager.component.html',
  styleUrls: ['./products-manager.component.css']
})
export class ProductsManagerComponent {
  products: product[] = [];
  salesList: sales[] = [];

  constructor(private hubService: HubService){
    this.hubService.getProducts().subscribe(products => {
      this.products = products;
    });
    this.hubService.getSales().subscribe(sales => {      
      this.salesList = sales;
    });
  }
  

  addProduct(){
    this.products.push(createEmptyProduct());
  }

  update(){
    this.hubService.editProducts(this.products);
    alert("Produtos atualizados com sucesso!");
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
    if(prod && prompt(`Para deletar o produto '${prod?.name}', digite 'deletar'`) === 'deletar'){
      if (this.salesList.find(x => x.productId === prodId))
        alert("Não é possível deletar o produto pois já existe uma venda feita com ele. Exclua todas as vendas desse produto para depois deletá-lo.");
      else{
        this.products = this.products.filter(x => x.id !== prodId);        
      }
    }
  }

}
