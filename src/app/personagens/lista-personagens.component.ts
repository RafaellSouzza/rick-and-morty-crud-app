import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

import { RickAndMortyServico } from './rick-and-morty.servico';

@Component({
  selector: 'app-lista-personagens',
  standalone: true,

  imports: [CommonModule, MatCardModule, MatGridListModule, MatPaginatorModule,RouterLink],

  template: `
    <h2>Personagens</h2>
    <input type="text" [formControl]="busca" placeholder="Buscar" />
    <button (click)="servico.carregarPersonagens()">Carregar</button>

    <ul>
      <li *ngFor="let personagem of servico.personagens()">
        <a [routerLink]="['/personagem', personagem.id]">
          <img [src]="personagem.image" width="50" />
          {{ personagem.name }} - {{ personagem.species }}
        </a>
      </li>
    </ul>

    <mat-grid-list [cols]="cols" gutterSize="16">
      <mat-grid-tile *ngFor="let personagem of servico.personagens()">
        <mat-card class="personagem-card">
          <img mat-card-image [src]="personagem.image" [alt]="personagem.name" />
          <mat-card-title>{{ personagem.name }}</mat-card-title>
          <mat-card-content>{{ personagem.species }}</mat-card-content>
        </mat-card>
      </mat-grid-tile>
    </mat-grid-list>
    <mat-paginator
      [length]="servico.totalCount()"
      [pageSize]="20"
      (page)="onPage($event)"
    ></mat-paginator>

  `,
  styleUrls: ['./lista-personagens.component.scss'],
})
export class ListaPersonagensComponent implements OnInit {

  busca = new FormControl('');

  cols = 4;

  constructor(public servico: RickAndMortyServico) {}

  @HostListener('window:resize')
  onResize() {
    this.setCols(window.innerWidth);
  }

  private setCols(width: number) {
    this.cols = width < 600 ? 2 : 4;
  }

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
    this.setCols(window.innerWidth);
  }

  onPage(event: PageEvent) {
    this.servico.carregarPersonagens(event.pageIndex + 1);
  }
}
