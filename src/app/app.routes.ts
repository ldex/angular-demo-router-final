import { Routes } from '@angular/router';
import { AdminComponent } from './common/admin.component';
import { ComposeMessageComponent } from './common/compose-message.component';
import { ErrorComponent } from './common/error.component';
import { HomeComponent } from './common/home.component';
import { LoginComponent } from './common/login.component';
import { loginRouteGuard } from './login-route.guard';

export const routes: Routes = [
    { path: '', redirectTo:'/home', pathMatch:'full' },
    { path: 'home', component: HomeComponent, title: 'Home Page' },
    { path: 'login', component: LoginComponent, title: 'Login' },
    { path: 'admin', component: AdminComponent, title: 'Admin', canActivate: [loginRouteGuard] },
    { path: 'products', loadChildren: () => import('./products/products.routes').then(r => r.productsRoutes) },
    { path: 'contact', component: ComposeMessageComponent, outlet: 'side' },
    { path: 'error', component: ErrorComponent, title: 'Error' },
    { path: '**', redirectTo:'/error?reason=NavError' }
];