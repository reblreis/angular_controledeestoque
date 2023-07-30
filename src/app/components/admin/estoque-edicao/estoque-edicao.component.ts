import { Component, OnInit } from '@angular/core'; 
import { FormGroup, FormControl, Validators } from '@angular/forms'; 
import { ActivatedRoute } from '@angular/router'; 
import { NgxSpinnerService } from 'ngx-spinner'; 
import { EstoquesPutRequestModel } from 'src/app/models/estoques-put.request.model'; 
import { getEstoqueById, putEstoque } from 'src/app/services/estoques.service'; 

@Component({ 
  selector: 'app-estoque-edicao', 
  templateUrl: './estoque-edicao.component.html', 
  styleUrls: ['./estoque-edicao.component.css'], 
}) 
export class EstoqueEdicaoComponent implements OnInit { 
  
  //variáveis 
  mensagem: string = ''; 
  
  constructor( 
    private activatedRoute: ActivatedRoute, 
    private spinner: NgxSpinnerService
    ) {} 
    
    ngOnInit(): void { 
      this.spinner.show(); 
      
      let id = this.activatedRoute.snapshot.paramMap.get('id') as string; 
      getEstoqueById(id) 
      .subscribe({ next: (data) => { 
        this.formEdicao.patchValue(data); 
      },
      error: (e) => { 
        console.log(e.error); 
      } 
    }).add(() => { 
      this.spinner.hide(); 
    }) 
  } 
  
  formEdicao = new FormGroup({ 
    id: new FormControl('', [Validators.required]), 
    nome: new FormControl('', [Validators.required, 
                                Validators.minLength(8)]), 
    descricao: new FormControl('', [Validators.required, 
                                    Validators.minLength(8)]), 
  }); 
  
  get form(): any { 
    return this.formEdicao.controls; 
  } 
  
  onSubmit(): void { 
    
    this.spinner.show(); 
    
    let request = new EstoquesPutRequestModel( 
      this.formEdicao.value.id as string, 
      this.formEdicao.value.nome as string, 
      this.formEdicao.value.descricao as string 
    ); 
    
    putEstoque(request) 
      .subscribe({ 
        next: (data) => { 
          this.mensagem = `Estoque '${data.nome}', 
                            atualizado com sucesso.`;

        }, 
        error: (e) => { 
          console.log(e.error); 
        } 
      }) 
      .add(() => { 
        this.spinner.hide(); 
      }) 
    } 
  }