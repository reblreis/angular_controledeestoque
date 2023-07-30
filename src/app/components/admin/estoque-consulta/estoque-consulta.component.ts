import { Component, OnInit } from '@angular/core'; 
import { MatTableDataSource } from '@angular/material/table'; 
import { Router } from '@angular/router'; 
import { NgxSpinnerService } from 'ngx-spinner'; 
import { EstoqueGetResponseModel } from 'src/app/models/estoques-get.response.model'; 
import { deleteEstoque, getEstoques, getExcelEstoque, getPdfEstoque } from 'src/app/services/estoques.service'; 

@Component({ 
  selector: 'app-estoque-consulta', 
  templateUrl: './estoque-consulta.component.html', 
  styleUrls: ['./estoque-consulta.component.css'] 
}) 
export class EstoqueConsultaComponent implements OnInit { 
  
  //variáveis 
  columnNames: string[] = ['nome', 'descricao', 
                          'datacriacao', 'operacoes']; 
  dataSource = new MatTableDataSource<DataSourceModel>(); 
  mensagem: string = ''; 
  
  //construtor 
  constructor( 
    private router: Router, 
    private spinner: NgxSpinnerService 
    ) { 
    } 
    
    ngOnInit(): void { 
      
      this.spinner.show(); 
      
      getEstoques() 
        .subscribe({ 
          next: (data) => { 
            
            const dados: any[] = []; 
            
            data.forEach((item: EstoqueGetResponseModel) => { 
              dados.push({ 
                id: item.id, 
                nome: item.nome, 
                descricao: item.descricao, 
                datacriacao: item.dataHoraCadastro
              }) 
            }) 
            
            this.dataSource.data = dados; 
          }, 
          error: (e) => { console.log(e.error); 
          } 
        }) 
        .add(() => { this.spinner.hide(); 
        }) 
      } 
      
      //função para exclusão 
      onDelete(model: DataSourceModel): void { 
        if (window.confirm(`Deseja realmente excluir 
                            o estoque: '${model.nome}'?`)) { 
                              
          this.spinner.show(); 
          
          deleteEstoque(model.id) 
            .subscribe({ 
              next: (data) => { 
                this.mensagem = `Estoque '${data.nome}', 
                                excluído com sucesso.`; 
                this.ngOnInit(); 
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
        
        //função para edição 
        onEdit(model: DataSourceModel): void { 
          
          this.router.navigate(['/admin/estoque-edicao', model.id]); 
        }

        //função para donwload dos relatórios 
        downloadReport(opcao: number): void { 
          
          this.spinner.show(); 
          
          switch (opcao) { 
            case 1: 
            getPdfEstoque().subscribe().add(() => { this.spinner.hide() }); 
            break; 
            
            case 2: 
            getExcelEstoque().subscribe().add(() => { this.spinner.hide() }); 
            break; 
          } 
        } 
      } 
      
      /* 
      Modelo de dados 
      */ 
      class DataSourceModel { 
        id: string = ''; 
        nome: string = ''; 
        descricao: string = ''; 
        datacriacao: Date | null = null; 
      }