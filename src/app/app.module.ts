import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarButtonComponent } from './navbar/navbar-button/navbar-button.component';
import { ModeControlComponent } from './navbar/mode-control/mode-control.component';
import { LODControlComponent } from './navbar/lod-control/lod-control.component';
import { FormsModule } from '@angular/forms';
import { EStopComponent } from './e-stop/e-stop.component';
import { SummonComponent } from './summon/summon.component';
import { StatusComponent } from './navbar/status/status.component';
import { NavigateComponent } from './navigate/navigate.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarButtonComponent,
    ModeControlComponent,
    LODControlComponent,
    EStopComponent,
    SummonComponent,
    StatusComponent,
    NavigateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
