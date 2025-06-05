import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { RickAndMortyServico } from './rick-and-morty.servico';

@Component({
  selector: 'app-lista-personagens',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>Personagens</h2>
    <input type="text" [formControl]="busca" placeholder="Buscar" />
    <button (click)="servico.carregarPersonagens()">Carregar</button>
    <ul>
      <li *ngFor="let personagem of servico.personagens()">
        <img [src]="personagem.image" width="50" /> {{ personagem.name }} - {{ personagem.species }}
      </li>
    </ul>
  `,
})
export class ListaPersonagensComponent implements OnInit {
  busca = new FormControl('');

  constructor(public servico: RickAndMortyServico) {}

  ngOnInit() {
    this.servico.carregarPersonagens();
    this.busca.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((valor) => {
        if (valor) {
          this.servico.buscarPersonagens(valor);
        } else {
          this.servico.carregarPersonagens();
        }
      });
  }
}
