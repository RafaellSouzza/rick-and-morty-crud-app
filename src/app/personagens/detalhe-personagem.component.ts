import { Component, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RickAndMortyServico } from './rick-and-morty.servico';
import { Personagem } from './personagem.model';

@Component({
  selector: 'app-detalhe-personagem',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <ng-container *ngIf="personagem() as p">
      <h2>{{ p.name }}</h2>
      <img [src]="p.image" width="200" />
      <p>Status: {{ p.status }}</p>
      <p>Species: {{ p.species }}</p>
      <p *ngIf="p.type">Type: {{ p.type }}</p>
      <p *ngIf="p.gender">Gender: {{ p.gender }}</p>
      <p *ngIf="p.origin">Origin: {{ p.origin?.name }}</p>
      <p *ngIf="p.location">Location: {{ p.location?.name }}</p>
      <a routerLink="/">Voltar</a>
    </ng-container>
  `,
})
export class DetalhePersonagemComponent implements OnInit {
  personagem = signal<Personagem | undefined>(undefined);

  constructor(
    private servico: RickAndMortyServico,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.servico.todos().length === 0) {
      this.servico.carregarPersonagens();
    }
    effect(() => {
      this.personagem.set(
        this.servico.todos().find((p) => p.id === id)
      );
    });
  }
}
