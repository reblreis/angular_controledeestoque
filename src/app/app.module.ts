import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/account/login/login.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { EstoqueCadastroComponent } from './components/admin/estoque-cadastro/estoque-cadastro.component';
import { EstoqueConsultaComponent } from './components/admin/estoque-consulta/estoque-consulta.component';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './app.routing';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    EstoqueCadastroComponent,
    EstoqueConsultaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, //formulários reativos
    ReactiveFormsModule, //formulários reativos
    RoutingModule, //configuração do módeulo de rotas
    MaterialModule //configuração do módulo do material
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
