import { Livro } from './../livro-read-all/livro.model';
import { LivroService } from './../livro.service';
import { Route, Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-livro-update',
  templateUrl: 'livro-update.component.html',
  styleUrls: ['./livro-update.component.css']
})
export class LivroUpdateComponent implements OnInit {
  id_cat: String = '';

  livro: Livro = {
    id: '',
    titulo: '',
    nome_autor: '',
    texto: ''
  }

  titulo = new FormControl("", [Validators.minLength(3)])
  nome_autor = new FormControl("", [Validators.minLength(3)])
  texto = new FormControl("", [Validators.minLength(10)])

  constructor(private router: Router, private service: LivroService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!
    this.livro.id = this.route.snapshot.paramMap.get('id')!
    this.findById()
  }

  findById(): void {
    this.service.findById(this.livro.id!).subscribe((resposta) => {
      this.livro = resposta
    })
  }

  update(): void {
    this.service.update(this.livro).subscribe((resposta) => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem('Livro atualizado com suceso!')
    }, err =>{
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem('Falha ao atualizar o livro. Tente novamente..');
    })
  }

  getMessage() {
    if (this.titulo.invalid) {
      return 'O campo TITULO deve conter entre 3 a 100 caracteres';
    }
    return false;
  }
  getMessageAutor() {
    if (this.nome_autor.invalid) {
      return 'O campo AUTOR deve conter entre 3 a 100 caracteres';
    }
    return false;
  }
  getMessageTexto() {
    if (this.texto.invalid) {
      return 'O campo Texto deve conter entre 10 a 200000 caracteres';
    }
    return false;
  }

  cancel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`])
  }

}
