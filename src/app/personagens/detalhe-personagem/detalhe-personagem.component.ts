import { Component, OnInit, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RickAndMortyServico } from '../rick-and-morty.servico';
import { Personagem } from '../personagem.model';

@Component({
  selector: 'app-detalhe-personagem',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './detalhe-personagem.component.html',
  styleUrls: ['./detalhe-personagem.component.scss'],
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
