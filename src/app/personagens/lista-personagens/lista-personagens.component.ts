import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PersonagemDialogComponent } from '../personagem-dialog/personagem-dialog.component';
import { Personagem } from '../personagem.model';

import { RickAndMortyServico } from '../rick-and-morty.servico';

@Component({
  selector: 'app-lista-personagens',
  standalone: true,

  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatGridListModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    PersonagemDialogComponent,
  ],

  templateUrl: './lista-personagens.component.html',
  styleUrls: ['./lista-personagens.component.scss'],
})
export class ListaPersonagensComponent implements OnInit {

  cols = 4;

  constructor(
    public servico: RickAndMortyServico,
    private router: Router,
    private dialog: MatDialog
  ) {}

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

  abrirDetalhe(personagem: Personagem) {
    this.dialog.open(PersonagemDialogComponent, {
      data: personagem,
    });
  }

  editar(id: number) {
    this.router.navigate(['/editar', id]);
  }

  excluir(id: number) {
    if (confirm('Excluir personagem?')) {
      this.servico.removerPersonagem(id);
    }
  }
}
