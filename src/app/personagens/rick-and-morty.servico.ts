import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Personagem } from './personagem.model';

@Injectable({ providedIn: 'root' })
export class RickAndMortyServico {
  private readonly baseUrl = 'https://rickandmortyapi.com/api';
  personagens = signal<Personagem[]>([]);
  total = signal(0);

  constructor(private http: HttpClient) {}

  carregarPersonagens(pagina = 1) {
    this.http
      .get<{ info: { count: number }; results: Personagem[] }>(
        `${this.baseUrl}/character/?page=${pagina}`
      )
      .subscribe(({ info, results }) => {
        this.total.set(info.count);
        this.personagens.set(results);
      });
  }

  totalCount() {
    return this.total();
  }
}
