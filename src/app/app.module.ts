// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './oec-web-components/header/header.component';
import { FooterComponent } from './oec-web-components/footer/footer.component';
import { HomeComponent } from './oec-web-components/home/home.component';
import { OepHomeComponent } from './oep-web-components/oep-home/oep-home.component';
import { EpsHomeComponent } from './eps-web-components/eps-home/eps-home.component';
import { ForeignEmployerHomeComponent } from './foreign_employer-web-components/foreign-employer-home/foreign-employer-home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'oep', component: OepHomeComponent },
  { path: 'eps', component: EpsHomeComponent },
  { path: 'foreign-employer', component: ForeignEmployerHomeComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    OepHomeComponent,
    EpsHomeComponent,
    ForeignEmployerHomeComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }