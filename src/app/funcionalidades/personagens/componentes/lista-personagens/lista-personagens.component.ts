import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RickAndMortyService } from '../../../../core/services/rick-and-morty.service';

@Component({
  selector: 'app-lista-personagens',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Characters</h2>
    <button (click)="service.loadCharacters()">Load</button>
    <ul>
      <li *ngFor="let char of service.characters()">
        <img [src]="char.image" width="50" /> {{ char.name }} - {{ char.species }}
      </li>
    </ul>
  `,
})
export class ListaPersonagensComponent implements OnInit {
  constructor(public service: RickAndMortyService) {}

  ngOnInit() {
    this.service.loadCharacters();
  }
}
