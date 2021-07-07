import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import {Produto} from './../Objetos/Produto';
import{ ProdutoService} from './../service/produto.service';



@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  id: any
  produto: Produto = new Produto(0, '', 0)
  textoBotao: string = 'Salvar'
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private prodService: ProdutoService
  ) { }

  ngOnInit(): void {

    
    

    this.activatedRoute.params.subscribe(parametros =>{
      if(parametros['id']){
        this.textoBotao = 'Editar'
        this.id = parametros['id']
        this.prodService.buscarItemID(this.id).subscribe(prod =>{
          this.produto = prod

        })

        console.log(`Id enviado: ${this.id}`)
        


      }

    })  
  } 
  

adicionar = () =>{
  if(this.textoBotao == 'Salvar'){
    this.prodService.adicionar(this.produto).subscribe(
      sucess => this.navegar('home'),
      error => console.log("Erro ao salvar"),
      ()=> console.log("Requisição completa"))
  
      this.router.navigate(['home'])
    


  }else{
    this.editar()
  }
  

}

editar =() =>{
  this.prodService.editar(this.produto).subscribe(
    sucess => this.navegar('home'),
    error => console.log("Erro ao editar"),
    ()=> console.log("Requisição completa"))

    this.router.navigate(['home'])
}

navegar =(rota: any)=> {
  this.router.navigate([rota])
}



}