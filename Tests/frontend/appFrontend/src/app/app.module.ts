import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { CallSelectorComponent } from './call-selector/CallSelectorComponent';
import { AppComponent } from './app.component';
import { HomeUserComponent } from './home-user/home-user.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { BlockUserComponent } from './block-user/block-user.component';


@NgModule({
  declarations: [
    AppComponent,
    CallSelectorComponent,
    HomeUserComponent,
    AdminUserComponent,
    BlockUserComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
