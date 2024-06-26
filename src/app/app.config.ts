import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { PreloadAllModules, provideRouter, withDebugTracing, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';

import { ProductService, FavouriteService, AuthService, AdminService } from './services';
import { config } from 'src/environments/environment';

export const appConfig: ApplicationConfig = {
    providers: [
        ProductService,
        FavouriteService,
        AuthService,
        AdminService,
        importProvidersFrom(BrowserModule, FormsModule, JwtModule.forRoot({
            config: {
                tokenGetter: () => {
                    return localStorage.getItem(config.storageTokenKey);
                },
                allowedDomains: ['localhost:4200']
            }
        })),
        provideHttpClient(withInterceptorsFromDi()),
        provideRouter(
            routes,
            withDebugTracing(),
            withPreloading(PreloadAllModules)
        ),
        provideAnimations()
    ]
};