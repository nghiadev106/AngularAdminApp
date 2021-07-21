import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ProductComponent } from "./product.component";
import { RouterModule, Routes } from "@angular/router";
import { ModalModule } from "ngx-bootstrap/modal";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { FormBuilder, FormsModule } from "@angular/forms";
import { DataService } from "./../../core/services/data.service";
import { UtilityService } from "./../../core/services/utility.service";
import { UploadService } from "./../../core/services/upload.service";
import { Daterangepicker } from "ng2-daterangepicker";
//import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

const productRoutes: Routes = [
  //localhost:4200/main/home
  { path: "", redirectTo: "index", pathMatch: "full" },
  //localhost:4200/main/home/index
  { path: "index", component: ProductComponent },
];

@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule,
    ModalModule.forRoot(),
    Daterangepicker,
    // MultiselectDropdownModule,
    RouterModule.forChild(productRoutes),
  ],
  providers: [DataService, UtilityService, UploadService, FormBuilder],
})
export class ProductModule {}
