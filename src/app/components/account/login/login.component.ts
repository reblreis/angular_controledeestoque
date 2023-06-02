import { Component } from '@angular/core'; 
import { FormGroup, FormControl, Validators } from '@angular/forms'; 
import { Router } from '@angular/router'; 

@Component({ 
  selector: 'app-login', 
  templateUrl: './login.component.html', 
  styleUrls: ['./login.component.css'] 
}) 
export class LoginComponent { 
  
  //construtor 
  constructor( 
    private router: Router //manipulação das rotas 
    ) { 
    } 
  
  //estrutura do formulário 
  formLogin = new FormGroup({ 
    email: new FormControl('', [Validators.required, Validators.email]), 
    senha: new FormControl('', [Validators.required, Validators.minLength(8)]) 
  }); 
    
    //objeto para acessar os campos do formulário 
    get form(): any { return this.formLogin.controls; 
    } 
    
    //função para processar o SUBMIT do formulário 
    onSubmit() { this.router.navigate(['/admin/dashboard']); 
  } 
}