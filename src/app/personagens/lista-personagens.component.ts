import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RickAndMortyServico } from './rick-and-morty.servico';

@Component({
  selector: 'app-lista-personagens',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Personagens</h2>
    <button (click)="servico.carregarPersonagens()">Carregar</button>
    <ul>
      <li *ngFor="let personagem of servico.personagens()">
        <img [src]="personagem.image" width="50" /> {{ personagem.name }} - {{ personagem.species }}
      </li>
    </ul>
  `,
})
export class ListaPersonagensComponent implements OnInit {
  constructor(public servico: RickAndMortyServico) {}

  ngOnInit() {
    this.servico.carregarPersonagens();
  }
}
