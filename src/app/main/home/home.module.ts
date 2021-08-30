import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {Routes,RouterModule} from '@angular/router';
import { ChartsModule, ThemeService } from 'ng2-charts';

const homeRoutes: Routes = [
  //localhost:4200/main/home
 { path: '', redirectTo: 'index', pathMatch: 'full' },
  //localhost:4200/main/home/index
 { path: 'index', component: HomeComponent }
]

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ChartsModule,
    RouterModule.forChild(homeRoutes)
  ],
  providers:[ThemeService]
})
export class HomeModule { }
