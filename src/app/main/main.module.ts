import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { mainRoutes } from './main.routes';
import { RouterModule } from '@angular/router';
import { AuthenService } from '../core/services/authen.service';
import { UtilityService } from '../core/services/utility.service';
import { SidebarMenuComponent } from '../shared/sidebar-menu/sidebar-menu.component';
import { TopMenuComponent } from '../shared/top-menu/top-menu.component';
import { SignalrService } from '../core/services/signalr.service';
import { DataService } from '../core/services/data.service';
import { NotificationService } from '../core/services/notification.service';

@NgModule({
  declarations: [
    MainComponent,SidebarMenuComponent,TopMenuComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(mainRoutes)
  ],
  providers: [UtilityService, AuthenService, SignalrService,DataService,NotificationService]
})
export class MainModule { }
