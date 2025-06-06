import { Component, OnInit, HostListener, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
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

  private readonly platformId = inject(PLATFORM_ID);

  constructor(
    public servico: RickAndMortyServico,
    private router: Router,
    private dialog: MatDialog
  ) {}

  @HostListener('window:resize')
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.setCols(window.innerWidth);
    }
  }

  private setCols(width: number) {
    this.cols = width < 600 ? 2 : 4;
  }

  ngOnInit() {
    this.servico.carregarPersonagens();
    if (isPlatformBrowser(this.platformId)) {
      this.setCols(window.innerWidth);
    }
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

  excluir(personagem: Personagem) {
    if (confirm('Excluir personagem?')) {
      if (personagem.id >= 10000) {
        this.servico.removerPersonagem(personagem.id);
      } else {
        this.servico.bloquearPersonagem(personagem);
      }
    }
  }
}
