import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/account/login/login.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { EstoqueCadastroComponent } from './components/admin/estoque-cadastro/estoque-cadastro.component';
import { EstoqueConsultaComponent } from './components/admin/estoque-consulta/estoque-consulta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './app.routing';
import { MaterialModule } from './material.module';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { EstoqueEdicaoComponent } from './components/admin/estoque-edicao/estoque-edicao.component';
import { MessagesComponent } from './components/shared/messages/messages.component';
import { NgxSpinnerModule } from 'ngx-spinner'; 
import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    EstoqueCadastroComponent,
    EstoqueConsultaComponent,
    NavbarComponent,
    EstoqueEdicaoComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule, //formulários reativos
    ReactiveFormsModule, //formulários reativos
    RoutingModule, //configuração do módulo de rotas
    MaterialModule, //configuração do módulo do material
    NgxSpinnerModule, //módulo do ngx-spinner
    ChartModule //módulo do highcharts
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }