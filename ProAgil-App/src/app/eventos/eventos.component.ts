import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})

export class EventosComponent implements OnInit {

  _filtroLista: string;
  
  eventosFiltrados : any = [];
  eventos: any = [];
  imagemALargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;

  get filtroLista(): string {
    return this._filtroLista;
  }

  set filtroLista(value: string) {
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  filtrarEventos(filtrarPor: string): any{
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      evento => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getEventos();
  }

  getEventos() {
      this.http.get('http://localhost:5000/api/values').subscribe( response => {
      this.eventos = response;
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  alternarImagem(){
    this.mostrarImagem = !this.mostrarImagem;
  }

}
