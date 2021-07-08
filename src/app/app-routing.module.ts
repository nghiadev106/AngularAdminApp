import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
   //localhost:4200
   { path: '', redirectTo: 'login', pathMatch: 'full' },
   //localhost:4200/login
   { path: 'login', loadChildren: () => import('src/app/login/login.module').then(m => m.LoginModule)  },
   //localhost:4200/main
   { path: 'main', loadChildren: () => import('src/app/main/main.module').then(m => m.MainModule),canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
