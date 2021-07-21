import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FunctionComponent } from './function.component';
import { RouterModule, Routes } from '@angular/router';
import { TreeDraggedElement, TreeModule } from '@circlon/angular-tree-component';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap';
import { NotificationService } from 'src/app/core/services/notification.service';
import { UtilityService } from 'src/app/core/services/utility.service';
import { DataService } from 'src/app/core/services/data.service';

const functionRoutes: Routes = [
  //localhost:4200/main/home
 { path: '', redirectTo: 'index', pathMatch: 'full' },
  //localhost:4200/main/home/index
 { path: 'index', component: FunctionComponent }
]

@NgModule({
  declarations: [
    FunctionComponent
  ],
  imports: [
    CommonModule,
    TreeModule,
    FormsModule,
    ModalModule.forRoot(),
    RouterModule.forChild(functionRoutes)
  ],providers:[DataService,NotificationService,UtilityService,TreeDraggedElement]
})
export class FunctionModule { }
