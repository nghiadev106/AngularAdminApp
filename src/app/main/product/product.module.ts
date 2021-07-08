import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { RouterModule, Routes } from '@angular/router';

const productRoutes: Routes = [
  //localhost:4200/main/home
 { path: '', redirectTo: 'index', pathMatch: 'full' },
  //localhost:4200/main/home/index
 { path: 'index', component: ProductComponent }
]

@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(productRoutes)
  ]
})
export class ProductModule { }
