import { Component, HostListener, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { RickAndMortyServico } from '../rick-and-morty.servico';
import { Personagem } from '../personagem.model';

@Component({
  selector: 'app-lista-bloqueados',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatGridListModule, MatButtonModule],
  templateUrl: './lista-bloqueados.component.html',
  styleUrls: ['./lista-bloqueados.component.scss'],
})
export class ListaBloqueadosComponent implements OnInit {
  cols = 4;
  private readonly platformId = inject(PLATFORM_ID);

  constructor(public servico: RickAndMortyServico) {}

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
    if (isPlatformBrowser(this.platformId)) {
      this.setCols(window.innerWidth);
    }
  }

  desbloquear(id: number) {
    if (confirm('Desbloquear personagem?')) {
      this.servico.desbloquearPersonagem(id);
    }
  }
}
