import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuthData, signOut } from 'src/app/helpers/auth.helper';
import { AutenticarResponseModel } from 'src/app/models/autenticar.response.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  //atributos
  model: AutenticarResponseModel | null = null;

  constructor(
    private router: Router
  ) {
  }

  //evento executando antes do componente abrir
  ngOnInit(): void {
    //capturar os dados do usuário autenticado
    this.model = getAuthData();
  }

  logout(): void {
    if (window.confirm(`Olá ${this.model?.nome}, deseja realmente sair do sistema?`)) {
      //logout do usuário
      signOut();
      //redirecionamento
      this.router.navigate(['/account/login'])
        .then(() => {
          window.location.reload();
        });
    }
  }
}