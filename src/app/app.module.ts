import { AdminService } from './services/admin.service';
import { ErrorComponent } from './common/error.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './common/login.component';
import { LoginService } from './services/login.service';
import { AdminComponent } from './common/admin.component';
import { ContactComponent } from './common/contact.component';
import { HomeComponent } from './common/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ComposeMessageComponent } from './common/compose-message.component';
import { JwtModule } from '@auth0/angular-jwt';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    AdminComponent,
    LoginComponent,
    ErrorComponent,
    ComposeMessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('auth_token');
        },
        whitelistedDomains: ['localhost:10001', 'storerestservice.azurewebsites.net']
      }
    })
  ],
  providers: [
    LoginService,
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
