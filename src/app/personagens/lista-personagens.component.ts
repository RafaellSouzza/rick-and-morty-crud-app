import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { RickAndMortyServico } from './rick-and-morty.servico';

@Component({
  selector: 'app-lista-personagens',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatGridListModule, MatPaginatorModule],
  template: `
    <h2>Personagens</h2>
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
    this.setCols(window.innerWidth);
  }

  onPage(event: PageEvent) {
    this.servico.carregarPersonagens(event.pageIndex + 1);
  }
}
