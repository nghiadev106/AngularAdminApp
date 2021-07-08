import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { mainRoutes } from './main.routes';
import { RouterModule } from '@angular/router';
import { AuthenService } from '../core/services/authen.service';
import { UtilityService } from '../core/services/utility.service';

@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(mainRoutes)
  ],
  providers: [UtilityService, AuthenService]
})
export class MainModule { }
