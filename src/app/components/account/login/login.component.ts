import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { signIn } from 'src/app/helpers/auth.helper';
import { AutenticarRequestModel } from 'src/app/models/autenticar.request.model';
import { autenticar } from 'src/app/services/autenticar.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  //atributo
  mensagem: string = '';

  //construtor
  constructor(
    private router: Router, //manipulação das rotas
    private spinner: NgxSpinnerService //ngx-spinner
  ) {
  }

  //estrutura do formulário
  formLogin = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, 
                                  Validators.minLength(8)])
  });

  //objeto para acessar os campos do formulário
  get form(): any {
    return this.formLogin.controls;
  }

  //função para processar o SUBMIT do formulário
  onSubmit() {

    this.spinner.show();

    //dados da requisição
    const request = new AutenticarRequestModel(
      this.formLogin.value.username as string,
      this.formLogin.value.password as string
    );

    //chamada para a API
    autenticar(request)
      .subscribe({
        next: (data) => {
          //salvar os dados na local storage
          signIn(data);
          //redirecionar para a página de dashboard
          this.router.navigate(['/admin/dashboard'])
            .then(() => {
              window.location.reload();
            });
        },
        error: (e) => {
          switch (e.response.status) {
            case 400:
              this.mensagem = "Ocorreram erros de validação no preenchimento do formulário.";
              break;
            case 401:
              this.mensagem = e.response.data.mensagem;
              break;
          }
        }
      })
      .add(() => {
        this.spinner.hide();
      });
      
  }
}