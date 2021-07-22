import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderComponent } from './order.component';
import { OrderAddComponent } from './order-add/order-add.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { ModalModule } from "ngx-bootstrap/modal";
import { FormsModule } from "@angular/forms";
import { DataService } from "./../../core/services/data.service";
import { PaginationModule } from "ngx-bootstrap/pagination";
import { UtilityService } from "./../../core/services/utility.service";
import { UploadService } from "./../../core/services/upload.service";
import { Daterangepicker } from "ng2-daterangepicker";
import { OrderRouter } from "./order.routes";


@NgModule({
  declarations: [OrderComponent, OrderAddComponent, OrderDetailComponent],
  imports: [
    CommonModule,
    OrderRouter,
    FormsModule,
    PaginationModule,
    Daterangepicker,
    ModalModule.forRoot()
  ],
  providers: [DataService, UtilityService, UploadService],
})
export class OrderModule {}
