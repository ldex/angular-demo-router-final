import { ComposeMessageComponent } from './common/compose-message.component';
import { ErrorComponent } from './common/error.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { LoginComponent } from './common/login.component';
import { AdminComponent } from './common/admin.component';
import { ContactComponent } from './common/contact.component';
import { HomeComponent } from './common/home.component';
import { environment } from '../environments/environment';
import { loginRouteGuard } from './login-route.guard';

const routes: Routes = [
  { path: '', redirectTo:'/home', pathMatch:'full' },
  { path: 'home', component: HomeComponent, title: 'Home Page' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'admin', component: AdminComponent, title: 'Admin', canActivate: [loginRouteGuard] },
  { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
  { path: 'contact', component: ComposeMessageComponent, outlet: 'side' },
  { path: 'error', component: ErrorComponent, title: 'Error' },
  { path: '**', redirectTo:'/error?reason=NavError' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    enableTracing: environment.production ? false : true
  })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
