import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnouncementComponent } from './announcement.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ModalModule, PaginationModule } from 'ngx-bootstrap';

const routes: Routes = [
  { path: "", redirectTo: "index", pathMatch: "full" },
  { path: "index", component: AnnouncementComponent },
];

@NgModule({
  declarations: [AnnouncementComponent],
  imports: [
    FormsModule,
    CommonModule,
    PaginationModule,
    RouterModule.forChild(routes),
    ModalModule.forRoot(),
  ],
})
export class AnnouncementModule {}
