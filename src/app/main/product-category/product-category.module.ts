import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryComponent } from './product-category.component';
import { RouterModule, Routes } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { PaginationModule  } from 'ngx-bootstrap/pagination';
import {FormsModule} from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';

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
    FormsModule,
    PaginationModule,
    ModalModule.forRoot(),
    RouterModule.forChild(productCategoryRoutes)
  ],
  providers:[
    DataService,NotificationService
  ]
})
export class ProductCategoryModule { }
