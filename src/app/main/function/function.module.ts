import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FunctionComponent } from './function.component';
import { RouterModule, Routes } from '@angular/router';

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
    RouterModule.forChild(functionRoutes)
  ]
})
export class FunctionModule { }
