import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import { Routes, RouterModule } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { NotificationService } from '../../core/services/notification.service';
import { FormsModule } from '@angular/forms';
import { PaginationModule  } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';

const roleRoutes: Routes = [
  //localhost:4200/main/home
 { path: '', redirectTo: 'index', pathMatch: 'full' },
  //localhost:4200/main/home/index
 { path: 'index', component: RoleComponent }
]


@NgModule({
  declarations: [
    RoleComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PaginationModule,
    ModalModule.forRoot(),
    RouterModule.forChild(roleRoutes)
  ],
  providers:[
    DataService,NotificationService
  ]
})
export class RoleModule { }
