import { Routes } from '@angular/router';
import { MainComponent } from './main.component';

export const mainRoutes: Routes = [
    {
        //localhost:4200/main
        path: '', component: MainComponent, children: [
            //localhost:4200/main
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            //localhost:4200/main/home
            { path: 'home', loadChildren: () => import('src/app/main/home/home.module').then(m => m.HomeModule)  },
            //localhost:4200/main/user
            { path: 'user', loadChildren: () => import('src/app/main/user/user.module').then(m => m.UserModule) },

            { path: 'role', loadChildren: () => import('src/app/main/role/role.module').then(m => m.RoleModule)},

            { path: 'function', loadChildren: () => import('src/app/main/function/function.module').then(m => m.FunctionModule) },

            { path: 'product-category', loadChildren: () => import('src/app/main/product-category/product-category.module').then(m => m.ProductCategoryModule)},

            { path: 'product', loadChildren: () => import('src/app/main/product/product.module').then(m => m.ProductModule) },

            // { path: 'order', loadChildren: './order/order.module#OrderModule' },

            // { path: 'announcement', loadChildren: './announcement/announcement.module#AnnouncementModule' },

            // { path: 'report', loadChildren: './report/report.module#ReportModule' }
        ]
    }

]
