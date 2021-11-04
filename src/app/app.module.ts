import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Component} from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
