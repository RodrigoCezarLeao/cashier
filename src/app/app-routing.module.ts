import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesManagerComponent } from './component/sales-manager/sales-manager.component';
import { SalesListComponent } from './component/sales-list/sales-list.component';
import { ProductsManagerComponent } from './component/products-manager/products-manager.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {path: "", component: SalesListComponent},
  {path: "cashier", component: SalesManagerComponent},
  {path: "products", component: ProductsManagerComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
