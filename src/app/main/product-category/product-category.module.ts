import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryComponent } from './product-category.component';
import { RouterModule, Routes } from '@angular/router';

const productCategoryRoutes: Routes = [
  //localhost:4200/main/home
 { path: '', redirectTo: 'index', pathMatch: 'full' },
  //localhost:4200/main/home/index
 { path: 'index', component: ProductCategoryComponent }
]

@NgModule({
  declarations: [
    ProductCategoryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(productCategoryRoutes)
  ]
})
export class ProductCategoryModule { }
